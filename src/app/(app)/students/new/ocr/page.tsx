"use client";

import StudentsPage from "../../page";
import { OcrFlowModal } from "./_components/ocr-flow-modal";
import { OcrFlowProvider } from "./_components/ocr-flow-provider";

export default function StudentCreateOcrPage() {
  return (
    <>
      <StudentsPage />
      <OcrFlowProvider>
        <OcrFlowModal />
      </OcrFlowProvider>
    </>
  );
}
