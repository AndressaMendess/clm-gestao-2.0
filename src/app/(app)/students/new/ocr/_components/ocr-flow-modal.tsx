"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModalContainer } from "@/components/ui/modal-container";
import { Stepper } from "@/components/ui/stepper";
import { OCR_FLOW_STEPS } from "../_types/ocr-flow.types";
import { useOcrFlow } from "./ocr-flow-provider";
import { StepInstructions } from "./steps/step-instructions";
import { StepManualEntry } from "./steps/step-manual-entry";
import { StepReviewFinal } from "./steps/step-review-final";
import { StepReviewOcr } from "./steps/step-review-ocr";
import { StepUpload } from "./steps/step-upload";

function getStepContent(stepId: string) {
  switch (stepId) {
    case "instructions":
      return <StepInstructions />;
    case "upload":
      return <StepUpload />;
    case "review-ocr":
      return <StepReviewOcr />;
    case "manual-entry":
      return <StepManualEntry />;
    case "review-final":
      return <StepReviewFinal />;
    default:
      return null;
  }
}

export function OcrFlowModal() {
  const router = useRouter();
  const { canGoNext, canGoPrevious, currentStepId, goNext, goPrevious, resetFlow, state } = useOcrFlow();

  const isLastStep = state.currentStep === OCR_FLOW_STEPS.length;
  const nextLabel = isLastStep ? "Concluir" : "Próximo";

  const nextDisabled = useMemo(() => {
    if (currentStepId === "upload") return state.files.length === 0;
    if (currentStepId === "manual-entry") return state.manualModule.length === 0;
    if (currentStepId === "review-ocr") return !state.extractedData;
    return false;
  }, [currentStepId, state.extractedData, state.files.length, state.manualModule.length]);

  const handleClose = () => {
    resetFlow();
    router.push("/students/new");
  };

  const handleNext = () => {
    if (isLastStep) {
      handleClose();
      return;
    }
    if (canGoNext) goNext();
  };

  return (
    <ModalContainer
      className="max-w-[1120px]"
      closeLabel="Fechar cadastro por OCR"
      isOpen
      onClose={handleClose}
      subtitle="Envie documentos, revise os dados e conclua o cadastro."
      title="Adicionar Aluno por OCR"
      footer={
        <>
          <Button onClick={canGoPrevious ? goPrevious : handleClose} variant="ghost">
            {canGoPrevious ? "Voltar" : "Cancelar"}
          </Button>
          <Button disabled={nextDisabled} onClick={handleNext} variant="primary">
            {nextLabel}
          </Button>
        </>
      }
    >
      <div className="grid gap-6">
        <Stepper ariaLabel="Etapas do cadastro por OCR" currentStep={state.currentStep} steps={[...OCR_FLOW_STEPS]} />
        {getStepContent(currentStepId)}
      </div>
    </ModalContainer>
  );
}
