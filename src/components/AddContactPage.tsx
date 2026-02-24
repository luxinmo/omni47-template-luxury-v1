import { useState } from "react";
import {
  ArrowLeft, Building2, User, ChevronDown, Save, X,
} from "lucide-react";

type ContactType = "company" | "person";
type ContactRole = "customer" | "provider" | "employee" | "other";

const ROLE_OPTIONS: { value: ContactRole; label: string }[] = [
  { value: "customer", label: "Cliente" },
  { value: "provider", label: "Proveedor" },
  { value: "employee", label: "Trabajador" },
  { value: "other", label: "Otro" },
];

interface AddContactPageProps {
  onBack: () => void;
}

const AddContactPage = ({ onBack }: AddContactPageProps) => {
  const [type, setType] = useState<ContactType>("company");
  const [roles, setRoles] = useState<ContactRole[]>([]);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const toggleRole = (role: ContactRole) => {
    setRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const FieldLabel = ({ children }: { children: React.ReactNode }) => (
    <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">
      {children}
    </label>
  );

  const FieldInput = ({ placeholder, type: inputType = "text" }: { placeholder: string; type?: string }) => (
    <input
      type={inputType}
      placeholder={placeholder}
      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-ring transition-shadow"
    />
  );

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-5">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver al listado
        </button>

        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">Nuevo contacto</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Completa los datos del nuevo contacto</p>
        </div>

        <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
          <div className="p-5 sm:p-6 space-y-6">
            {/* Type + Avatar */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className={`h-16 w-16 rounded-xl flex items-center justify-center shrink-0 ${type === "company" ? "bg-primary/10" : "bg-muted"}`}>
                {type === "company" ? (
                  <Building2 className="h-7 w-7 text-primary" />
                ) : (
                  <User className="h-7 w-7 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 w-full space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <FieldLabel>Tipo</FieldLabel>
                    <div className="relative">
                      <select
                        value={type}
                        onChange={(e) => setType(e.target.value as ContactType)}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[13px] text-foreground outline-none appearance-none cursor-pointer focus:ring-1 focus:ring-ring"
                      >
                        <option value="company">Empresa</option>
                        <option value="person">Persona</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <FieldLabel>Roles</FieldLabel>
                    <div className="flex flex-wrap gap-1.5">
                      {ROLE_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => toggleRole(opt.value)}
                          className={`rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors ${
                            roles.includes(opt.value)
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-card text-muted-foreground border-border hover:bg-accent"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <FieldLabel>{type === "company" ? "Razón social *" : "Nombre completo *"}</FieldLabel>
                  <FieldInput placeholder={type === "company" ? "Ej: Empresa S.L." : "Ej: María López García"} />
                </div>
                {type === "company" && (
                  <div>
                    <FieldLabel>Nombre comercial</FieldLabel>
                    <FieldInput placeholder="Nombre comercial (si difiere)" />
                  </div>
                )}
              </div>
            </div>

            {/* Separator */}
            <div className="border-t border-border" />

            {/* Fiscal & Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel>{type === "company" ? "CIF" : "NIF/NIE"}</FieldLabel>
                <FieldInput placeholder={type === "company" ? "B12345678" : "12345678A"} />
              </div>
              <div>
                <FieldLabel>Email</FieldLabel>
                <FieldInput placeholder="email@ejemplo.com" type="email" />
              </div>
              <div>
                <FieldLabel>Teléfono</FieldLabel>
                <FieldInput placeholder="+34 600 000 000" type="tel" />
              </div>
              <div>
                <FieldLabel>Web</FieldLabel>
                <FieldInput placeholder="www.ejemplo.com" />
              </div>
            </div>

            {/* Advanced settings (collapsible) */}
            <div>
              <button
                type="button"
                onClick={() => setAdvancedOpen(!advancedOpen)}
                className="w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-[13px] font-medium text-foreground hover:bg-accent transition-colors"
              >
                Configuración avanzada
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${advancedOpen ? "rotate-180" : ""}`} />
              </button>

              {advancedOpen && (
                <div className="mt-3 space-y-4">
                  {/* Address */}
                  <div>
                    <span className="text-[12px] font-medium text-foreground mb-2 block">Dirección</span>
                    <div className="space-y-3">
                      <FieldInput placeholder="Dirección" />
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <input placeholder="C.P." className="rounded-lg border border-border bg-background px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-ring" />
                        <input placeholder="Ciudad" className="rounded-lg border border-border bg-background px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-ring col-span-1 sm:col-span-2" />
                        <input placeholder="Provincia" className="rounded-lg border border-border bg-background px-3 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-ring" />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border" />

                  {/* Payment */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <FieldLabel>Días de pago</FieldLabel>
                      <FieldInput placeholder="30" type="number" />
                    </div>
                    <div>
                      <FieldLabel>Moneda</FieldLabel>
                      <select className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[13px] text-foreground outline-none appearance-none cursor-pointer focus:ring-1 focus:ring-ring">
                        <option value="EUR">EUR</option>
                        <option value="USD">USD</option>
                        <option value="GBP">GBP</option>
                      </select>
                    </div>
                    <div>
                      <FieldLabel>IBAN</FieldLabel>
                      <FieldInput placeholder="ES12 3456 7890..." />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Notes */}
            <div>
              <FieldLabel>Notas</FieldLabel>
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
              <Save className="h-3.5 w-3.5" />
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContactPage;
