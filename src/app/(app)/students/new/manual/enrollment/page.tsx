"use client";

import { useRouter } from "next/navigation";
import { ManualFlowShell } from "../_components/manual-flow-shell";

export default function StudentCreateManualEnrollmentPage() {
  const router = useRouter();

  return (
    <ManualFlowShell
      currentStep={3}
      onNext={() => router.push("/students/new/manual/attachments")}
      onPrevious={() => router.push("/students/new/manual/documents")}
    >
      <div className="rounded-[16px] border border-[var(--border-primary)] bg-[var(--background-secondary)] p-4 text-[var(--content-secondary)]">
        Etapa de Matrícula pronta para implementação dos campos específicos.
      </div>
    </ManualFlowShell>
  );
}

