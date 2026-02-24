import { useEffect, useRef, useState, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Map as MapIcon, Satellite } from "lucide-react";

export interface MapPolygon {
  id: string;
  name: string;
  geojson: string;
  color: string;
  highlighted?: boolean;
}

interface MapPanelProps {
  polygons?: MapPolygon[];
  boundaryGeojson?: string | null;
  geometry?: string | null;
  referencePolygons?: MapPolygon[];
  center?: [number, number];
  zoom?: number;
  drawMode?: boolean;
  focusedPolygonId?: string | null;
  onPolygonClick?: (id: string) => void;
  onPolygonDblClick?: (id: string) => void;
  onDrawComplete?: (geojson: string) => void;
  onCancelDraw?: () => void;
  children?: React.ReactNode;
}

const OSM_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const SATELLITE_URL = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

const MapPanel = ({
  polygons = [],
  boundaryGeojson,
  geometry,
  referencePolygons = [],
  center = [40, -3],
  zoom = 6,
  drawMode = false,
  focusedPolygonId,
  onPolygonClick,
  onPolygonDblClick,
  onDrawComplete,
  onCancelDraw,
  children,
}: MapPanelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layersRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const drawLayerRef = useRef<L.Polygon | null>(null);
  const drawPointsRef = useRef<L.LatLng[]>([]);
  const drawMarkersRef = useRef<L.CircleMarker[]>([]);
  const polygonLayersRef = useRef<Map<string, L.GeoJSON>>(new Map());
  const [tileMode, setTileMode] = useState<"osm" | "satellite">("osm");

  // Init map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center, zoom, zoomControl: true, attributionControl: false, doubleClickZoom: false,
    });
    const tile = L.tileLayer(OSM_URL, { maxZoom: 19 }).addTo(map);
    tileLayerRef.current = tile;
    const layers = L.layerGroup().addTo(map);
    mapRef.current = map;
    layersRef.current = layers;
    return () => { map.remove(); mapRef.current = null; layersRef.current = null; tileLayerRef.current = null; };
  }, []);

  // Tile switch
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !tileLayerRef.current) return;
    tileLayerRef.current.remove();
    tileLayerRef.current = L.tileLayer(tileMode === "satellite" ? SATELLITE_URL : OSM_URL, { maxZoom: 19 }).addTo(map);
  }, [tileMode]);

  // Render layers
  useEffect(() => {
    const map = mapRef.current;
    const layers = layersRef.current;
    if (!map || !layers) return;
    layers.clearLayers();
    polygonLayersRef.current.clear();
    const bounds = L.latLngBounds([]);

    // Boundary
    if (boundaryGeojson) {
      try {
        const geo = JSON.parse(boundaryGeojson);
        const layer = L.geoJSON(geo, {
          style: { color: "#6b7280", fillOpacity: 0, weight: 3, dashArray: "8,4" },
          interactive: false,
        });
        layer.addTo(layers);
        bounds.extend(layer.getBounds());
      } catch {}
    }

    // Reference polygons (gray, non-interactive or lightly interactive)
    referencePolygons.forEach((p) => {
      try {
        const geo = JSON.parse(p.geojson);
        const layer = L.geoJSON(geo, {
          style: { color: "#9ca3af", fillColor: "#9ca3af", fillOpacity: 0.1, weight: 1 },
          interactive: false,
        });
        layer.addTo(layers);
        bounds.extend(layer.getBounds());
      } catch {}
    });

    // Main polygons
    polygons.forEach((p, i) => {
      try {
        const geo = JSON.parse(p.geojson);
        const isHL = p.highlighted;
        const color = p.color;
        const layer = L.geoJSON(geo, {
          style: {
            color: isHL ? "#f59e0b" : color,
            fillColor: isHL ? "#f59e0b" : color,
            fillOpacity: isHL ? 0.45 : 0.2,
            weight: isHL ? 3 : 2,
          },
        });
        layer.bindTooltip(p.name, { sticky: true });

        layer.on("click", () => onPolygonClick?.(p.id));
        layer.on("dblclick", (e) => {
          L.DomEvent.stopPropagation(e as any);
          onPolygonDblClick?.(p.id);
        });

        // Hover effect
        layer.on("mouseover", () => {
          if (!isHL) layer.setStyle({ fillOpacity: 0.35, weight: 3 });
        });
        layer.on("mouseout", () => {
          if (!isHL) layer.setStyle({ fillOpacity: 0.2, weight: 2 });
        });

        layer.addTo(layers);
        bounds.extend(layer.getBounds());
        polygonLayersRef.current.set(p.id, layer);
      } catch {}
    });

    // Single geometry
    if (geometry) {
      try {
        const geo = JSON.parse(geometry);
        const layer = L.geoJSON(geo, {
          style: { color: "#3b82f6", fillColor: "#3b82f6", fillOpacity: 0.2, weight: 2 },
        });
        layer.addTo(layers);
        bounds.extend(layer.getBounds());
      } catch {}
    }

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
    } else {
      map.setView(center, zoom);
    }
  }, [polygons, geometry, boundaryGeojson, referencePolygons, center, zoom]);

  // Focus
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !focusedPolygonId) return;
    const layer = polygonLayersRef.current.get(focusedPolygonId);
    if (layer) {
      const b = layer.getBounds();
      if (b.isValid()) map.flyToBounds(b, { padding: [60, 60], maxZoom: 16, duration: 0.8 });
    }
  }, [focusedPolygonId]);

  // Draw mode
  const startDrawing = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    drawPointsRef.current = [];
    drawMarkersRef.current.forEach((m) => m.remove());
    drawMarkersRef.current = [];
    if (drawLayerRef.current) { drawLayerRef.current.remove(); drawLayerRef.current = null; }
    map.getContainer().style.cursor = "crosshair";

    const onClick = (e: L.LeafletMouseEvent) => {
      const pt = e.latlng;
      drawPointsRef.current.push(pt);
      const marker = L.circleMarker(pt, { radius: 5, color: "#3b82f6", fillColor: "#3b82f6", fillOpacity: 1 }).addTo(map);
      drawMarkersRef.current.push(marker);
      if (drawPointsRef.current.length >= 2) {
        if (drawLayerRef.current) drawLayerRef.current.remove();
        drawLayerRef.current = L.polygon(drawPointsRef.current, {
          color: "#3b82f6", fillColor: "#3b82f6", fillOpacity: 0.2, weight: 2, dashArray: "5,5",
        }).addTo(map);
      }
    };

    const onDblClick = (e: L.LeafletMouseEvent) => {
      L.DomEvent.stopPropagation(e as any);
      L.DomEvent.preventDefault(e as any);
      finish();
    };

    const finish = () => {
      map.off("click", onClick);
      map.off("dblclick", onDblClick);
      map.getContainer().style.cursor = "";
      drawMarkersRef.current.forEach((m) => m.remove());
      drawMarkersRef.current = [];
      if (drawPointsRef.current.length >= 3) {
        const coords = drawPointsRef.current.map((p) => [p.lng, p.lat]);
        coords.push(coords[0]);
        const geojson = JSON.stringify({ type: "Polygon", coordinates: [coords] });
        if (drawLayerRef.current) drawLayerRef.current.remove();
        drawLayerRef.current = null;
        onDrawComplete?.(geojson);
      } else {
        if (drawLayerRef.current) { drawLayerRef.current.remove(); drawLayerRef.current = null; }
        onCancelDraw?.();
      }
    };

    map.on("click", onClick);
    map.on("dblclick", onDblClick);
  }, [onDrawComplete, onCancelDraw]);

  useEffect(() => {
    if (drawMode) startDrawing();
  }, [drawMode, startDrawing]);

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />

      {/* Layer toggle — top right */}
      <div className="absolute top-3 right-3 z-[1000] flex rounded-lg overflow-hidden border border-border shadow-md">
        <button
          onClick={() => setTileMode("osm")}
          className={`flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium transition-colors ${
            tileMode === "osm" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-accent"
          }`}
        >
          <MapIcon className="h-3 w-3" /> Map
        </button>
        <button
          onClick={() => setTileMode("satellite")}
          className={`flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium transition-colors ${
            tileMode === "satellite" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-accent"
          }`}
        >
          <Satellite className="h-3 w-3" /> Satellite
        </button>
      </div>

      {/* Floating children (buttons, instructions, etc.) */}
      {children}
    </div>
  );
};

export default MapPanel;
