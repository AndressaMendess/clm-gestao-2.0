import type { ReactNode } from "react";

export type TabsItem = {
  disabled?: boolean;
  id: string;
  label: ReactNode;
};

export type TabsProps = {
  ariaLabel?: string;
  className?: string;
  defaultValue?: string;
  items: TabsItem[];
  onValueChange?: (value: string) => void;
  value?: string;
};
