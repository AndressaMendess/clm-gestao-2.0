import type { LucideIcon } from "lucide-react";

export type PopUpConfirmVariant = "primary" | "danger";

export type PopUpProps = {
  cancelLabel?: string;
  className?: string;
  closeLabel?: string;
  confirmLabel?: string;
  confirmVariant?: PopUpConfirmVariant;
  icon: LucideIcon;
  iconAriaLabel?: string;
  isLoading?: boolean;
  isOpen: boolean;
  onCancel?: () => void;
  onClose: () => void;
  onConfirm: () => void;
  subtitle: string;
  title: string;
};

