"use client";

import { useEffect, useMemo, useState } from "react";
import { Eye } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DocumentUploadField } from "@/components/ui/document-upload-field";
import { DatePicker, TextArea } from "@/components/ui/input";
import { ModalContainer } from "@/components/ui/modal-container";
import { SelectField } from "@/components/ui/select-field";
import StudentAttendanceHistoryPage from "../../page";
import { STUDENT_ROWS } from "../../../../_data/students.mock";
import {
  getAttendanceJustification,
  upsertAttendanceJustification,
} from "../../_data/attendance-justifications-registry";

export default function StudentAttendanceJustificationPage() {
  const router = useRouter();
  const params = useParams<{ studentId: string; recordId: string }>();

  const [dateIso, setDateIso] = useState<string | null>(null);
  const [status, setStatus] = useState("excused");
  const [note, setNote] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofFileName, setProofFileName] = useState<string | null>(null);
  const [proofFileDataUrl, setProofFileDataUrl] = useState<string | null>(null);

  const decodedStudentId = useMemo(() => decodeURIComponent(params.studentId), [params.studentId]);
  const decodedRecordId = useMemo(() => decodeURIComponent(params.recordId), [params.recordId]);
  const studentName = useMemo(() => {
    return STUDENT_ROWS.find((row) => row.email === decodedStudentId)?.name ?? "aluno";
  }, [decodedStudentId]);
  const existingJustification = useMemo(
    () => getAttendanceJustification(decodedStudentId, decodedRecordId),
    [decodedRecordId, decodedStudentId],
  );

  useEffect(() => {
    if (!existingJustification) return;
    setDateIso(existingJustification.dateIso);
    setStatus(existingJustification.status);
    setNote(existingJustification.note);
    setProofFileName(existingJustification.proofFileName);
    setProofFileDataUrl(existingJustification.proofFileDataUrl);
  }, [existingJustification]);

  const handleClose = () => {
    router.push(`/students/${encodeURIComponent(decodedStudentId)}/attendance-history`);
  };

  const handleSave = () => {
    upsertAttendanceJustification(decodedRecordId, {
      studentId: decodedStudentId,
      dateIso,
      status: "excused",
      note: note.trim(),
      proofFileName: proofFile?.name ?? proofFileName ?? null,
      proofFileDataUrl,
    });
    handleClose();
  };

  const handlePreviewProof = () => {
    if (!proofFileDataUrl) return;
    window.open(proofFileDataUrl, "_blank", "noopener,noreferrer");
  };

  const handleFileChange = async (file: File | null) => {
    setProofFile(file);
    if (!file) {
      setProofFileName(null);
      setProofFileDataUrl(null);
      return;
    }

    setProofFileName(file.name);
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ""));
      reader.onerror = () => reject(new Error("Não foi possível ler o arquivo."));
      reader.readAsDataURL(file);
    });
    setProofFileDataUrl(dataUrl);
  };

  return (
    <>
      <StudentAttendanceHistoryPage />

      <ModalContainer
        closeLabel="Fechar justificativa"
        isOpen
        onClose={handleClose}
        subtitle={`Adicione justificativa para ${studentName}`}
        title={existingJustification ? "Editar justificativa" : "Adicionar justificativa"}
        footer={
          <>
            <Button onClick={handleClose} variant="ghost">
              Cancelar
            </Button>
            <Button onClick={handleSave}>Salvar justificativa</Button>
          </>
        }
      >
        <div className="grid gap-4">
          <DatePicker
            label="Data"
            onValueChange={(isoValue) => setDateIso(isoValue)}
            value={dateIso ?? ""}
          />

          <SelectField
            label="Status"
            onValueChange={setStatus}
            options={[
              { label: "Presente", value: "present" },
              { label: "Ausente", value: "absent" },
              { label: "Justificado", value: "excused" },
            ]}
            value={status}
          />

          <TextArea
            label="Observação"
            onChange={(event) => setNote(event.currentTarget.value)}
            placeholder="Descreva o motivo e os detalhes da justificativa"
            value={note}
          />

          <DocumentUploadField
            label="Anexo de comprovante"
            onFileChange={(file) => {
              void handleFileChange(file);
            }}
            value={proofFile}
          />
          {proofFileName ? (
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-[var(--content-secondary)] [font-size:var(--typography-body-small-regular-font-size)] [line-height:var(--typography-body-small-regular-line-height)] [letter-spacing:var(--typography-body-small-regular-letter-spacing)]">
                Comprovante salvo: {proofFileName}
              </p>
              {proofFileDataUrl ? (
                <Button className="text-[var(--content-tertiary)] hover:text-[var(--content-secondary)]" icon={Eye} onClick={handlePreviewProof} variant="ghost">
                  Visualizar comprovante
                </Button>
              ) : null}
            </div>
          ) : null}
        </div>
      </ModalContainer>
    </>
  );
}
