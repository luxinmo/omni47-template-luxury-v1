import { useEffect, useRef, useState, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Map as MapIcon, Satellite } from "lucide-react";

interface Polygon {
  id: string;
  name: string;
  geojson: string;
  color: string;
  highlighted?: boolean;
}

interface LocationMapProps {
  polygons?: Polygon[];
  /** Boundary polygon shown as dashed outline (parent boundary) */
  boundaryGeojson?: string | null;
  /** Single GeoJSON string for detail view */
  geometry?: string | null;
  /** Parent GeoJSON for reference overlay */
  parentGeojson?: string | null;
  center?: [number, number];
  zoom?: number;
  height?: string;
  className?: string;
  editable?: boolean;
  drawMode?: boolean;
  /** ID of polygon to highlight/pan to */
  focusedPolygonId?: string | null;
  onPolygonClick?: (id: string) => void;
  onGeometryChange?: (geojson: string) => void;
  onDrawComplete?: (geojson: string) => void;
  onCancelDraw?: () => void;
}

const PALETTE = [
  "#3b82f6", "#8b5cf6", "#f59e0b", "#10b981", "#ef4444",
  "#ec4899", "#06b6d4", "#84cc16", "#f97316", "#6366f1",
];

const OSM_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const SATELLITE_URL = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";

const LocationMap = ({
  polygons = [],
  boundaryGeojson,
  geometry,
  parentGeojson,
  center = [40, -3],
  zoom = 6,
  height = "100%",
  className = "",
  editable = false,
  drawMode = false,
  focusedPolygonId,
  onPolygonClick,
  onGeometryChange,
  onDrawComplete,
  onCancelDraw,
}: LocationMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layersRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const drawLayerRef = useRef<L.Polygon | null>(null);
  const drawPointsRef = useRef<L.LatLng[]>([]);
  const drawMarkersRef = useRef<L.CircleMarker[]>([]);
  const polygonLayersRef = useRef<Map<string, L.GeoJSON>>(new Map());
  const [isDrawing, setIsDrawing] = useState(false);
  const [tileMode, setTileMode] = useState<"osm" | "satellite">("osm");

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center,
      zoom,
      zoomControl: true,
      attributionControl: false,
    });

    const tile = L.tileLayer(OSM_URL, { maxZoom: 19 }).addTo(map);
    tileLayerRef.current = tile;

    const layers = L.layerGroup().addTo(map);
    mapRef.current = map;
    layersRef.current = layers;

    return () => {
      map.remove();
      mapRef.current = null;
      layersRef.current = null;
      tileLayerRef.current = null;
    };
  }, []);

  // Switch tile layer
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !tileLayerRef.current) return;
    tileLayerRef.current.remove();
    const url = tileMode === "satellite" ? SATELLITE_URL : OSM_URL;
    tileLayerRef.current = L.tileLayer(url, { maxZoom: 19 }).addTo(map);
  }, [tileMode]);

  // Render polygons (list view)
  useEffect(() => {
    const map = mapRef.current;
    const layers = layersRef.current;
    if (!map || !layers) return;

    layers.clearLayers();
    polygonLayersRef.current.clear();

    const bounds = L.latLngBounds([]);

    // Boundary polygon (parent outline)
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

    // Parent boundary (detail view)
    if (parentGeojson) {
      try {
        const geo = JSON.parse(parentGeojson);
        const layer = L.geoJSON(geo, {
          style: { color: "#9ca3af", fillOpacity: 0, weight: 2, dashArray: "6,4" },
          interactive: false,
        });
        layer.addTo(layers);
        bounds.extend(layer.getBounds());
      } catch {}
    }

    if (polygons.length > 0) {
      polygons.forEach((p, i) => {
        try {
          const geo = JSON.parse(p.geojson);
          const color = p.color || PALETTE[i % PALETTE.length];
          const isHighlighted = p.highlighted;
          const layer = L.geoJSON(geo, {
            style: {
              color: isHighlighted ? "#f59e0b" : color,
              fillColor: isHighlighted ? "#f59e0b" : color,
              fillOpacity: isHighlighted ? 0.4 : 0.25,
              weight: isHighlighted ? 3 : 2,
            },
          });

          layer.bindTooltip(p.name, { sticky: true, className: "leaflet-tooltip-custom" });

          layer.bindPopup(`
            <div style="min-width:120px">
              <strong style="font-size:13px">${p.name}</strong>
              <br/>
              <button onclick="window.__locationMapEdit__('${p.id}')" 
                style="margin-top:6px;padding:3px 10px;font-size:11px;background:#3b82f6;color:#fff;border:none;border-radius:4px;cursor:pointer">
                Edit
              </button>
            </div>
          `);

          layer.addTo(layers);
          bounds.extend(layer.getBounds());
          polygonLayersRef.current.set(p.id, layer);
        } catch {}
      });
    }

    // Single geometry (detail view)
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
    } else if (!geometry && polygons.length === 0) {
      map.setView(center, zoom);
    }
  }, [polygons, geometry, boundaryGeojson, parentGeojson, center, zoom]);

  // Focus on specific polygon
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !focusedPolygonId) return;
    const layer = polygonLayersRef.current.get(focusedPolygonId);
    if (layer) {
      const b = layer.getBounds();
      if (b.isValid()) map.fitBounds(b, { padding: [60, 60], maxZoom: 16 });
    }
  }, [focusedPolygonId]);

  // Popup click handler
  useEffect(() => {
    (window as any).__locationMapEdit__ = (id: string) => {
      onPolygonClick?.(id);
    };
    return () => {
      delete (window as any).__locationMapEdit__;
    };
  }, [onPolygonClick]);

  // Draw mode
  const startDrawing = useCallback(() => {
    const map = mapRef.current;
    if (!map) return;
    setIsDrawing(true);
    drawPointsRef.current = [];
    drawMarkersRef.current.forEach((m) => m.remove());
    drawMarkersRef.current = [];
    if (drawLayerRef.current) {
      drawLayerRef.current.remove();
      drawLayerRef.current = null;
    }

    map.getContainer().style.cursor = "crosshair";

    const onClick = (e: L.LeafletMouseEvent) => {
      const pt = e.latlng;
      drawPointsRef.current.push(pt);

      const marker = L.circleMarker(pt, {
        radius: 5, color: "#3b82f6", fillColor: "#3b82f6", fillOpacity: 1,
      }).addTo(map);
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
      finishDrawing();
    };

    const finishDrawing = () => {
      map.off("click", onClick);
      map.off("dblclick", onDblClick);
      map.getContainer().style.cursor = "";
      setIsDrawing(false);

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
    <div className={`relative ${className}`} style={{ height, minHeight: 200 }}>
      <div
        ref={containerRef}
        className="rounded-xl overflow-hidden w-full h-full"
      />
      {/* Layer toggle */}
      <div className="absolute top-3 left-3 z-[1000] flex rounded-lg overflow-hidden border border-border shadow-md">
        <button
          onClick={() => setTileMode("osm")}
          className={`flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium transition-colors ${
            tileMode === "osm"
              ? "bg-primary text-primary-foreground"
              : "bg-card text-muted-foreground hover:bg-accent"
          }`}
        >
          <MapIcon className="h-3 w-3" />
          Map
        </button>
        <button
          onClick={() => setTileMode("satellite")}
          className={`flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-medium transition-colors ${
            tileMode === "satellite"
              ? "bg-primary text-primary-foreground"
              : "bg-card text-muted-foreground hover:bg-accent"
          }`}
        >
          <Satellite className="h-3 w-3" />
          Satellite
        </button>
      </div>
    </div>
  );
};

export default LocationMap;
