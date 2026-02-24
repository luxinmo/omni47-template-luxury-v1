import { Search, Menu } from "lucide-react";

interface HeaderBarProps {
  onMenuToggle: () => void;
}

const HeaderBar = ({ onMenuToggle }: HeaderBarProps) => {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4 sm:px-6 shrink-0">
      <div className="flex items-center gap-3">
        {/* Hamburger - mobile only */}
        <button
          onClick={onMenuToggle}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent transition-colors lg:hidden"
        >
          <Menu className="h-5 w-5" strokeWidth={1.5} />
        </button>

        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 w-64 md:w-80">
          <Search className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
          <span className="text-[13px] text-muted-foreground">Buscar...</span>
        </div>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-[11px] font-semibold text-primary-foreground">JD</span>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
