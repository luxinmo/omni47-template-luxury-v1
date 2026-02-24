import { useState, useMemo } from "react";
import {
  Search, Plus, ChevronDown, ChevronUp, Building2, User,
  MoreHorizontal, Mail, Phone, Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MOCK_CONTACTS } from "./mock-data";
import type { Contact, ContactType, ContactRole, ContactStatus } from "./types";
import { ROLE_OPTIONS, STATUS_OPTIONS } from "./types";

interface ContactsListPageProps {
  onAddContact: () => void;
  onViewContact: (id: string) => void;
}

const PAGE_SIZE = 8;

const roleBadgeColor: Record<ContactRole, string> = {
  client: "bg-blue-50 text-blue-700 border-blue-200",
  provider: "bg-amber-50 text-amber-700 border-amber-200",
  worker: "bg-emerald-50 text-emerald-700 border-emerald-200",
  owner: "bg-violet-50 text-violet-700 border-violet-200",
  other: "bg-muted text-muted-foreground border-border",
};

const statusBadgeColor: Record<ContactStatus, string> = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  provisional: "bg-amber-50 text-amber-700 border-amber-200",
  archived: "bg-muted text-muted-foreground border-border",
};

const statusLabel: Record<ContactStatus, string> = {
  active: "Activo",
  provisional: "Provisional",
  archived: "Archivado",
};

const roleLabel: Record<ContactRole, string> = {
  client: "Cliente",
  provider: "Proveedor",
  worker: "Trabajador",
  owner: "Propietario",
  other: "Otro",
};

const ContactsListPage = ({ onAddContact, onViewContact }: ContactsListPageProps) => {
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState<ContactType | "all">("all");
  const [roleFilter, setRoleFilter] = useState<ContactRole | "all">("all");
  const [statusFilter, setStatusFilter] = useState<ContactStatus | "all">("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return MOCK_CONTACTS.filter((c) => {
      const q = search.toLowerCase();
      if (q && !c.name.toLowerCase().includes(q) && !c.cifNif.toLowerCase().includes(q) && !c.emails.some((e) => e.toLowerCase().includes(q))) return false;
      if (typeFilter !== "all" && c.type !== typeFilter) return false;
      if (roleFilter !== "all" && !c.roles.includes(roleFilter)) return false;
      if (statusFilter !== "all" && c.status !== statusFilter) return false;
      return true;
    });
  }, [search, typeFilter, roleFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleAll = () => {
    if (selected.size === paged.length) setSelected(new Set());
    else setSelected(new Set(paged.map((c) => c.id)));
  };

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const Pill = ({
    active,
    onClick,
    children,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-[11px] font-medium transition-colors",
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-card text-muted-foreground border-border hover:bg-accent",
      )}
    >
      {children}
    </button>
  );

  return (
    <div className="flex-1 overflow-auto">
      <div className="px-4 sm:px-8 pt-6 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
            Contactos
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {filtered.length} contacto{filtered.length !== 1 && "s"}
          </p>
        </div>
        <button
          onClick={onAddContact}
          className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2.5 text-[13px] font-medium text-primary-foreground hover:opacity-90 transition-opacity self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" /> Nuevo
        </button>
      </div>

      {/* Filters */}
      <div className="px-4 sm:px-8 mb-4">
        <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
          {/* Search + toggle */}
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Buscar por nombre, CIF o email..."
                className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            <button
              type="button"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[12px] font-medium transition-colors",
                filtersOpen
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:bg-accent",
              )}
            >
              <Filter className="h-3.5 w-3.5" />
              Filtros
              {filtersOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          </div>

          {filtersOpen && (
            <div className="border-t border-border px-4 py-3 space-y-3">
              <div>
                <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Tipo</span>
                <div className="flex flex-wrap gap-1.5">
                  <Pill active={typeFilter === "all"} onClick={() => { setTypeFilter("all"); setPage(1); }}>Todos</Pill>
                  <Pill active={typeFilter === "company"} onClick={() => { setTypeFilter("company"); setPage(1); }}>Empresa</Pill>
                  <Pill active={typeFilter === "person"} onClick={() => { setTypeFilter("person"); setPage(1); }}>Persona</Pill>
                </div>
              </div>
              <div>
                <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Rol</span>
                <div className="flex flex-wrap gap-1.5">
                  <Pill active={roleFilter === "all"} onClick={() => { setRoleFilter("all"); setPage(1); }}>Todos</Pill>
                  {ROLE_OPTIONS.map((r) => (
                    <Pill key={r.value} active={roleFilter === r.value} onClick={() => { setRoleFilter(r.value); setPage(1); }}>{r.label}</Pill>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1.5 block">Estado</span>
                <div className="flex flex-wrap gap-1.5">
                  <Pill active={statusFilter === "all"} onClick={() => { setStatusFilter("all"); setPage(1); }}>Todos</Pill>
                  {STATUS_OPTIONS.map((s) => (
                    <Pill key={s.value} active={statusFilter === s.value} onClick={() => { setStatusFilter(s.value); setPage(1); }}>{s.label}</Pill>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-t border-border bg-muted/30">
                  <th className="w-10 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={paged.length > 0 && selected.size === paged.length}
                      onChange={toggleAll}
                      className="rounded border-border"
                    />
                  </th>
                  <th className="w-10 px-2 py-3" />
                  <th className="text-left px-3 py-3 font-medium text-muted-foreground">Nombre</th>
                  <th className="text-left px-3 py-3 font-medium text-muted-foreground hidden md:table-cell">CIF/NIF</th>
                  <th className="text-left px-3 py-3 font-medium text-muted-foreground hidden lg:table-cell">Email</th>
                  <th className="text-left px-3 py-3 font-medium text-muted-foreground hidden lg:table-cell">Teléfono</th>
                  <th className="text-left px-3 py-3 font-medium text-muted-foreground hidden sm:table-cell">Roles</th>
                  <th className="text-left px-3 py-3 font-medium text-muted-foreground">Estado</th>
                  <th className="w-10 px-3 py-3" />
                </tr>
              </thead>
              <tbody>
                {paged.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => onViewContact(c.id)}
                    className="border-t border-border hover:bg-muted/30 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selected.has(c.id)}
                        onChange={() => toggleOne(c.id)}
                        className="rounded border-border"
                      />
                    </td>
                    <td className="px-2 py-3">
                      <div className={cn("h-8 w-8 rounded-full flex items-center justify-center", c.type === "company" ? "bg-primary/10" : "bg-muted")}>
                        {c.type === "company" ? (
                          <Building2 className="h-3.5 w-3.5 text-primary" />
                        ) : (
                          <User className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="font-medium text-foreground">{c.name}</div>
                      {c.type === "person" && c.companyName && (
                        <div className="text-[11px] text-muted-foreground">{c.companyName}</div>
                      )}
                    </td>
                    <td className="px-3 py-3 text-muted-foreground hidden md:table-cell">{c.cifNif}</td>
                    <td className="px-3 py-3 text-muted-foreground hidden lg:table-cell">{c.emails[0] || "—"}</td>
                    <td className="px-3 py-3 text-muted-foreground hidden lg:table-cell">{c.phones[0] || "—"}</td>
                    <td className="px-3 py-3 hidden sm:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {c.roles.map((r) => (
                          <span key={r} className={cn("inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium", roleBadgeColor[r])}>
                            {roleLabel[r]}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span className={cn("inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium", statusBadgeColor[c.status])}>
                        {statusLabel[c.status]}
                      </span>
                    </td>
                    <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                      <button className="h-7 w-7 rounded-md flex items-center justify-center hover:bg-accent transition-colors">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                ))}
                {paged.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-4 py-12 text-center text-muted-foreground">
                      No se encontraron contactos
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="border-t border-border px-4 py-3 flex items-center justify-between">
              <span className="text-[12px] text-muted-foreground">
                Página {page} de {totalPages}
              </span>
              <div className="flex items-center gap-1">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="rounded-md border border-border px-3 py-1.5 text-[12px] font-medium text-foreground hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Anterior
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={cn(
                      "rounded-md px-2.5 py-1.5 text-[12px] font-medium transition-colors",
                      p === page
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent",
                    )}
                  >
                    {p}
                  </button>
                ))}
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="rounded-md border border-border px-3 py-1.5 text-[12px] font-medium text-foreground hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactsListPage;
