import { Building2, LayoutGrid, Home, Users, Building, UserCircle, Briefcase, Settings } from "lucide-react";

const topItems = [
  { icon: LayoutGrid, label: "Dashboard", view: "dashboard" },
  { icon: Home, label: "Propiedades", view: "properties" },
  { icon: Users, label: "Contactos", view: "contacts" },
  { icon: Building, label: "Agencias", view: "agencies" },
];

const bottomItems = [
  { icon: UserCircle, label: "Usuarios", view: "users" },
  { icon: Briefcase, label: "Empresa", view: "company" },
  { icon: Settings, label: "Ajustes", view: "settings" },
];

interface AppSidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

const AppSidebar = ({ currentView, onNavigate }: AppSidebarProps) => {
  const renderItem = (item: { icon: any; label: string; view: string }) => {
    const isActive = currentView === item.view;
    return (
      <button
        key={item.label}
        onClick={() => onNavigate(item.view)}
        className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all ${
          isActive
            ? "bg-sidebar-custom-active text-sidebar-custom-fg-active"
            : "text-sidebar-custom-fg hover:bg-sidebar-custom-hover"
        }`}
      >
        <item.icon className="h-4 w-4 shrink-0" strokeWidth={isActive ? 2 : 1.5} />
        <span>{item.label}</span>
      </button>
    );
  };

  return (
    <aside className="flex w-56 flex-col border-r border-sidebar-custom-border bg-sidebar-custom-bg shrink-0">
      <div className="flex h-14 items-center gap-2.5 border-b border-sidebar-custom-border px-5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
          <Building2 className="h-3.5 w-3.5 text-primary-foreground" />
        </div>
        <span className="text-[13px] font-semibold tracking-tight text-sidebar-custom-fg-active">
          RealEstateOS
        </span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {topItems.map(renderItem)}
        <div className="!my-3 mx-3 border-t border-sidebar-custom-border" />
        {bottomItems.map(renderItem)}
      </nav>

      <div className="border-t border-sidebar-custom-border px-5 py-3">
        <p className="text-[10px] font-medium text-sidebar-custom-fg/50 uppercase tracking-widest">Design Preview · v1.0</p>
      </div>
    </aside>
  );
};

export default AppSidebar;
