"use client";

import { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { OcrService } from "../_services/ocr-service";
import { MockOcrProvider } from "../_services/ocr-provider.mock";
import { useOcrFlowState } from "../_state/use-ocr-flow-state";

type OcrFlowContextValue = ReturnType<typeof useOcrFlowState> & {
  ocrService: OcrService;
};

const OcrFlowContext = createContext<OcrFlowContextValue | null>(null);

export function OcrFlowProvider({ children }: { children: ReactNode }) {
  const flow = useOcrFlowState();
  const ocrService = useMemo(() => new OcrService(new MockOcrProvider()), []);
  const value = useMemo(() => ({ ...flow, ocrService }), [flow, ocrService]);

  return <OcrFlowContext.Provider value={value}>{children}</OcrFlowContext.Provider>;
}

export function useOcrFlow() {
  const context = useContext(OcrFlowContext);
  if (!context) {
    throw new Error("useOcrFlow deve ser usado dentro de OcrFlowProvider.");
  }
  return context;
}
