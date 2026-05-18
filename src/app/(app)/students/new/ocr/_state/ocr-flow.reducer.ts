import { OCR_FLOW_STEPS, type OcrFlowState } from "../_types/ocr-flow.types";
import type { OcrFlowAction } from "./ocr-flow.actions";

export const OCR_FLOW_INITIAL_STATE: OcrFlowState = {
  currentStep: 1,
  extractedData: null,
  files: [],
  manualClassroom: "",
  manualModule: "",
};

export function ocrFlowReducer(state: OcrFlowState, action: OcrFlowAction): OcrFlowState {
  switch (action.type) {
    case "GO_TO_NEXT_STEP":
      return { ...state, currentStep: Math.min(state.currentStep + 1, OCR_FLOW_STEPS.length) };
    case "GO_TO_PREVIOUS_STEP":
      return { ...state, currentStep: Math.max(state.currentStep - 1, 1) };
    case "SET_FILES":
      return { ...state, files: action.payload };
    case "SET_EXTRACTED_DATA":
      return { ...state, extractedData: action.payload };
    case "SET_MANUAL_CLASSROOM":
      return { ...state, manualClassroom: action.payload };
    case "SET_MANUAL_MODULE":
      return { ...state, manualClassroom: "", manualModule: action.payload };
    case "RESET_FLOW":
      return OCR_FLOW_INITIAL_STATE;
    default:
      return state;
  }
}
