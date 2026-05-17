"use client";

import { useCallback, useState } from "react";
import { DocumentUploadField } from "@/components/ui/document-upload-field";
import { useOcrFlow } from "../ocr-flow-provider";

type UploadDocumentKey = "enrollmentForm" | "identityDocument" | "proofOfAddress" | "studentPhoto";

type UploadFilesState = Record<UploadDocumentKey, File | null>;

const UPLOAD_ITEMS: Array<{
  key: UploadDocumentKey;
  subtitle: string;
  title: string;
}> = [
  {
    key: "enrollmentForm",
    subtitle: "Formulário preenchido",
    title: "Formulário de matrícula",
  },
  {
    key: "identityDocument",
    subtitle: "RG ou CNH",
    title: "Documento de Identidade",
  },
  {
    key: "proofOfAddress",
    subtitle: "Conta de luz, água ou telefone",
    title: "Comprovante de residência",
  },
  {
    key: "studentPhoto",
    subtitle: "Foto do aluno",
    title: "Foto 3x4",
  },
];

export function StepUpload() {
  const [filesByDocument, setFilesByDocument] = useState<UploadFilesState>({
    enrollmentForm: null,
    identityDocument: null,
    proofOfAddress: null,
    studentPhoto: null,
  });

  const { ocrService, setExtractedData, setFiles, state } = useOcrFlow();

  const syncFilesWithFlow = useCallback(
    async (nextState: UploadFilesState) => {
      const selectedFiles = Object.values(nextState).filter((file): file is File => Boolean(file));
      const files = selectedFiles.map((file) => ({
        id: `${file.name}-${file.size}-${file.lastModified}`,
        name: file.name,
        size: file.size,
        type: file.type,
      }));

      setFiles(files);
      if (files.length === 0) {
        setExtractedData(null);
        return;
      }

      const extracted = await ocrService.extract(files);
      setExtractedData(extracted);
    },
    [ocrService, setExtractedData, setFiles],
  );

  const handleFileChange = useCallback(
    (key: UploadDocumentKey, file: File | null) => {
      setFilesByDocument((previous) => {
        const nextState = { ...previous, [key]: file };
        void syncFilesWithFlow(nextState);
        return nextState;
      });
    },
    [syncFilesWithFlow],
  );

  return (
    <div className="grid gap-4 py-8 md:py-6">
      <header className="grid justify-items-center gap-1 text-center">
        <h3 className="text-[var(--content-primary)] [font-size:var(--typography-body-x-large-semibold-font-size)] [font-weight:var(--typography-body-x-large-semibold-font-weight)] [line-height:var(--typography-body-x-large-semibold-line-height)]">
          Envie os Documentos
        </h3>
        <p className="text-[var(--content-secondary)]">
          Você pode enviar um ou mais documentos. O sistema irá extrair os dados automaticamente.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {UPLOAD_ITEMS.map((item) => (
          <article
            className="grid gap-3 rounded-2xl border border-[var(--border-primary)] bg-[var(--background-primary)] p-4"
            key={item.key}
          >
            <div className="grid gap-1">
              <h4 className="text-[var(--content-primary)] [font-size:var(--typography-body-large-semibold-font-size)] [font-weight:var(--typography-body-large-semibold-font-weight)] [line-height:var(--typography-body-large-semibold-line-height)]">
                {item.title}
              </h4>
              <p className="text-[var(--content-secondary)] [font-size:var(--typography-body-small-regular-font-size)] [line-height:var(--typography-body-small-regular-line-height)]">
                {item.subtitle}
              </p>
            </div>

            <DocumentUploadField
              label="Arquivo"
              name={item.key}
              onFileChange={(file) => handleFileChange(item.key, file)}
              value={filesByDocument[item.key]}
              wrapperClassName="gap-2"
            />
          </article>
        ))}
      </div>

      <div>
        <span className="text-[var(--content-secondary)]">
          {state.files.length > 0 ? `${state.files.length} arquivo(s) enviado(s)` : "Nenhum arquivo enviado"}
        </span>
      </div>
    </div>
  );
}
