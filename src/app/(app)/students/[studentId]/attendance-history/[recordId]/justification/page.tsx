"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DocumentUploadField } from "@/components/ui/document-upload-field";
import { DatePicker, TextArea } from "@/components/ui/input";
import { ModalContainer } from "@/components/ui/modal-container";
import { SelectField } from "@/components/ui/select-field";
import StudentAttendanceHistoryPage from "../../page";
import { STUDENT_ROWS } from "../../../../_data/students.mock";
import {
  type AttendanceJustificationRecord,
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
  const [existingJustification, setExistingJustification] = useState<AttendanceJustificationRecord | null>(null);

  const decodedStudentId = useMemo(() => decodeURIComponent(params.studentId), [params.studentId]);
  const decodedRecordId = useMemo(() => decodeURIComponent(params.recordId), [params.recordId]);
  const studentName = useMemo(() => {
    return STUDENT_ROWS.find((row) => row.email === decodedStudentId)?.name ?? "aluno";
  }, [decodedStudentId]);

  useEffect(() => {
    setExistingJustification(getAttendanceJustification(decodedStudentId, decodedRecordId));
  }, [decodedRecordId, decodedStudentId]);

  useEffect(() => {
    if (!existingJustification) return;
    setDateIso(existingJustification.dateIso);
    setStatus(existingJustification.status);
    setNote(existingJustification.note);
    setProofFileName(existingJustification.proofFileName);
    setProofFileDataUrl(existingJustification.proofFileDataUrl);
  }, [existingJustification]);

  useEffect(() => {
    const restoreProofFile = async () => {
      if (proofFile) return;
      if (!proofFileName) return;

      if (proofFileDataUrl) {
        try {
          const response = await fetch(proofFileDataUrl);
          const blob = await response.blob();
          const restoredFile = new File([blob], proofFileName, {
            type: blob.type || "application/octet-stream",
          });
          setProofFile(restoredFile);
          return;
        } catch {
          // fallback abaixo
        }
      }

      const fallbackFile = new File([""], proofFileName, { type: "application/octet-stream" });
      setProofFile(fallbackFile);
    };

    void restoreProofFile();
  }, [proofFile, proofFileDataUrl, proofFileName]);

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
        </div>
      </ModalContainer>
    </>
  );
}
