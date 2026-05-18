import type { OcrDocumentFile, OcrExtractedData, OcrReviewFormData } from "../_types/ocr-flow.types";

export type OcrFlowAction =
  | { type: "GO_TO_NEXT_STEP" }
  | { type: "GO_TO_PREVIOUS_STEP" }
  | { payload: OcrDocumentFile[]; type: "SET_FILES" }
  | { payload: OcrExtractedData | null; type: "SET_EXTRACTED_DATA" }
  | { payload: Partial<OcrReviewFormData>; type: "UPDATE_REVIEW_FORM_DATA" }
  | { payload: string; type: "SET_MANUAL_CLASSROOM" }
  | { payload: string; type: "SET_MANUAL_MODULE" }
  | { type: "RESET_FLOW" };
