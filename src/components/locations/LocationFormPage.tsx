import { useState, useEffect } from "react";
import { ArrowLeft, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { LocationNode, LocationLevel, LEVEL_LABELS, LANGUAGES } from "./types";

interface LocationFormPageProps {
  location?: LocationNode | null;
  parentName?: string;
  level: LocationLevel;
  onBack: () => void;
  onSave?: (data: Partial<LocationNode>) => void;
}

const toSafeName = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const LEVEL_COLORS: Record<LocationLevel, string> = {
  country: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  province: "bg-violet-500/10 text-violet-700 border-violet-500/20",
  town: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  zone: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
};

const LocationFormPage = ({ location, parentName, level, onBack, onSave }: LocationFormPageProps) => {
  const isEdit = !!location;

  const [name, setName] = useState(location?.name ?? "");
  const [safeName, setSafeName] = useState(location?.safeName ?? "");
  const [active, setActive] = useState(location?.active ?? true);
  const [order, setOrder] = useState(location?.order ?? 1);
  const [geojson, setGeojson] = useState(location?.geojson ?? "");
  const [activeLang, setActiveLang] = useState("en");
  const [activeSlugLang, setActiveSlugLang] = useState("en");
  const [names, setNames] = useState<Record<string, string>>(location?.names ?? {});
  const [slugs, setSlugs] = useState<Record<string, string>>(location?.slugs ?? {});

  // Auto-generate safeName from name
  useEffect(() => {
    if (!isEdit) setSafeName(toSafeName(name));
  }, [name, isEdit]);

  const geoType = (() => {
    if (!geojson) return null;
    try {
      return JSON.parse(geojson).type as string;
    } catch {
      return null;
    }
  })();

  const handleSave = () => {
    onSave?.({ name, safeName, active, order, geojson: geojson || null, names, slugs });
    onBack();
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-5">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to locations
        </button>

        {/* Card */}
        <div className="rounded-xl border border-border bg-card shadow-card p-5 sm:p-7 space-y-6">
          {/* Level badge + title */}
          <div className="space-y-3">
            <Badge className={`text-[10px] uppercase tracking-wider font-semibold ${LEVEL_COLORS[level]}`}>
              {LEVEL_LABELS[level]}
            </Badge>
            <h2 className="text-lg font-semibold text-foreground">
              {isEdit ? `Edit ${LEVEL_LABELS[level]}` : `New ${LEVEL_LABELS[level]}`}
            </h2>
          </div>

          {/* Parent */}
          {parentName && (
            <div className="space-y-1.5">
              <Label className="text-[12px] text-muted-foreground">Parent</Label>
              <div className="h-9 flex items-center rounded-md border border-input bg-muted/50 px-3 text-[13px] text-muted-foreground">
                {parentName}
              </div>
            </div>
          )}

          {/* Name */}
          <div className="space-y-1.5">
            <Label className="text-[12px]">Name *</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={`${LEVEL_LABELS[level]} name`} />
          </div>

          {/* Safe name */}
          <div className="space-y-1.5">
            <Label className="text-[12px]">Safe name</Label>
            <Input
              value={safeName}
              onChange={(e) => setSafeName(e.target.value)}
              className="font-mono text-[13px]"
              placeholder="auto-generated"
            />
          </div>

          {/* Multilingual names */}
          <div className="space-y-2">
            <Label className="text-[12px]">Multilingual names</Label>
            <div className="flex flex-wrap gap-1.5">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setActiveLang(lang.code)}
                  className={`flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[12px] font-medium transition-all ${
                    activeLang === lang.code
                      ? "ring-2 ring-primary bg-primary/5 text-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent"
                  }`}
                >
                  <span className="text-sm">{lang.flag}</span>
                  <span className="uppercase">{lang.code}</span>
                </button>
              ))}
            </div>
            <Input
              value={names[activeLang] ?? ""}
              onChange={(e) => setNames((prev) => ({ ...prev, [activeLang]: e.target.value }))}
              placeholder={`Name in ${LANGUAGES.find((l) => l.code === activeLang)?.label ?? activeLang}`}
              className="text-[13px]"
            />
          </div>

          {/* Multilingual slugs */}
          <div className="space-y-2">
            <Label className="text-[12px]">Multilingual slugs</Label>
            <div className="flex flex-wrap gap-1.5">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => setActiveSlugLang(lang.code)}
                  className={`flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[12px] font-medium transition-all ${
                    activeSlugLang === lang.code
                      ? "ring-2 ring-primary bg-primary/5 text-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent"
                  }`}
                >
                  <span className="text-sm">{lang.flag}</span>
                  <span className="uppercase">{lang.code}</span>
                </button>
              ))}
            </div>
            <Input
              value={slugs[activeSlugLang] ?? ""}
              onChange={(e) => setSlugs((prev) => ({ ...prev, [activeSlugLang]: e.target.value }))}
              placeholder={`Slug in ${LANGUAGES.find((l) => l.code === activeSlugLang)?.label ?? activeSlugLang}`}
              className="font-mono text-[13px]"
            />
          </div>

          {/* Active + Order row */}
          <div className="flex items-end gap-6">
            <div className="flex items-center gap-3">
              <Switch checked={active} onCheckedChange={setActive} />
              <Label className="text-[12px]">Active</Label>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[12px]">Order</Label>
              <Input
                type="number"
                min={0}
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                className="w-24 text-[13px]"
              />
            </div>
          </div>

          {/* GeoJSON */}
          <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-[12px] font-semibold">Geometry (GeoJSON)</Label>
              <div className="flex items-center gap-2">
                {geoType && (
                  <Badge className="text-[10px] bg-emerald-500/10 text-emerald-700 border-emerald-500/20">
                    {geoType}
                  </Badge>
                )}
                {geojson && (
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-[11px]" onClick={() => setGeojson("")}>
                    <X className="h-3 w-3 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
            </div>
            <Textarea
              value={geojson}
              onChange={(e) => setGeojson(e.target.value)}
              rows={8}
              className="font-mono text-xs resize-none"
              placeholder='{"type":"Polygon","coordinates":[[[...]]]}' 
            />
            <p className="text-[11px] text-muted-foreground">Paste a valid GeoJSON Polygon or MultiPolygon</p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="outline" onClick={onBack}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!name.trim()}>
              {isEdit ? "Save changes" : `Create ${LEVEL_LABELS[level].toLowerCase()}`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationFormPage;
