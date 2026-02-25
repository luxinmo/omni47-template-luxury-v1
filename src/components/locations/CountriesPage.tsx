import { useState, useMemo, useCallback } from "react";
import { Plus, Pencil, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { LocationNode } from "./types";
import { mockLocations } from "./mock-data";
import { SidebarHeader, SidebarBody } from "./shared/LocationSidebar";
import LocationEditPanel from "./shared/LocationEditPanel";
import MapPanel, { MapPolygon } from "./shared/MapPanel";

const FLAGS: Record<string, string> = { "España": "🇪🇸" };
const PALETTE = ["#3b82f6", "#8b5cf6", "#f59e0b", "#10b981", "#ef4444", "#ec4899", "#06b6d4", "#84cc16"];

interface CountriesPageProps {
  onSelectCountry: (id: string) => void;
}

const CountriesPage = ({ onSelectCountry }: CountriesPageProps) => {
  const [locations, setLocations] = useState<LocationNode[]>(mockLocations);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [focusId, setFocusId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newActive, setNewActive] = useState(true);
  const [drawMode, setDrawMode] = useState(false);
  const [drawnGeo, setDrawnGeo] = useState("");

  const isEditing = !!editingId;
  const editingNode = editingId ? locations.find((n) => n.id === editingId) : null;
  const [editGeo, setEditGeo] = useState("");

  // Sync editGeo when editingId changes
  const actualEditGeo = isEditing ? (editGeo || editingNode?.geojson || "") : "";

  const countries = useMemo(
    () => locations.filter((n) => n.level === "country").sort((a, b) => a.order - b.order),
    [locations],
  );

  const mapPolygons: MapPolygon[] = useMemo(
    () => isEditing ? [] : countries.filter((c) => c.geojson).map((c, i) => ({
      id: c.id,
      name: c.name,
      geojson: c.geojson!,
      color: PALETTE[i % PALETTE.length],
      highlighted: c.id === selectedId,
    })),
    [countries, selectedId, isEditing],
  );

  const handleSidebarClick = (id: string) => {
    if (selectedId === id) {
      onSelectCountry(id);
    } else {
      setSelectedId(id);
      setFocusId(id);
    }
  };

  const handlePolygonClick = useCallback((id: string) => {
    onSelectCountry(id);
  }, [onSelectCountry]);

  const handleDrawComplete = useCallback((geojson: string) => {
    if (isEditing) {
      setEditGeo(geojson);
    } else {
      setDrawnGeo(geojson);
      setDrawMode(false);
      setAdding(true);
    }
  }, [isEditing]);

  const startEditing = (id: string) => {
    const node = locations.find((n) => n.id === id);
    setEditingId(id);
    setEditGeo(node?.geojson ?? "");
  };

  const handleSaveNew = () => {
    if (!newName.trim()) return;
    const safeName = newName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    setLocations((prev) => [...prev, {
      id: `country-${Date.now()}`, parentId: null, level: "country" as const, name: newName, safeName,
      names: { en: newName }, slugs: { en: safeName }, active: newActive, order: countries.length + 1,
      geojson: drawnGeo || null, childrenCount: 0,
    }]);
    setAdding(false); setNewName(""); setDrawnGeo("");
  };

  const handleDelete = () => {
    if (!editingId) return;
    setLocations((prev) => prev.filter((n) => n.id !== editingId && n.parentId !== editingId));
    setEditingId(null);
  };

  return (
    <div className="flex-1 flex min-h-0 overflow-hidden">
      <div
        className="shrink-0 border-r border-border flex flex-col bg-card overflow-hidden"
        style={{ width: isEditing ? '70%' : '320px', transition: 'width 300ms ease' }}
      >
        {isEditing ? (
          <LocationEditPanel
            node={editingNode}
            level="country"
            onClose={() => setEditingId(null)}
            onSave={() => setEditingId(null)}
            onDelete={handleDelete}
            geojson={actualEditGeo}
            onGeojsonChange={setEditGeo}
            onStartDraw={() => setDrawMode(true)}
          />
        ) : (
          <>
            <SidebarHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-[15px] font-semibold text-foreground">Locations</h2>
                <Button size="sm" className="h-7 gap-1 text-[11px]"
                  onClick={() => { setDrawMode(true); setAdding(false); }}>
                  <Plus className="h-3 w-3" /> Add country
                </Button>
              </div>
            </SidebarHeader>
            <SidebarBody>
              {adding && (
                <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-2.5 mb-2">
                  <div className="space-y-1">
                    <Label className="text-[11px]">Country name *</Label>
                    <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Name" className="h-8 text-[12px]" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={newActive} onCheckedChange={setNewActive} className="scale-[0.8]" />
                    <Label className="text-[11px]">Active</Label>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="h-6 text-[10px]" onClick={handleSaveNew} disabled={!newName.trim()}>Save</Button>
                    <Button size="sm" variant="ghost" className="h-6 text-[10px]"
                      onClick={() => { setAdding(false); setNewName(""); }}>Cancel</Button>
                  </div>
                </div>
              )}
              <div className="space-y-0.5">
                {countries.map((c) => {
                  const isSelected = selectedId === c.id;
                  return (
                    <div key={c.id} className={`group flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] transition-all ${
                      isSelected
                        ? "bg-primary/8 text-foreground font-medium ring-1 ring-primary/20"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    }`}>
                      <button
                        className="flex flex-1 items-center gap-2.5 min-w-0"
                        onClick={() => handleSidebarClick(c.id)}
                      >
                        <span className="text-lg">{FLAGS[c.name] ?? "🏳️"}</span>
                        <span className="flex-1 text-left truncate">{c.name}</span>
                        <Badge variant="secondary" className="text-[9px] shrink-0">
                          {c.childrenCount} prov
                        </Badge>
                        <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${c.active ? "bg-emerald-500" : "bg-muted-foreground/30"}`} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); startEditing(c.id); }}
                        className="shrink-0 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Edit country"
                      >
                        <Pencil className="h-3 w-3" />
                      </button>
                      {isSelected && (
                        <button onClick={() => onSelectCountry(c.id)} className="shrink-0 text-primary hover:text-primary/80 transition-colors" title="Enter country">
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="text-[10px] text-muted-foreground text-center mt-4 px-2">
                Click to highlight · Click arrow or polygon to enter
              </p>
            </SidebarBody>
          </>
        )}
      </div>

      <div className="flex-1 min-w-0" style={{ transition: 'width 300ms ease' }}>
        <MapPanel
          polygons={mapPolygons}
          geometry={isEditing ? actualEditGeo || undefined : undefined}
          center={[40, -3]}
          zoom={4}
          focusedPolygonId={focusId}
          drawMode={drawMode}
          onPolygonClick={isEditing ? undefined : handlePolygonClick}
          onDrawComplete={handleDrawComplete}
          onCancelDraw={() => setDrawMode(false)}
        >
          {!isEditing && drawMode && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] bg-card border border-border rounded-lg px-4 py-2 shadow-lg flex items-center gap-3">
              <p className="text-[11px] text-muted-foreground">Click points to draw · double-click to finish</p>
              <Button size="sm" variant="ghost" className="h-6 text-[11px]" onClick={() => setDrawMode(false)}>Cancel</Button>
            </div>
          )}
        </MapPanel>
      </div>
    </div>
  );
};

export default CountriesPage;
