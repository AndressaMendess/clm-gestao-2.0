import type { ReactNode } from "react";
import type { BadgeVariant } from "../badge";
import type { TabsItem } from "../tabs";

export type DrawerProps = {
  avatarAlt?: string;
  avatarInitials?: string;
  avatarSrc?: string;
  children: ReactNode;
  className?: string;
  closeLabel?: string;
  editButtonLabel?: string;
  isLoading?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onDeleteStudent?: () => void;
  onEditStudent?: () => void;
  onOpenChange?: (isOpen: boolean) => void;
  onTabChange?: (value: string) => void;
  statusLabel: string;
  statusVariant?: BadgeVariant;
  studentName: string;
  tabValue?: string;
  tabs: TabsItem[];
};
