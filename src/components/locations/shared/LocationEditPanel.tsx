import { useState, useEffect, ReactNode, useCallback } from "react";
import { X, Check, Image as ImageIcon, Copy, Upload, Trash2, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LocationNode, LocationLevel, LANGUAGES, LEVEL_COLORS, LEVEL_LABELS } from "../types";
import MultilingualContent from "./MultilingualContent";

/* ── Cyrillic → Latin transliteration table ── */
const CYR_MAP: Record<string, string> = {
  а:"a",б:"b",в:"v",г:"g",д:"d",е:"e",ё:"yo",ж:"zh",з:"z",и:"i",й:"y",к:"k",л:"l",м:"m",
  н:"n",о:"o",п:"p",р:"r",с:"s",т:"t",у:"u",ф:"f",х:"kh",ц:"ts",ч:"ch",ш:"sh",щ:"shch",
  ъ:"",ы:"y",ь:"",э:"e",ю:"yu",я:"ya",
};
const transliterate = (s: string) =>
  s.split("").map((c) => {
    const lower = c.toLowerCase();
    if (CYR_MAP[lower] !== undefined) {
      const mapped = CYR_MAP[lower];
      return c === lower ? mapped : mapped.charAt(0).toUpperCase() + mapped.slice(1);
    }
    return c;
  }).join("");

const toSlug = (name: string, lang?: string) => {
  let s = name;
  if (lang === "ru") s = transliterate(s);
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
};

const FlagSelector = ({ active, onChange, data }: {
  active: string; onChange: (code: string) => void; data: Record<string, string>;
}) => (
  <div className="flex flex-wrap gap-1">
    {LANGUAGES.map((l) => (
      <button key={l.code} type="button" onClick={() => onChange(l.code)}
        className={`relative flex items-center gap-0.5 rounded-md px-2 py-1 text-[11px] font-medium transition-all ${
          active === l.code ? "ring-2 ring-primary bg-primary/5 text-foreground" : "bg-muted text-muted-foreground hover:bg-accent"
        }`}>
        <span className="text-sm">{l.flag}</span>
        <span className="uppercase">{l.code}</span>
        {data[l.code] && <Check className="h-2 w-2 text-emerald-500 absolute -top-0.5 -right-0.5" />}
      </button>
    ))}
  </div>
);

interface LocationEditPanelProps {
  node?: LocationNode | null;
  level: LocationLevel;
  onClose: () => void;
  onSave: () => void;
  onDelete?: () => void;
  /** Current geometry GeoJSON string (managed by parent for map sync) */
  geojson?: string;
  onGeojsonChange?: (geojson: string) => void;
  onStartDraw?: () => void;
  extraContent?: ReactNode;
}

const LocationEditPanel = ({
  node, level, onClose, onSave, onDelete,
  geojson, onGeojsonChange, onStartDraw,
  extraContent,
}: LocationEditPanelProps) => {
  const isNew = !node;
  const [name, setName] = useState(node?.name ?? "");
  const [safeName, setSafeName] = useState(node?.safeName ?? "");
  const [active, setActive] = useState(node?.active ?? true);
  const [order, setOrder] = useState(node?.order ?? 1);

  const [activeLang, setActiveLang] = useState("en");
  const [slugLang, setSlugLang] = useState("en");
  const [names, setNames] = useState<Record<string, string>>(node?.names ?? {});
  const [slugs, setSlugs] = useState<Record<string, string>>(node?.slugs ?? {});
  const [descriptions, setDescriptions] = useState<Record<string, string>>({});

  const [seoOpen, setSeoOpen] = useState(false);
  const [seoLang, setSeoLang] = useState("en");
  const [seoTitles, setSeoTitles] = useState<Record<string, string>>(node?.seoTitle ?? {});
  const [seoDescs, setSeoDescs] = useState<Record<string, string>>(node?.seoDescription ?? {});

  // GeoJSON import
  const [geoOpen, setGeoOpen] = useState(false);
  const [importText, setImportText] = useState("");
  const [copied, setCopied] = useState(false);

  // Auto-generate safeName from name
  useEffect(() => {
    if (isNew) setSafeName(toSlug(name));
  }, [name, isNew]);

  // Auto-generate slug for current slugLang from the corresponding name
  useEffect(() => {
    const langName = names[slugLang];
    if (langName) {
      setSlugs((prev) => ({ ...prev, [slugLang]: toSlug(langName, slugLang) }));
    }
  }, [names, slugLang]);

  const showMedia = level !== "country";

  const geoType = geojson ? (() => {
    try { return JSON.parse(geojson).type as string; } catch { return null; }
  })() : null;

  const handleCopyGeo = useCallback(() => {
    if (geojson) {
      navigator.clipboard.writeText(geojson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [geojson]);

  const handleImportGeo = useCallback(() => {
    try {
      const p = JSON.parse(importText);
      if (p.type === "Polygon" || p.type === "MultiPolygon") {
        onGeojsonChange?.(importText);
        setImportText("");
        setGeoOpen(false);
      }
    } catch {}
  }, [importText, onGeojsonChange]);

  return (
    <>
      {/* Header */}
      <div className="shrink-0 border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge className={`text-[9px] uppercase tracking-wider font-semibold ${LEVEL_COLORS[level]}`}>
            {LEVEL_LABELS[level]}
          </Badge>
          <h2 className="text-[14px] font-semibold text-foreground">
            {isNew ? `New ${LEVEL_LABELS[level].toLowerCase()}` : node!.name}
          </h2>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Scrollable form */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="px-4 py-4 space-y-4">
          {/* Name */}
          <div className="space-y-1">
            <Label className="text-[11px]">Name *</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="h-8 text-[12px]" />
          </div>

          {/* Safe name */}
          <div className="space-y-1">
            <Label className="text-[11px]">Safe name</Label>
            <Input value={safeName} onChange={(e) => setSafeName(e.target.value)} className="h-8 font-mono text-[11px]" />
          </div>

          {/* Active + Order */}
          <div className="flex items-end gap-4">
            <div className="flex items-center gap-2">
              <Switch checked={active} onCheckedChange={setActive} className="scale-[0.8]" />
              <Label className="text-[11px]">Active</Label>
            </div>
            <div className="space-y-1">
              <Label className="text-[10px]">Order</Label>
              <Input type="number" min={0} value={order} onChange={(e) => setOrder(Number(e.target.value))} className="w-16 h-7 text-[11px]" />
            </div>
          </div>

          <div className="border-t border-border" />

          {/* Multilingual names */}
          <div className="space-y-1.5">
            <Label className="text-[11px]">Multilingual names</Label>
            <FlagSelector active={activeLang} onChange={setActiveLang} data={names} />
            <Input value={names[activeLang] ?? ""}
              onChange={(e) => setNames((p) => ({ ...p, [activeLang]: e.target.value }))}
              placeholder={LANGUAGES.find((l) => l.code === activeLang)?.label}
              className="h-7 text-[11px]" />
          </div>

          {/* Multilingual slugs */}
          <div className="space-y-1.5">
            <Label className="text-[11px]">Multilingual slugs</Label>
            <FlagSelector active={slugLang} onChange={setSlugLang} data={slugs} />
            <Input value={slugs[slugLang] ?? ""}
              onChange={(e) => setSlugs((p) => ({ ...p, [slugLang]: e.target.value }))}
              className="h-7 font-mono text-[10px]" />
            <p className="text-[9px] text-muted-foreground">Auto-generated from name. Editable. No accents, lowercase, hyphens only.</p>
          </div>

          <div className="border-t border-border" />

          {/* Descriptions */}
          <div className="space-y-1.5">
            <Label className="text-[11px] font-semibold">Description</Label>
            <MultilingualContent values={descriptions} onChange={setDescriptions} minHeight={160} />
          </div>

          {/* Media */}
          {showMedia && (
            <>
              <div className="border-t border-border" />
              <div className="space-y-3">
                <Label className="text-[11px] font-semibold">Media</Label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-[10px]">Banner image (16:9)</Label>
                    <div className="aspect-video rounded-lg border-2 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-primary/40 transition-colors">
                      <ImageIcon className="h-5 w-5 text-muted-foreground/50" />
                      <span className="text-[9px] text-muted-foreground">Click to upload</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px]">Thumbnail (1:1)</Label>
                    <div className="aspect-square rounded-lg border-2 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-primary/40 transition-colors">
                      <ImageIcon className="h-5 w-5 text-muted-foreground/50" />
                      <span className="text-[9px] text-muted-foreground">Click to upload</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Geometry / GeoJSON section */}
          {(onGeojsonChange || geojson) && (
            <>
              <div className="border-t border-border" />
              <div className="space-y-2">
                <Label className="text-[11px] font-semibold">Geometry</Label>
                <div className="flex flex-wrap gap-1.5">
                  {!geojson && onStartDraw && (
                    <Button size="sm" variant="outline" className="h-7 text-[10px] gap-1" onClick={onStartDraw}>
                      <Pencil className="h-3 w-3" /> Draw polygon
                    </Button>
                  )}
                  {geojson && onStartDraw && (
                    <Button size="sm" variant="outline" className="h-7 text-[10px] gap-1" onClick={onStartDraw}>
                      <Pencil className="h-3 w-3" /> Redraw
                    </Button>
                  )}
                  {geojson && (
                    <>
                      <Button size="sm" variant="outline" className="h-7 text-[10px] gap-1" onClick={handleCopyGeo}>
                        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        {copied ? "Copied" : "Copy GeoJSON"}
                      </Button>
                      <Button size="sm" variant="outline" className="h-7 text-[10px] gap-1 text-destructive"
                        onClick={() => onGeojsonChange?.("")}>
                        <Trash2 className="h-3 w-3" /> Delete geometry
                      </Button>
                    </>
                  )}
                </div>

                {geojson && geoType && (
                  <Badge className="text-[8px] bg-emerald-500/10 text-emerald-700 border-emerald-500/20">{geoType}</Badge>
                )}

                {/* Import GeoJSON */}
                <Collapsible open={geoOpen} onOpenChange={setGeoOpen}>
                  <CollapsibleTrigger className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground hover:text-foreground">
                    <span className={`transition-transform text-[10px] ${geoOpen ? "rotate-90" : ""}`}>▶</span>
                    Import / Raw GeoJSON
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 space-y-2">
                    {geojson && (
                      <pre className="rounded bg-muted p-2 text-[9px] font-mono text-muted-foreground overflow-auto max-h-28">
                        {JSON.stringify(JSON.parse(geojson), null, 2)}
                      </pre>
                    )}
                    <Textarea value={importText} onChange={(e) => setImportText(e.target.value)}
                      rows={3} placeholder='{"type":"Polygon","coordinates":[...]}' className="font-mono text-[9px]" />
                    <Button size="sm" className="h-6 text-[9px] gap-1" onClick={handleImportGeo} disabled={!importText.trim()}>
                      <Upload className="h-2.5 w-2.5" /> Import GeoJSON
                    </Button>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </>
          )}

          {/* SEO */}
          <Collapsible open={seoOpen} onOpenChange={setSeoOpen}>
            <CollapsibleTrigger className="flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground hover:text-foreground">
              <span className={`transition-transform text-[10px] ${seoOpen ? "rotate-90" : ""}`}>▶</span>
              SEO Settings
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-3 pl-3 border-l-2 border-muted">
              <FlagSelector active={seoLang} onChange={setSeoLang} data={seoTitles} />
              <div className="space-y-1">
                <Label className="text-[10px]">Meta title</Label>
                <Input value={seoTitles[seoLang] ?? ""}
                  onChange={(e) => setSeoTitles((p) => ({ ...p, [seoLang]: e.target.value }))}
                  className="h-7 text-[11px]" />
              </div>
              <div className="space-y-1">
                <Label className="text-[10px]">Meta description</Label>
                <Textarea value={seoDescs[seoLang] ?? ""}
                  onChange={(e) => setSeoDescs((p) => ({ ...p, [seoLang]: e.target.value }))}
                  rows={2} className="text-[11px]" />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Extra content */}
          {extraContent}
        </div>
      </ScrollArea>

      {/* Sticky save/cancel/delete */}
      <div className="shrink-0 border-t border-border px-4 py-2.5 flex gap-2">
        {onDelete && !isNew && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 text-[11px] text-destructive border-destructive/30 hover:bg-destructive/10">
                <Trash2 className="h-3 w-3 mr-1" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete {LEVEL_LABELS[level].toLowerCase()}</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete <strong>{node?.name}</strong>? This will also remove all child locations. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        <Button variant="outline" size="sm" className="flex-1 h-8 text-[11px]" onClick={onClose}>Cancel</Button>
        <Button size="sm" className="flex-1 h-8 text-[11px]" disabled={!name.trim()} onClick={onSave}>
          {isNew ? `Create ${LEVEL_LABELS[level].toLowerCase()}` : "Save changes"}
        </Button>
      </div>
    </>
  );
};

export default LocationEditPanel;
