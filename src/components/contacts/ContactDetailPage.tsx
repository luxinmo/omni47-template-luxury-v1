import { useState } from "react";
import {
  ArrowLeft, Mail, Phone, MapPin, FileText, Globe, Hash, Edit2,
  Link2, Unlink, Plus, PhoneCall, MailOpen, Eye, Calendar, Clock,
  Building2, User, DollarSign, TrendingUp, TrendingDown, X, Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import AvatarUpload from "@/components/ui/avatar-upload";
import { MOCK_CONTACTS, MOCK_RELATED_CONTACTS, MOCK_OWNED_PROPERTIES, MOCK_ACTIVITIES } from "./mock-data";
import type {
  Contact, RelatedContact, RelationshipType, Language,
} from "./types";
import {
  ROLE_OPTIONS, LANGUAGE_OPTIONS, RELATIONSHIP_OPTIONS,
} from "./types";

interface ContactDetailPageProps {
  contactId: string;
  onBack: () => void;
  onEdit: () => void;
}

const roleLabel: Record<string, string> = Object.fromEntries(ROLE_OPTIONS.map((r) => [r.value, r.label]));

const activityIcon: Record<string, any> = {
  call: PhoneCall,
  email: MailOpen,
  visit: Eye,
  note: FileText,
  document: FileText,
};

const ContactDetailPage = ({ contactId, onBack, onEdit }: ContactDetailPageProps) => {
  const contact = MOCK_CONTACTS.find((c) => c.id === contactId) || MOCK_CONTACTS[0];
  const [avatar, setAvatar] = useState<string | undefined>(contact.avatar);
  const [relatedContacts, setRelatedContacts] = useState<RelatedContact[]>(MOCK_RELATED_CONTACTS);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [linkSearch, setLinkSearch] = useState("");
  const [linkRelType, setLinkRelType] = useState<RelationshipType>("associate");

  const initials = contact.type === "person"
    ? (contact.firstName?.[0] || "") + (contact.lastName?.[0] || "")
    : contact.name.slice(0, 2).toUpperCase();

  const isOwner = contact.roles.includes("owner");

  const SectionCard = ({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) => (
    <div className={cn("rounded-xl border border-border bg-card shadow-card overflow-hidden", className)}>
      <div className="px-5 py-3 border-b border-border">
        <h3 className="text-[13px] font-semibold text-foreground">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );

  const InfoRow = ({ icon: Icon, label, children }: { icon: any; label: string; children: React.ReactNode }) => (
    <div className="flex items-start gap-3 py-2">
      <Icon className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
      <div className="min-w-0 flex-1">
        <span className="text-[11px] text-muted-foreground uppercase tracking-wider block mb-0.5">{label}</span>
        <div className="text-[13px] text-foreground">{children}</div>
      </div>
    </div>
  );

  const linkSearchResults = MOCK_CONTACTS.filter(
    (c) =>
      c.id !== contact.id &&
      !relatedContacts.some((rc) => rc.contactId === c.id) &&
      (linkSearch ? c.name.toLowerCase().includes(linkSearch.toLowerCase()) : true),
  );

  const handleLink = (c: Contact) => {
    setRelatedContacts((prev) => [
      ...prev,
      { contactId: c.id, name: c.name, relationship: linkRelType },
    ]);
    setLinkModalOpen(false);
    setLinkSearch("");
  };

  const handleUnlink = (id: string) => {
    setRelatedContacts((prev) => prev.filter((rc) => rc.contactId !== id));
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 sm:py-6 space-y-6">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver al listado
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <AvatarUpload
            value={avatar}
            initials={initials}
            onChange={setAvatar}
            size={80}
            variant={contact.type === "company" ? "company" : "person"}
          />
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
              {contact.name}
            </h1>
            {contact.comercialName && (
              <p className="text-sm text-muted-foreground">{contact.comercialName}</p>
            )}
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              {contact.roles.map((r) => (
                <span
                  key={r}
                  className="rounded-full border px-2.5 py-0.5 text-[11px] font-medium bg-primary/10 text-primary border-primary/20"
                >
                  {roleLabel[r]}
                </span>
              ))}
              <span className={cn(
                "rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
                contact.status === "active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                contact.status === "provisional" ? "bg-amber-50 text-amber-700 border-amber-200" :
                "bg-muted text-muted-foreground border-border",
              )}>
                {contact.status === "active" ? "Activo" : contact.status === "provisional" ? "Provisional" : "Archivado"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => window.open(`mailto:${contact.emails[0]}`)}
              className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-[13px] font-medium text-foreground hover:bg-accent transition-colors"
            >
              <Mail className="h-3.5 w-3.5" /> Email
            </button>
            <button
              onClick={onEdit}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Edit2 className="h-3.5 w-3.5" /> Editar
            </button>
          </div>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left */}
          <div className="lg:col-span-3 space-y-6">
            <SectionCard title="Información de contacto">
              <div className="space-y-1 divide-y divide-border">
                <InfoRow icon={Hash} label={contact.type === "company" ? "CIF" : "NIF/NIE"}>
                  {contact.cifNif}
                </InfoRow>

                <div className="py-2">
                  <div className="flex items-center gap-3 mb-1">
                    <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-[11px] text-muted-foreground uppercase tracking-wider">Emails</span>
                  </div>
                  {contact.emails.map((e, i) => (
                    <div key={i} className="ml-7 text-[13px] text-foreground py-0.5">{e}</div>
                  ))}
                  <button className="ml-7 mt-1 text-[12px] text-primary font-medium hover:underline flex items-center gap-1">
                    <Plus className="h-3 w-3" /> Añadir email
                  </button>
                </div>

                <div className="py-2">
                  <div className="flex items-center gap-3 mb-1">
                    <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-[11px] text-muted-foreground uppercase tracking-wider">Teléfonos</span>
                  </div>
                  {contact.phones.map((p, i) => (
                    <div key={i} className="ml-7 text-[13px] text-foreground py-0.5">{p}</div>
                  ))}
                  <button className="ml-7 mt-1 text-[12px] text-primary font-medium hover:underline flex items-center gap-1">
                    <Plus className="h-3 w-3" /> Añadir teléfono
                  </button>
                </div>

                {contact.address && (
                  <InfoRow icon={MapPin} label="Dirección">{contact.address}</InfoRow>
                )}

                {contact.web && (
                  <InfoRow icon={Globe} label="Web">{contact.web}</InfoRow>
                )}

                {contact.languages.length > 0 && (
                  <div className="py-2">
                    <div className="flex items-center gap-3 mb-1.5">
                      <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-[11px] text-muted-foreground uppercase tracking-wider">Idiomas</span>
                    </div>
                    <div className="ml-7 flex flex-wrap gap-1.5">
                      {contact.languages.map((l) => {
                        const opt = LANGUAGE_OPTIONS.find((lo) => lo.value === l);
                        return (
                          <span key={l} className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-[11px] font-medium text-foreground">
                            {opt?.flag} {l}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {contact.origin && (
                  <InfoRow icon={Globe} label="Origen">
                    <span className="inline-flex rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-[11px] font-medium">
                      {contact.origin}
                    </span>
                  </InfoRow>
                )}

                {contact.notes && (
                  <InfoRow icon={FileText} label="Notas">{contact.notes}</InfoRow>
                )}
              </div>
            </SectionCard>

            {/* Related contacts */}
            <SectionCard title="Contactos relacionados">
              {relatedContacts.length > 0 ? (
                <div className="space-y-2">
                  {relatedContacts.map((rc) => (
                    <div key={rc.contactId} className="flex items-center gap-3 rounded-lg border border-border p-3">
                      <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-[12px] font-medium text-muted-foreground">
                        {rc.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-medium text-foreground truncate">{rc.name}</div>
                        <div className="text-[11px] text-muted-foreground capitalize">{rc.relationship}</div>
                      </div>
                      <button
                        onClick={() => handleUnlink(rc.contactId)}
                        className="h-7 w-7 rounded-md flex items-center justify-center hover:bg-destructive/10 transition-colors"
                      >
                        <Unlink className="h-3.5 w-3.5 text-muted-foreground" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[13px] text-muted-foreground">Sin contactos relacionados</p>
              )}
              <button
                onClick={() => setLinkModalOpen(true)}
                className="mt-3 flex items-center gap-1.5 text-[12px] text-primary font-medium hover:underline"
              >
                <Link2 className="h-3.5 w-3.5" /> Vincular contacto
              </button>
            </SectionCard>
          </div>

          {/* Right */}
          <div className="lg:col-span-2 space-y-6">
            {isOwner && (
              <SectionCard title="Propiedades">
                {MOCK_OWNED_PROPERTIES.length > 0 ? (
                  <div className="space-y-3">
                    {MOCK_OWNED_PROPERTIES.map((p) => (
                      <div key={p.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                        <div className="h-12 w-16 rounded-md bg-muted flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-medium text-foreground truncate">{p.title}</div>
                          <div className="text-[11px] text-muted-foreground">{p.reference}</div>
                        </div>
                        <span className="rounded-full border border-border bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground shrink-0">
                          {p.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[13px] text-muted-foreground">Sin propiedades vinculadas</p>
                )}
              </SectionCard>
            )}

            <SectionCard title="Resumen financiero">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-emerald-50 p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-[11px] font-medium text-emerald-700">Ingresos</span>
                  </div>
                  <div className="text-lg font-semibold text-emerald-800">€24,500</div>
                  <div className="text-[11px] text-emerald-600">3 operaciones</div>
                </div>
                <div className="rounded-lg bg-red-50 p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <TrendingDown className="h-3.5 w-3.5 text-red-600" />
                    <span className="text-[11px] font-medium text-red-700">Gastos</span>
                  </div>
                  <div className="text-lg font-semibold text-red-800">€8,200</div>
                  <div className="text-[11px] text-red-600">5 operaciones</div>
                </div>
              </div>
              {contact.paymentDays && (
                <div className="mt-3 flex items-center gap-2 rounded-lg border border-border p-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-[13px] text-foreground">Días de pago: <strong>{contact.paymentDays}</strong></span>
                </div>
              )}
            </SectionCard>

            <SectionCard title="Actividad reciente">
              <div className="space-y-0">
                {MOCK_ACTIVITIES.map((a, i) => {
                  const Icon = activityIcon[a.type] || FileText;
                  return (
                    <div key={a.id} className="flex gap-3 py-2.5 relative">
                      {i < MOCK_ACTIVITIES.length - 1 && (
                        <div className="absolute left-[11px] top-10 bottom-0 w-px bg-border" />
                      )}
                      <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center shrink-0 relative z-10">
                        <Icon className="h-3 w-3 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] text-foreground leading-snug">{a.description}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{a.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </SectionCard>
          </div>
        </div>
      </div>

      {/* Link contact modal */}
      {linkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm" onClick={() => setLinkModalOpen(false)}>
          <div
            className="w-full max-w-md rounded-xl border border-border bg-card shadow-elevated p-5 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-foreground">Vincular contacto</h3>
              <button onClick={() => setLinkModalOpen(false)} className="h-7 w-7 rounded-md flex items-center justify-center hover:bg-accent">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <div>
              <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Tipo de relación</label>
              <select
                value={linkRelType}
                onChange={(e) => setLinkRelType(e.target.value as RelationshipType)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-[13px] text-foreground outline-none focus:ring-1 focus:ring-ring"
              >
                {RELATIONSHIP_OPTIONS.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Buscar contacto</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  value={linkSearch}
                  onChange={(e) => setLinkSearch(e.target.value)}
                  placeholder="Nombre del contacto..."
                  className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>
            <div className="max-h-48 overflow-y-auto space-y-1">
              {linkSearchResults.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleLink(c)}
                  className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-accent transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-[11px] font-medium text-muted-foreground">
                    {c.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-foreground">{c.name}</div>
                    <div className="text-[11px] text-muted-foreground">{c.cifNif}</div>
                  </div>
                </button>
              ))}
              {linkSearchResults.length === 0 && (
                <p className="text-[13px] text-muted-foreground text-center py-4">Sin resultados</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactDetailPage;
