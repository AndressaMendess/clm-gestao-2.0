import type { ReactNode } from "react";
import { EditFlowProvider } from "./_components/edit-flow-provider";

export default function StudentEditFlowLayout({ children }: { children: ReactNode }) {
  return <EditFlowProvider>{children}</EditFlowProvider>;
}
