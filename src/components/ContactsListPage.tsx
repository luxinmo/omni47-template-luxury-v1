import { useState } from "react";
import {
  Search, Plus, Building2, User, Mail, Phone,
  MoreHorizontal, Pencil, Trash2, ChevronRight, ChevronDown, Filter,
} from "lucide-react";

type ContactType = "company" | "person";
type ContactRole = "customer" | "provider" | "employee" | "other";
type ContactStatus = "active" | "provisional" | "archived";

interface DemoContact {
  id: string;
  type: ContactType;
  legal_name: string;
  trade_name: string | null;
  vat_id: string | null;
  email: string | null;
  phone: string | null;
  roles: ContactRole[];
  status: ContactStatus;
}

const ROLE_LABELS: Record<ContactRole, string> = {
  customer: "Cliente",
  provider: "Proveedor",
  employee: "Trabajador",
  other: "Otro",
};

const demoContacts: DemoContact[] = [
  { id: "1", type: "company", legal_name: "Inmobiliaria Martínez S.L.", trade_name: "Martínez Properties", vat_id: "B12345678", email: "carlos@martinez.com", phone: "+34 612 345 678", roles: ["customer"], status: "active" },
  { id: "2", type: "person", legal_name: "Ana García López", trade_name: null, vat_id: "12345678A", email: "ana.garcia@gmail.com", phone: "+34 655 123 456", roles: ["customer", "provider"], status: "active" },
  { id: "3", type: "company", legal_name: "Fernández & Asociados S.A.", trade_name: "F&A Inversiones", vat_id: "A87654321", email: "r.fernandez@fya.com", phone: "+34 678 901 234", roles: ["provider"], status: "active" },
  { id: "4", type: "person", legal_name: "Laura Sánchez Ruiz", trade_name: null, vat_id: "87654321B", email: "laura.sanchez@mail.com", phone: "+34 634 567 890", roles: ["customer"], status: "provisional" },
  { id: "5", type: "company", legal_name: "Torres Capital Group S.L.", trade_name: "Torres Capital", vat_id: "B11223344", email: "m.torres@empresa.es", phone: "+34 691 234 567", roles: ["customer"], status: "active" },
  { id: "6", type: "person", legal_name: "Elena Morales Vega", trade_name: null, vat_id: "44556677C", email: "elena.m@outlook.com", phone: "+34 622 111 222", roles: ["employee"], status: "active" },
  { id: "7", type: "company", legal_name: "Constructora Horizonte S.A.", trade_name: "Horizonte Build", vat_id: "A99887766", email: "info@horizonte.es", phone: "+34 911 222 333", roles: ["provider"], status: "archived" },
];

interface ContactsListPageProps {
  onAddContact: () => void;
  onViewContact: (id: string) => void;
}

const ContactsListPage = ({ onAddContact, onViewContact }: ContactsListPageProps) => {
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filterTypes, setFilterTypes] = useState<string[]>([]);
  const [filterRoles, setFilterRoles] = useState<string[]>([]);
  const [filterStatuses, setFilterStatuses] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filtered = demoContacts.filter((c) => {
    if (filterTypes.length > 0 && !filterTypes.includes(c.type)) return false;
    if (filterRoles.length > 0 && !filterRoles.some((r) => c.roles.includes(r as ContactRole))) return false;
    if (filterStatuses.length > 0 && !filterStatuses.includes(c.status)) return false;
    if (search) {
      const s = search.toLowerCase();
      const match =
        c.legal_name.toLowerCase().includes(s) ||
        c.trade_name?.toLowerCase().includes(s) ||
        c.vat_id?.toLowerCase().includes(s) ||
        c.email?.toLowerCase().includes(s);
      if (!match) return false;
    }
    return true;
  });

  const activeFiltersCount = filterTypes.length + filterRoles.length + filterStatuses.length;
  const allSelected = filtered.length > 0 && selectedIds.size === filtered.length;

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelectedIds(allSelected ? new Set() : new Set(filtered.map((c) => c.id)));
  };

  const toggleFilter = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const FilterChip = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-[11px] font-medium transition-colors ${
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-card text-muted-foreground border-border hover:bg-accent"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex-1 overflow-auto">
      {/* Header */}
      <div className="px-4 sm:px-6 pt-6 pb-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">Contactos</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{filtered.length} contactos</p>
          </div>
          <button
            onClick={onAddContact}
            className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity shrink-0"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="px-4 sm:px-6 pb-8 space-y-3">
        {/* Collapsible Filters */}
        <div className="rounded-xl border border-border bg-card shadow-card">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="w-full px-4 py-3 flex items-center justify-between text-sm font-medium text-foreground"
          >
            <div className="flex items-center gap-2">
              <Filter className="h-3.5 w-3.5 text-muted-foreground" />
              <span>Filtros</span>
              {activeFiltersCount > 0 && (
                <span className="h-5 min-w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold flex items-center justify-center px-1.5">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
          </button>

          {filtersOpen && (
            <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar nombre, CIF, email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-ring transition-shadow"
                />
              </div>

              {/* Type */}
              <div>
                <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Tipo</span>
                <div className="flex flex-wrap gap-1.5">
                  <FilterChip label="Empresa" active={filterTypes.includes("company")} onClick={() => toggleFilter(filterTypes, "company", setFilterTypes)} />
                  <FilterChip label="Persona" active={filterTypes.includes("person")} onClick={() => toggleFilter(filterTypes, "person", setFilterTypes)} />
                </div>
              </div>

              {/* Roles */}
              <div>
                <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Rol</span>
                <div className="flex flex-wrap gap-1.5">
                  {(Object.entries(ROLE_LABELS) as [ContactRole, string][]).map(([key, label]) => (
                    <FilterChip key={key} label={label} active={filterRoles.includes(key)} onClick={() => toggleFilter(filterRoles, key, setFilterRoles)} />
                  ))}
                </div>
              </div>

              {/* Status */}
              <div>
                <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Estado</span>
                <div className="flex flex-wrap gap-1.5">
                  <FilterChip label="Activo" active={filterStatuses.includes("active")} onClick={() => toggleFilter(filterStatuses, "active", setFilterStatuses)} />
                  <FilterChip label="Provisional" active={filterStatuses.includes("provisional")} onClick={() => toggleFilter(filterStatuses, "provisional", setFilterStatuses)} />
                  <FilterChip label="Archivado" active={filterStatuses.includes("archived")} onClick={() => toggleFilter(filterStatuses, "archived", setFilterStatuses)} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        {selectedIds.size > 0 && (
          <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5 flex items-center justify-between">
            <span className="text-[13px] text-foreground font-medium">{selectedIds.size} seleccionados</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedIds(new Set())}
                className="text-[12px] text-muted-foreground hover:text-foreground transition-colors"
              >
                Deseleccionar
              </button>
              <button className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-1.5 text-[12px] font-medium text-destructive hover:bg-destructive/20 transition-colors">
                <Trash2 className="h-3 w-3 inline mr-1" />
                Eliminar
              </button>
            </div>
          </div>
        )}

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-border bg-card shadow-card py-16 text-center">
            <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-base font-medium text-foreground mb-1">Sin contactos</h3>
            <p className="text-sm text-muted-foreground">
              {demoContacts.length === 0 ? "Añade tu primer contacto para empezar." : "No hay contactos que coincidan con los filtros."}
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border bg-muted/50">
                  <tr>
                    <th className="w-[40px] p-3">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={toggleSelectAll}
                        className="rounded border-border"
                      />
                    </th>
                    <th className="w-[50px] p-3 text-left text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Tipo</th>
                    <th className="p-3 text-left text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Nombre</th>
                    <th className="p-3 text-left text-[11px] font-medium text-muted-foreground uppercase tracking-wider">CIF/NIF</th>
                    <th className="p-3 text-left text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                    <th className="p-3 text-left text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Teléfono</th>
                    <th className="p-3 text-left text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Roles</th>
                    <th className="p-3 text-left text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Estado</th>
                    <th className="w-[50px] p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr
                      key={c.id}
                      className={`border-b border-border last:border-0 cursor-pointer hover:bg-muted/50 transition-colors ${selectedIds.has(c.id) ? "bg-primary/5" : ""}`}
                      onClick={() => onViewContact(c.id)}
                    >
                      <td className="p-3" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedIds.has(c.id)}
                          onChange={() => toggleSelection(c.id)}
                          className="rounded border-border"
                        />
                      </td>
                      <td className="p-3">
                        {c.type === "company" ? (
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <User className="h-4 w-4 text-muted-foreground" />
                        )}
                      </td>
                      <td className="p-3">
                        <div className="flex flex-col">
                          <span className="font-medium text-[13px] text-foreground truncate max-w-[250px]">
                            {c.trade_name || c.legal_name}
                          </span>
                          {c.trade_name && (
                            <span className="text-[11px] text-muted-foreground truncate max-w-[250px]">
                              {c.legal_name}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-[13px] text-muted-foreground">{c.vat_id || "-"}</td>
                      <td className="p-3">
                        {c.email ? (
                          <span className="flex items-center gap-1.5 text-[13px] text-muted-foreground truncate max-w-[180px]">
                            <Mail className="h-3 w-3 shrink-0" />
                            {c.email}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="p-3">
                        {c.phone ? (
                          <span className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                            <Phone className="h-3 w-3 shrink-0" />
                            {c.phone}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          {c.roles.slice(0, 2).map((role) => (
                            <span key={role} className="inline-flex items-center rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-medium text-foreground">
                              {ROLE_LABELS[role]}
                            </span>
                          ))}
                          {c.roles.length > 2 && (
                            <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                              +{c.roles.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3">
                        {c.status === "provisional" ? (
                          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-medium text-primary">
                            Creado por IA
                          </span>
                        ) : c.status === "archived" ? (
                          <span className="inline-flex items-center rounded-full border border-border bg-muted px-2.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                            Archivado
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-medium text-emerald-700">
                            Activo
                          </span>
                        )}
                      </td>
                      <td className="p-3" onClick={(e) => e.stopPropagation()}>
                        <button className="h-7 w-7 rounded-md flex items-center justify-center text-muted-foreground hover:bg-accent transition-colors">
                          <MoreHorizontal className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-border">
              {filtered.map((c) => (
                <div
                  key={c.id}
                  className="p-4 flex items-start justify-between gap-3 cursor-pointer hover:bg-muted/50 transition-colors active:bg-muted"
                  onClick={() => onViewContact(c.id)}
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="p-2 rounded-full bg-muted shrink-0">
                      {c.type === "company" ? (
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <User className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[13px] text-foreground truncate">{c.trade_name || c.legal_name}</p>
                      {c.vat_id && <p className="text-[11px] text-muted-foreground">{c.vat_id}</p>}
                      {c.email && (
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Mail className="h-3 w-3" />
                          <span className="truncate">{c.email}</span>
                        </p>
                      )}
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {c.roles.map((role) => (
                          <span key={role} className="inline-flex items-center rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-medium text-foreground">
                            {ROLE_LABELS[role]}
                          </span>
                        ))}
                        {c.status === "provisional" && (
                          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                            IA
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-border bg-muted/30 flex items-center justify-between">
              <span className="text-[12px] text-muted-foreground">{filtered.length} contactos</span>
              <span className="text-[12px] text-muted-foreground">Página 1 de 1</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactsListPage;
