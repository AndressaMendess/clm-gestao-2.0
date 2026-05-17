import { OCR_EXTRACTED_MOCK } from "../_data/ocr-mock";
import type { OcrDocumentFile } from "../_types/ocr-flow.types";
import type { OcrProvider } from "./ocr-provider.interface";

export class MockOcrProvider implements OcrProvider {
  async extract(files: OcrDocumentFile[]) {
    if (files.length === 0) {
      throw new Error("Nenhum arquivo foi enviado para extração.");
    }

    return OCR_EXTRACTED_MOCK;
  }
}
