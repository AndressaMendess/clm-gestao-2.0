import type { LucideIcon } from "lucide-react";

export type SidebarItemId =
  | "overview"
  | "students"
  | "teachers"
  | "attendance"
  | "modules"
  | "settings"
  | string;

export type SidebarNavItem = {
  id: SidebarItemId;
  icon: LucideIcon;
  label: string;
};

export type SidebarModuleItem = {
  id: string;
  label: string;
};

export type SidebarUser = {
  avatarSrc?: string;
  email: string;
  name: string;
};

export type SidebarProps = {
  instanceId?: string;
  collapsedWidthPx?: number;
  expandedWidthPx?: number;
  activeItem: SidebarItemId;
  activeModuleId?: string | null;
  collapsible?: boolean;
  isCollapsed?: boolean;
  isOpen?: boolean;
  moduleItems?: SidebarModuleItem[];
  primaryItems?: SidebarNavItem[];
  secondaryItems?: SidebarNavItem[];
  showOverlay?: boolean;
  showFloatingTrigger?: boolean;
  user?: SidebarUser;
  onClose?: () => void;
  onLogout?: () => void;
  onNavigate: (itemId: SidebarItemId) => void;
  onNavigateModule?: (moduleId: string) => void;
  onToggleCollapse?: () => void;
};
