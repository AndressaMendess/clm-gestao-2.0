import type { OcrDocumentFile, OcrExtractedData } from "../_types/ocr-flow.types";

export interface OcrProvider {
  extract(files: OcrDocumentFile[]): Promise<OcrExtractedData>;
}
