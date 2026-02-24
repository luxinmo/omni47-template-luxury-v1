import { ReactNode } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LocationSidebarProps {
  children: ReactNode;
}

const LocationSidebar = ({ children }: LocationSidebarProps) => (
  <div className="w-[320px] shrink-0 border-r border-border flex flex-col bg-card overflow-hidden">
    {children}
  </div>
);

export const SidebarHeader = ({ children }: { children: ReactNode }) => (
  <div className="shrink-0 border-b border-border px-4 py-3">{children}</div>
);

export const SidebarBody = ({ children }: { children: ReactNode }) => (
  <ScrollArea className="flex-1 min-h-0">
    <div className="px-3 py-2">{children}</div>
  </ScrollArea>
);

export const SidebarFooter = ({ children }: { children: ReactNode }) => (
  <div className="shrink-0 border-t border-border px-4 py-3">{children}</div>
);

export default LocationSidebar;
