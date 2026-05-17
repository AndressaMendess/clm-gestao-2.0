"use client";

import { useCallback, useMemo, useReducer } from "react";
import type { OcrDocumentFile, OcrExtractedData } from "../_types/ocr-flow.types";
import { canGoNext, canGoPrevious, getCurrentStepId } from "./ocr-flow.selectors";
import { OCR_FLOW_INITIAL_STATE, ocrFlowReducer } from "./ocr-flow.reducer";

export function useOcrFlowState() {
  const [state, dispatch] = useReducer(ocrFlowReducer, OCR_FLOW_INITIAL_STATE);

  const goNext = useCallback(() => dispatch({ type: "GO_TO_NEXT_STEP" }), []);
  const goPrevious = useCallback(() => dispatch({ type: "GO_TO_PREVIOUS_STEP" }), []);
  const resetFlow = useCallback(() => dispatch({ type: "RESET_FLOW" }), []);

  const setFiles = useCallback((files: OcrDocumentFile[]) => {
    dispatch({ payload: files, type: "SET_FILES" });
  }, []);

  const setExtractedData = useCallback((data: OcrExtractedData | null) => {
    dispatch({ payload: data, type: "SET_EXTRACTED_DATA" });
  }, []);

  const setManualModule = useCallback((manualModule: string) => {
    dispatch({ payload: manualModule, type: "SET_MANUAL_MODULE" });
  }, []);

  return useMemo(
    () => ({
      canGoNext: canGoNext(state),
      canGoPrevious: canGoPrevious(state),
      currentStepId: getCurrentStepId(state),
      goNext,
      goPrevious,
      resetFlow,
      setExtractedData,
      setFiles,
      setManualModule,
      state,
    }),
    [goNext, goPrevious, resetFlow, setExtractedData, setFiles, setManualModule, state],
  );
}
