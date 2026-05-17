export const OCR_FLOW_STEPS = [
  { id: "instructions", label: "Instruções" },
  { id: "upload", label: "Upload" },
  { id: "review-ocr", label: "Revisão OCR" },
  { id: "manual-entry", label: "Módulo manual" },
  { id: "review-final", label: "Revisão final" },
] as const;

export type OcrFlowStepId = (typeof OCR_FLOW_STEPS)[number]["id"];

export type OcrDocumentFile = {
  documentSubtitle: string;
  documentTitle: string;
  id: string;
  name: string;
  previewUrl?: string;
  size: number;
  type: string;
};

export type OcrExtractedData = {
  birthDate: string;
  cpf: string;
  fullName: string;
  rg: string;
};

export type OcrFlowState = {
  currentStep: number;
  extractedData: OcrExtractedData | null;
  files: OcrDocumentFile[];
  manualModule: string;
};
