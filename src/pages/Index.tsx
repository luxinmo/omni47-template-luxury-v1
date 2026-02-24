import { useState } from "react";
import AppSidebar from "@/components/AppSidebar";
import HeaderBar from "@/components/HeaderBar";
import ContactsListPage from "@/components/ContactsListPage";
import AddContactPage from "@/components/AddContactPage";
import PropertiesPage from "@/components/PropertiesPage";
import UsersPage from "@/components/UsersPage";

type View = "dashboard" | "properties" | "contacts" | "add-contact" | "agencies" | "users" | "company" | "settings";

const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex-1 overflow-auto">
    <div className="px-8 pt-8 pb-6">
      <h1 className="text-2xl font-semibold text-foreground tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground mt-1">Esta sección se configurará próximamente</p>
    </div>
    <div className="px-8">
      <div className="rounded-xl border border-dashed border-border bg-card/50 h-64 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Contenido próximamente</p>
      </div>
    </div>
  </div>
);

const Index = () => {
  const [view, setView] = useState<View>("contacts");

  const sidebarView = view === "add-contact" ? "contacts" : view;

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <AppSidebar currentView={sidebarView} onNavigate={(v) => setView(v as View)} />
      <div className="flex flex-1 flex-col min-w-0">
        <HeaderBar />
        {view === "dashboard" && <PlaceholderPage title="Dashboard" />}
        {view === "properties" && <PropertiesPage />}
        {view === "contacts" && <ContactsListPage onAddContact={() => setView("add-contact")} />}
        {view === "add-contact" && <AddContactPage onBack={() => setView("contacts")} />}
        {view === "agencies" && <PlaceholderPage title="Agencias" />}
        {view === "users" && <UsersPage />}
        {view === "company" && <PlaceholderPage title="Empresa" />}
        {view === "settings" && <PlaceholderPage title="Ajustes" />}
      </div>
    </div>
  );
};

export default Index;
