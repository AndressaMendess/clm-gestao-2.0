"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ModalContainer } from "@/components/ui/modal-container";
import { Stepper } from "@/components/ui/stepper";
import StudentsPage from "../../../page";

const STEPS = [
  { id: "personal-data", label: "Dados pessoais" },
  { id: "documents", label: "Documentos" },
  { id: "enrollment", label: "Matrícula" },
  { id: "attachments", label: "Anexos" },
];

type ManualFlowShellProps = {
  children: ReactNode;
  currentStep: 1 | 2 | 3 | 4;
  nextDisabled?: boolean;
  onNext: () => void;
  onPrevious?: () => void;
};

export function ManualFlowShell({
  children,
  currentStep,
  nextDisabled = false,
  onNext,
  onPrevious,
}: ManualFlowShellProps) {
  const router = useRouter();

  return (
    <>
      <StudentsPage />

      <ModalContainer
        className="max-w-[920px]"
        closeLabel="Fechar cadastro manual"
        isOpen
        onClose={() => router.push("/students")}
        subtitle="Preencha os dados do novo aluno"
        title="Adicionar Aluno"
        footer={
          <>
            <Button onClick={onPrevious ?? (() => router.push("/students"))} variant="ghost">
              {onPrevious ? "Voltar" : "Cancelar"}
            </Button>
            <Button disabled={nextDisabled} onClick={onNext} variant="primary">
              Próximo
            </Button>
          </>
        }
      >
        <div className="grid gap-6">
          <div className="w-full">
            <Stepper ariaLabel="Etapas do cadastro de aluno" currentStep={currentStep} steps={STEPS} />
          </div>
          {children}
        </div>
      </ModalContainer>
    </>
  );
}

