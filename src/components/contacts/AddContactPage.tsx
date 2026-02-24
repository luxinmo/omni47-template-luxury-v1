import { useState } from "react";
import {
  ArrowLeft, Save, ChevronDown, Plus, X, Building2, User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import AvatarUpload from "@/components/ui/avatar-upload";
import type { ContactType, ContactRole, Language, ContactOrigin } from "./types";
import { ROLE_OPTIONS, LANGUAGE_OPTIONS, ORIGIN_OPTIONS } from "./types";

interface AddContactPageProps {
  onBack: () => void;
}

const AddContactPage = ({ onBack }: AddContactPageProps) => {
  const [type, setType] = useState<ContactType>("company");
  const [roles, setRoles] = useState<ContactRole[]>([]);
  const [avatar, setAvatar] = useState<string | undefined>();
  const [emails, setEmails] = useState<string[]>([""]);
  const [phones, setPhones] = useState<string[]>([""]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [origin, setOrigin] = useState<ContactOrigin | "">("");
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const toggleRole = (role: ContactRole) => {
    setRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );
  };

  const toggleLanguage = (lang: Language) => {
    setLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang],
    );
  };

  const addEmail = () => setEmails((prev) => [...prev, ""]);
  const removeEmail = (i: number) => setEmails((prev) => prev.filter((_, idx) => idx !== i));
  const setEmail = (i: number, v: string) => setEmails((prev) => prev.map((e, idx) => (idx === i ? v : e)));

  const addPhone = () => setPhones((prev) => [...prev, ""]);
  const removePhone = (i: number) => setPhones((prev) => prev.filter((_, idx) => idx !== i));
  const setPhone = (i: number, v: string) => setPhones((prev) => prev.map((p, idx) => (idx === i ? v : p)));

  const initials = type === "company" ? "CO" : "?";

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">
      {children}
    </label>
  );

  const Input = ({
    placeholder,
    type: inputType = "text",
    value,
    onChange,
  }: {
    placeholder: string;
    type?: string;
    value?: string;
    onChange?: (v: string) => void;
  }) => (
    <input
      type={inputType}
      placeholder={placeholder}
      value={value}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-ring transition-shadow"
    />
  );

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-[600px] mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-5">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver al listado
        </button>

        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
            Nuevo contacto
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Completa los datos del nuevo contacto
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
          <div className="p-5 sm:p-6 space-y-6">
            {/* Type toggle */}
            <div className="flex items-center justify-center">
              <div className="inline-flex rounded-lg border border-border p-1 bg-muted/50">
                <button
                  type="button"
                  onClick={() => setType("company")}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-5 py-2.5 text-[13px] font-medium transition-all",
                    type === "company"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Building2 className="h-4 w-4" /> Empresa
                </button>
                <button
                  type="button"
                  onClick={() => setType("person")}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-5 py-2.5 text-[13px] font-medium transition-all",
                    type === "person"
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <User className="h-4 w-4" /> Persona
                </button>
              </div>
            </div>

            {/* Avatar + main fields */}
            <div className="flex items-start gap-5">
              <AvatarUpload
                value={avatar}
                initials={initials}
                onChange={setAvatar}
                size={72}
                variant={type === "company" ? "company" : "person"}
              />
              <div className="flex-1 space-y-3">
                {type === "company" ? (
                  <>
                    <div>
                      <Label>Razón social *</Label>
                      <Input placeholder="Ej: Empresa S.L." />
                    </div>
                    <div>
                      <Label>Nombre comercial</Label>
                      <Input placeholder="Nombre comercial (si difiere)" />
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Nombre *</Label>
                      <Input placeholder="Nombre" />
                    </div>
                    <div>
                      <Label>Apellidos *</Label>
                      <Input placeholder="Apellidos" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Roles */}
            <div>
              <Label>Roles</Label>
              <div className="flex flex-wrap gap-1.5">
                {ROLE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleRole(opt.value)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors",
                      roles.includes(opt.value)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-muted-foreground border-border hover:bg-accent",
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-border" />

            {/* CIF / NIF */}
            <div>
              <Label>{type === "company" ? "CIF" : "NIF/DNI"}</Label>
              <Input placeholder={type === "company" ? "B12345678" : "12345678A"} />
            </div>

            {/* Emails */}
            <div>
              <Label>Email</Label>
              <div className="space-y-2">
                {emails.map((e, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      placeholder="email@ejemplo.com"
                      type="email"
                      value={e}
                      onChange={(v) => setEmail(i, v)}
                    />
                    {emails.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEmail(i)}
                        className="h-8 w-8 shrink-0 rounded-md flex items-center justify-center hover:bg-destructive/10 transition-colors"
                      >
                        <X className="h-3.5 w-3.5 text-muted-foreground" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addEmail}
                className="mt-1.5 flex items-center gap-1 text-[12px] text-primary font-medium hover:underline"
              >
                <Plus className="h-3 w-3" /> Añadir email
              </button>
            </div>

            {/* Phones */}
            <div>
              <Label>Teléfono</Label>
              <div className="space-y-2">
                {phones.map((p, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input
                      placeholder="+34 600 000 000"
                      type="tel"
                      value={p}
                      onChange={(v) => setPhone(i, v)}
                    />
                    {phones.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePhone(i)}
                        className="h-8 w-8 shrink-0 rounded-md flex items-center justify-center hover:bg-destructive/10 transition-colors"
                      >
                        <X className="h-3.5 w-3.5 text-muted-foreground" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addPhone}
                className="mt-1.5 flex items-center gap-1 text-[12px] text-primary font-medium hover:underline"
              >
                <Plus className="h-3 w-3" /> Añadir teléfono
              </button>
            </div>

            {/* Web (company only) */}
            {type === "company" && (
              <div>
                <Label>Web</Label>
                <Input placeholder="www.ejemplo.com" />
              </div>
            )}

            {/* Address */}
            <div>
              <Label>Dirección</Label>
              <Input placeholder="Dirección completa" />
            </div>

            {/* Person-specific fields */}
            {type === "person" && (
              <>
                {/* Languages */}
                <div>
                  <Label>Idiomas</Label>
                  <div className="flex flex-wrap gap-1.5">
                    {LANGUAGE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => toggleLanguage(opt.value)}
                        className={cn(
                          "rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors",
                          languages.includes(opt.value)
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card text-muted-foreground border-border hover:bg-accent",
                        )}
                      >
                        {opt.flag} {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Origin */}
                <div>
                  <Label>Origen</Label>
                  <select
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value as ContactOrigin)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[13px] text-foreground outline-none appearance-none cursor-pointer focus:ring-1 focus:ring-ring"
                  >
                    <option value="">Seleccionar...</option>
                    {ORIGIN_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {/* Advanced (company) */}
            {type === "company" && (
              <div>
                <button
                  type="button"
                  onClick={() => setAdvancedOpen(!advancedOpen)}
                  className="w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-[13px] font-medium text-foreground hover:bg-accent transition-colors"
                >
                  Configuración avanzada
                  <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", advancedOpen && "rotate-180")} />
                </button>
                {advancedOpen && (
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <Label>Días de pago</Label>
                      <Input placeholder="30" type="number" />
                    </div>
                    <div>
                      <Label>Moneda</Label>
                      <select className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[13px] text-foreground outline-none appearance-none cursor-pointer focus:ring-1 focus:ring-ring">
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                        <option value="GBP">GBP</option>
                      </select>
                    </div>
                    <div>
                      <Label>IBAN</Label>
                      <Input placeholder="ES12 3456 7890..." />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Notes */}
            <div>
              <Label>Notas</Label>
              <textarea
                rows={3}
                placeholder="Notas adicionales sobre el contacto..."
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground/50 outline-none resize-none focus:ring-1 focus:ring-ring transition-shadow"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="px-5 sm:px-6 py-4 border-t border-border bg-muted/30 flex items-center justify-end gap-3">
            <button
              onClick={onBack}
              className="rounded-lg border border-border px-5 py-2.5 text-[13px] font-medium text-foreground hover:bg-accent transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-[13px] font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Save className="h-3.5 w-3.5" /> Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContactPage;
