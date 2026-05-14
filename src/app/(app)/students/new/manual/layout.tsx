import type { ReactNode } from "react";
import { ManualFlowProvider } from "./_components/manual-flow-provider";

export default function ManualFlowLayout({ children }: { children: ReactNode }) {
  return <ManualFlowProvider>{children}</ManualFlowProvider>;
}

