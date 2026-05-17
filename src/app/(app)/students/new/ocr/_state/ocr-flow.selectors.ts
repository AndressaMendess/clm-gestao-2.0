import { OCR_FLOW_STEPS } from "../_types/ocr-flow.types";
import type { OcrFlowState } from "../_types/ocr-flow.types";

export function getCurrentStepId(state: OcrFlowState) {
  return OCR_FLOW_STEPS[state.currentStep - 1]?.id ?? OCR_FLOW_STEPS[0].id;
}

export function canGoNext(state: OcrFlowState) {
  return state.currentStep < OCR_FLOW_STEPS.length;
}

export function canGoPrevious(state: OcrFlowState) {
  return state.currentStep > 1;
}
