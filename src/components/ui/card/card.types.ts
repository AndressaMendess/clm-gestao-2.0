import type { ReactNode } from "react";

export type CardField = {
  id: string;
  label: ReactNode;
  value?: ReactNode;
};

export type CardProps = {
  className?: string;
  columns?: 1 | 2;
  fields: CardField[];
  title?: ReactNode;
};
