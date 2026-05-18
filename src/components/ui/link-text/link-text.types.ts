import type { AnchorHTMLAttributes, ReactNode } from "react";

export type LinkTextProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

