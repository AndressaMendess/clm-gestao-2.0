import type { OcrDocumentFile, OcrExtractedData } from "../_types/ocr-flow.types";
import type { OcrProvider } from "./ocr-provider.interface";

export class OcrService {
  constructor(private readonly provider: OcrProvider) {}

  extract(files: OcrDocumentFile[]): Promise<OcrExtractedData> {
    return this.provider.extract(files);
  }
}
