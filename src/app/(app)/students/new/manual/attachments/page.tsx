"use client";

import { useRouter } from "next/navigation";
import { ManualFlowShell } from "../_components/manual-flow-shell";

export default function StudentCreateManualAttachmentsPage() {
  const router = useRouter();

  return (
    <ManualFlowShell
      currentStep={4}
      onNext={() => router.push("/students")}
      onPrevious={() => router.push("/students/new/manual/enrollment")}
    >
      <div className="rounded-[16px] border border-[var(--border-primary)] bg-[var(--background-secondary)] p-4 text-[var(--content-secondary)]">
        Etapa de Anexos pronta para implementação do upload e revisão final.
      </div>
    </ManualFlowShell>
  );
}

