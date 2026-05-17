"use client";

import { useRef } from "react";
import type { ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { useOcrFlow } from "../ocr-flow-provider";

export function StepUpload() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ocrService, setExtractedData, setFiles, state } = useOcrFlow();

  const handleSelectFiles = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const files = Array.from(selectedFiles).map((file) => ({
      id: `${file.name}-${file.size}-${file.lastModified}`,
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    setFiles(files);
    const extracted = await ocrService.extract(files);
    setExtractedData(extracted);
  };

  return (
    <div className="grid gap-4">
      <h3 className="text-[var(--content-primary)] [font-size:var(--typography-body-large-semibold-font-size)] [font-weight:var(--typography-body-large-semibold-font-weight)]">
        Upload dos documentos
      </h3>
      <p className="text-[var(--content-secondary)]">
        Envie as imagens dos documentos para gerar o preenchimento inicial automático.
      </p>
      <input
        accept="image/*,.pdf"
        className="hidden"
        multiple
        onChange={handleSelectFiles}
        ref={inputRef}
        type="file"
      />
      <div className="flex items-center gap-3">
        <Button onClick={() => inputRef.current?.click()} variant="primary">
          Selecionar arquivos
        </Button>
        <span className="text-[var(--content-secondary)]">
          {state.files.length > 0 ? `${state.files.length} arquivo(s) enviado(s)` : "Nenhum arquivo enviado"}
        </span>
      </div>
    </div>
  );
}
