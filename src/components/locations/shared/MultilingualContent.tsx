import { useState } from "react";
import { Check } from "lucide-react";
import { LANGUAGES } from "../types";
import RichTextEditor from "./RichTextEditor";

interface MultilingualContentProps {
  values: Record<string, string>;
  onChange: (values: Record<string, string>) => void;
  minHeight?: number;
}

const MultilingualContent = ({ values, onChange, minHeight = 250 }: MultilingualContentProps) => {
  const [lang, setLang] = useState("en");

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1">
        {LANGUAGES.map((l) => {
          const filled = !!(values[l.code] && values[l.code].replace(/<[^>]*>/g, "").trim());
          return (
            <button
              key={l.code}
              type="button"
              onClick={() => setLang(l.code)}
              className={`relative flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium transition-all ${
                lang === l.code
                  ? "ring-2 ring-primary bg-primary/5 text-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
            >
              <span className="text-sm">{l.flag}</span>
              <span className="uppercase">{l.code}</span>
              {filled && <Check className="h-2.5 w-2.5 text-emerald-500 absolute -top-0.5 -right-0.5" />}
            </button>
          );
        })}
      </div>
      <RichTextEditor
        value={values[lang] ?? ""}
        onChange={(html) => onChange({ ...values, [lang]: html })}
        minHeight={minHeight}
      />
    </div>
  );
};

export default MultilingualContent;
