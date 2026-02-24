import {
  ArrowLeft, Building2, User, Pencil, Send,
  Mail, Phone, Globe, MapPin, FileText, CreditCard,
  TrendingUp, TrendingDown,
} from "lucide-react";

const ROLE_LABELS: Record<string, string> = {
  customer: "Cliente",
  provider: "Proveedor",
  employee: "Trabajador",
  other: "Otro",
};

// Demo contact data (would come from route param in real app)
const demoContactData: Record<string, {
  type: "company" | "person";
  legal_name: string;
  trade_name: string | null;
  vat_id: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  province: string | null;
  country: string | null;
  roles: string[];
  status: string;
  payment_terms_days: number | null;
  iban: string | null;
  notes: string | null;
}> = {
  "1": { type: "company", legal_name: "Inmobiliaria Martínez S.L.", trade_name: "Martínez Properties", vat_id: "B12345678", email: "carlos@martinez.com", phone: "+34 612 345 678", website: "martinez-properties.es", address: "Calle Gran Vía 42, 3ºA", city: "Madrid", postal_code: "28013", province: "Madrid", country: "ES", roles: ["customer"], status: "active", payment_terms_days: 30, iban: "ES12 3456 7890 1234 5678 9012", notes: "Cliente preferente desde 2020" },
  "2": { type: "person", legal_name: "Ana García López", trade_name: null, vat_id: "12345678A", email: "ana.garcia@gmail.com", phone: "+34 655 123 456", website: null, address: "Av. Diagonal 512", city: "Barcelona", postal_code: "08006", province: "Barcelona", country: "ES", roles: ["customer", "provider"], status: "active", payment_terms_days: 60, iban: null, notes: null },
  "3": { type: "company", legal_name: "Fernández & Asociados S.A.", trade_name: "F&A Inversiones", vat_id: "A87654321", email: "r.fernandez@fya.com", phone: "+34 678 901 234", website: "fya-inversiones.com", address: "Paseo de la Castellana 100", city: "Madrid", postal_code: "28046", province: "Madrid", country: "ES", roles: ["provider"], status: "active", payment_terms_days: 45, iban: "ES98 7654 3210 9876 5432 1098", notes: "Proveedor de servicios legales" },
};

// Demo invoices/expenses
const demoInvoices = [
  { id: "INV-001", date: "15/01/2025", number: "F-2025-001", total: 12500, status: "paid" },
  { id: "INV-002", date: "28/02/2025", number: "F-2025-015", total: 8750, status: "sent" },
  { id: "INV-003", date: "10/03/2025", number: "F-2025-028", total: 3200, status: "overdue" },
];

const demoExpenses = [
  { id: "EXP-001", date: "05/01/2025", number: "G-2025-003", total: 4500, status: "paid" },
  { id: "EXP-002", date: "20/02/2025", number: "G-2025-012", total: 2100, status: "paid" },
];

interface ContactDetailPageProps {
  contactId: string;
  onBack: () => void;
  onEdit: () => void;
}

const ContactDetailPage = ({ contactId, onBack, onEdit }: ContactDetailPageProps) => {
  const contact = demoContactData[contactId] || demoContactData["1"];
  const displayName = contact.trade_name || contact.legal_name;
  const initials = displayName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const Icon = contact.type === "company" ? Building2 : User;

  const invoiceTotal = demoInvoices.reduce((sum, i) => sum + i.total, 0);
  const expenseTotal = demoExpenses.reduce((sum, e) => sum + e.total, 0);

  const fullAddress = [contact.address, contact.postal_code, contact.city, contact.province, contact.country]
    .filter(Boolean)
    .join(", ");

  const statusInfo = (status: string) => {
    switch (status) {
      case "paid": return { label: "Pagada", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" };
      case "sent": return { label: "Pendiente", cls: "bg-amber-50 text-amber-700 border-amber-200" };
      case "overdue": return { label: "Impagada", cls: "bg-red-50 text-red-700 border-red-200" };
      default: return { label: "Pendiente", cls: "bg-muted text-muted-foreground border-border" };
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-5">
        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Volver a contactos
        </button>

        {/* Hero Card */}
        <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
          <div className={`h-24 sm:h-32 relative ${contact.type === "company" ? "bg-gradient-to-r from-primary/80 to-primary/40" : "bg-gradient-to-r from-muted to-accent"}`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
          <div className="relative px-5 sm:px-6 pb-5">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10 sm:-mt-12">
              {/* Avatar */}
              <div className={`h-20 w-20 sm:h-24 sm:w-24 rounded-xl flex items-center justify-center shrink-0 border-4 border-card shadow-md ${contact.type === "company" ? "bg-primary/10" : "bg-muted"}`}>
                <Icon className={`h-8 w-8 sm:h-10 sm:w-10 ${contact.type === "company" ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              {/* Info */}
              <div className="flex-1 sm:pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-semibold text-foreground">{displayName}</h1>
                  {contact.status === "provisional" && (
                    <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-primary">
                      Creado por IA
                    </span>
                  )}
                </div>
                {contact.trade_name && (
                  <p className="text-sm text-muted-foreground">{contact.legal_name}</p>
                )}
                <div className="flex flex-wrap gap-1 mt-2">
                  {contact.roles.map((role) => (
                    <span key={role} className="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-[10px] font-medium text-foreground">
                      {ROLE_LABELS[role] || role}
                    </span>
                  ))}
                </div>
              </div>
              {/* Actions */}
              <div className="flex gap-2 sm:pb-1">
                <button
                  onClick={onEdit}
                  className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-[13px] font-medium text-foreground hover:bg-accent transition-colors"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Editar</span>
                </button>
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-[13px] font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Email</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid gap-5 md:grid-cols-2">
          {/* Contact Info Card */}
          <div className="rounded-xl border border-border bg-card shadow-card">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" />
                Información de contacto
              </h2>
            </div>
            <div className="p-5 space-y-4">
              {contact.vat_id && (
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-foreground">NIF/CIF</p>
                    <p className="text-[13px] text-muted-foreground">{contact.vat_id}</p>
                  </div>
                </div>
              )}
              {contact.email && (
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-foreground">Email</p>
                    <p className="text-[13px] text-primary">{contact.email}</p>
                  </div>
                </div>
              )}
              {contact.phone && (
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-foreground">Teléfono</p>
                    <p className="text-[13px] text-muted-foreground">{contact.phone}</p>
                  </div>
                </div>
              )}
              {contact.website && (
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Globe className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-foreground">Web</p>
                    <p className="text-[13px] text-primary">{contact.website}</p>
                  </div>
                </div>
              )}
              {fullAddress && (
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-[12px] font-medium text-foreground">Dirección</p>
                    <p className="text-[13px] text-muted-foreground">{fullAddress}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Financial Summary Card */}
          <div className="rounded-xl border border-border bg-card shadow-card">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-primary" />
                Resumen financiero
              </h2>
            </div>
            <div className="p-5 space-y-4">
              {/* Ingresos */}
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  <span className="text-[13px] font-semibold text-emerald-700">Ingresos ({demoInvoices.length} facturas)</span>
                </div>
                <p className="text-xl font-bold text-emerald-600">
                  {invoiceTotal.toLocaleString("es-ES", { minimumFractionDigits: 2 })} €
                </p>
              </div>

              {/* Gastos */}
              <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="h-4 w-4 text-red-600" />
                  <span className="text-[13px] font-semibold text-red-700">Gastos ({demoExpenses.length} facturas)</span>
                </div>
                <p className="text-xl font-bold text-red-600">
                  {expenseTotal.toLocaleString("es-ES", { minimumFractionDigits: 2 })} €
                </p>
              </div>

              {/* Payment info */}
              {(contact.payment_terms_days || contact.iban) && (
                <div className="border-t border-border pt-3 space-y-2">
                  {contact.payment_terms_days && (
                    <div className="flex justify-between text-[13px]">
                      <span className="text-muted-foreground">Días de pago</span>
                      <span className="font-medium text-foreground">{contact.payment_terms_days} días</span>
                    </div>
                  )}
                  {contact.iban && (
                    <div className="flex justify-between text-[13px]">
                      <span className="text-muted-foreground">IBAN</span>
                      <span className="font-medium text-foreground font-mono text-[11px]">{contact.iban}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">Facturas ({demoInvoices.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="p-3 text-left text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Fecha</th>
                  <th className="p-3 text-left text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Nº Factura</th>
                  <th className="p-3 text-left text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Estado</th>
                  <th className="p-3 text-right text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody>
                {demoInvoices.map((inv) => {
                  const si = statusInfo(inv.status);
                  return (
                    <tr key={inv.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="p-3 text-[13px] text-muted-foreground">{inv.date}</td>
                      <td className="p-3 text-[13px] font-medium text-foreground">{inv.number}</td>
                      <td className="p-3">
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${si.cls}`}>
                          {si.label}
                        </span>
                      </td>
                      <td className="p-3 text-right text-[13px] font-medium text-foreground">
                        {inv.total.toLocaleString("es-ES", { minimumFractionDigits: 2 })} €
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notes */}
        {contact.notes && (
          <div className="rounded-xl border border-border bg-card shadow-card p-5">
            <h2 className="text-sm font-semibold text-foreground mb-2">Notas</h2>
            <p className="text-[13px] text-muted-foreground">{contact.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactDetailPage;
