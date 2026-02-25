import { useState, useMemo, useCallback } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocationNode } from "./types";
import { mockLocations } from "./mock-data";
import LocationBreadcrumb from "./shared/LocationBreadcrumb";
import LocationEditPanel from "./shared/LocationEditPanel";
import MapPanel, { MapPolygon } from "./shared/MapPanel";

interface BoroughFormPageProps {
  countryId: string;
  provinceId: string;
  regionId: string;
  municipalityId: string;
  boroughId?: string | null;
  onBackToCountries: () => void;
  onBackToProvinces: () => void;
  onBackToRegions: () => void;
  onBackToMunicipalities: () => void;
  onBackToMunicipalityDetail: () => void;
}

const BoroughFormPage = ({
  countryId, provinceId, regionId, municipalityId, boroughId,
  onBackToCountries, onBackToProvinces, onBackToRegions, onBackToMunicipalities, onBackToMunicipalityDetail,
}: BoroughFormPageProps) => {
  const borough = boroughId ? mockLocations.find((n) => n.id === boroughId) : null;
  const country = mockLocations.find((n) => n.id === countryId);
  const province = mockLocations.find((n) => n.id === provinceId);
  const region = mockLocations.find((n) => n.id === regionId);
  const municipality = mockLocations.find((n) => n.id === municipalityId);
  const isEdit = !!borough;

  const siblingBoroughs = useMemo(
    () => mockLocations.filter((n) => n.parentId === municipalityId && n.level === "borough" && n.id !== boroughId),
    [municipalityId, boroughId],
  );

  const [geojson, setGeojson] = useState(borough?.geojson ?? "");
  const [drawMode, setDrawMode] = useState(false);

  const handleDrawComplete = useCallback((geo: string) => { setGeojson(geo); setDrawMode(false); }, []);

  const refPolygons: MapPolygon[] = useMemo(
    () => siblingBoroughs.filter((b) => b.geojson).map((b) => ({
      id: b.id, name: b.name, geojson: b.geojson!, color: "#9ca3af", highlighted: false,
    })),
    [siblingBoroughs],
  );

  return (
    <div className="flex-1 flex min-h-0 overflow-hidden">
      {/* 70% form panel */}
      <div
        className="shrink-0 border-r border-border flex flex-col bg-card overflow-hidden"
        style={{ width: '70%' }}
      >
        {/* Breadcrumb header */}
        <div className="shrink-0 border-b border-border px-4 py-2">
          <LocationBreadcrumb segments={[
            { label: "Locations", onClick: onBackToCountries },
            { label: country?.name ?? "", onClick: onBackToProvinces },
            { label: province?.name ?? "", onClick: onBackToRegions },
            { label: region?.name ?? "", onClick: onBackToMunicipalities },
            { label: municipality?.name ?? "", onClick: onBackToMunicipalityDetail },
            { label: isEdit ? borough!.name : "New borough" },
          ]} />
        </div>

        <LocationEditPanel
          node={borough}
          level="borough"
          onClose={onBackToMunicipalityDetail}
          onSave={onBackToMunicipalityDetail}
          onDelete={isEdit ? onBackToMunicipalityDetail : undefined}
          geojson={geojson}
          onGeojsonChange={setGeojson}
          onStartDraw={() => setDrawMode(true)}
        />
      </div>

      {/* 30% map panel */}
      <div className="flex-1 min-w-0">
        <MapPanel
          referencePolygons={refPolygons}
          geometry={geojson || undefined}
          boundaryGeojson={municipality?.geojson}
          center={[40, -3]}
          zoom={6}
          drawMode={drawMode}
          onDrawComplete={handleDrawComplete}
          onCancelDraw={() => setDrawMode(false)}
        >
          {!geojson && !drawMode && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/20 backdrop-blur-[1px] z-[999]">
              <p className="text-[13px] text-muted-foreground mb-3">No geometry defined</p>
              <Button size="sm" className="gap-1.5" onClick={() => setDrawMode(true)}>
                Draw borough polygon
              </Button>
            </div>
          )}

          {drawMode && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] bg-card border border-border rounded-lg px-4 py-2 shadow-lg flex items-center gap-3">
              <p className="text-[11px] text-muted-foreground">Click points · double-click to finish</p>
              <Button size="sm" variant="ghost" className="h-6 text-[11px]" onClick={() => setDrawMode(false)}>Cancel</Button>
            </div>
          )}
        </MapPanel>
      </div>
    </div>
  );
};

export default BoroughFormPage;
