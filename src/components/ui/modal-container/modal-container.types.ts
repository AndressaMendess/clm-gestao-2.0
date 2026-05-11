import type { ReactNode, RefObject } from "react";

export type ModalContainerProps = {
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  closeButtonClassName?: string;
  closeLabel?: string;
  closeOnOverlayClick?: boolean;
  copyClassName?: string;
  footer?: ReactNode;
  footerClassName?: string;
  headerClassName?: string;
  initialFocusRef?: RefObject<HTMLElement | null>;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onOpenChange?: (isOpen: boolean) => void;
  overlayClassName?: string;
  subtitle?: string;
  title: string;
  titleId?: string;
};
