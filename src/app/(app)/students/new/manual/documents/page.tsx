"use client";

import { useRouter } from "next/navigation";
import { ManualFlowShell } from "../_components/manual-flow-shell";

export default function StudentCreateManualDocumentsPage() {
  const router = useRouter();

  return (
    <ManualFlowShell
      currentStep={2}
      onNext={() => router.push("/students/new/manual/enrollment")}
      onPrevious={() => router.push("/students/new/manual/personal-data")}
    >
      <div className="rounded-[16px] border border-[var(--border-primary)] bg-[var(--background-secondary)] p-4 text-[var(--content-secondary)]">
        Etapa de Documentos pronta para implementação dos campos específicos.
      </div>
    </ManualFlowShell>
  );
}

