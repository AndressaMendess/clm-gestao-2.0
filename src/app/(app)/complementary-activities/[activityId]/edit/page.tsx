"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DocumentUploadField } from "@/components/ui/document-upload-field";
import { DatePicker, TextArea } from "@/components/ui/input";
import { ModalContainer } from "@/components/ui/modal-container";
import { SelectField } from "@/components/ui/select-field";
import { getStudentRowsFromRegistry } from "@/app/(app)/students/_data/students-registry";
import ComplementaryActivitiesPage from "../../page";
import {
  COMPLEMENTARY_ACTIVITY_MODULE_OPTIONS,
  COMPLEMENTARY_ACTIVITY_STATUS_OPTIONS,
  COMPLEMENTARY_ACTIVITY_TERM_OPTIONS,
  toSelectFieldOptions,
} from "../../../_config/filters";
import { getComplementaryActivitiesRepository } from "../../_data/complementary-activities-service";
import type {
  ComplementaryActivityAttachment,
  ComplementaryActivityTerm,
} from "../../_data/complementary-activities.types";

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("Falha ao ler arquivo."));
    reader.readAsDataURL(file);
  });
}

async function toVirtualAttachmentFile(attachment: ComplementaryActivityAttachment | null): Promise<File | null> {
  if (!attachment) return null;

  if (attachment.previewDataUrl) {
    const response = await fetch(attachment.previewDataUrl);
    const blob = await response.blob();
    return new File([blob], attachment.fileName, {
      type: attachment.mimeType || blob.type || "application/octet-stream",
    });
  }

  return new File([], attachment.fileName, { type: attachment.mimeType || "application/octet-stream" });
}

export default function ComplementaryActivityEditPage() {
  const router = useRouter();
  const params = useParams<{ activityId: string }>();
  const activityId = useMemo(() => decodeURIComponent(params.activityId), [params.activityId]);

  const [moduleValue, setModuleValue] = useState("");
  const [studentValue, setStudentValue] = useState("");
  const [termValue, setTermValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState<string | null>(null);
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
  const [savedAttachmentName, setSavedAttachmentName] = useState<string | null>(null);
  const [attachmentPreviewDataUrl, setAttachmentPreviewDataUrl] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const studentRows = useMemo(() => getStudentRowsFromRegistry(), []);
  const isPending = statusValue === "pending";
  const isFormValid =
    Boolean(moduleValue) &&
    Boolean(studentValue) &&
    Boolean(termValue) &&
    Boolean(statusValue) &&
    (isPending || Boolean(eventName.trim())) &&
    Boolean(attachmentFile);

  const studentOptions = useMemo(
    () =>
      studentRows
        .filter((row) => (moduleValue ? row.moduleFilter === moduleValue : false))
        .map((row) => ({ label: row.name, value: row.email })),
    [moduleValue, studentRows],
  );

  useEffect(() => {
    let isActive = true;
    const repository = getComplementaryActivitiesRepository();

    void repository
      .getById(activityId)
      .then((record) => {
        if (!isActive) return;
        if (!record) {
          setLoadError("Atividade não encontrada.");
          return;
        }

        setModuleValue(record.moduleValue);
        setStudentValue(record.studentEmail);
        setTermValue(record.termValue);
        setStatusValue(record.statusValue);
        setEventName(record.eventName ?? "");
        setEventDate(record.eventDate);
        setSavedAttachmentName(record.attachment?.fileName ?? null);
        setAttachmentPreviewDataUrl(record.attachment?.previewDataUrl ?? null);

        void toVirtualAttachmentFile(record.attachment).then((file) => {
          if (!isActive) return;
          setAttachmentFile(file);
        });
      })
      .catch(() => {
        if (!isActive) return;
        setLoadError("Não foi possível carregar a atividade.");
      })
      .finally(() => {
        if (!isActive) return;
        setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [activityId]);

  const handleClose = () => {
    router.push("/complementary-activities");
  };

  const handleSave = async () => {
    if (isSaving || isLoading) return;

    const selectedStudent = studentRows.find((row) => row.email === studentValue);
    const selectedModule = COMPLEMENTARY_ACTIVITY_MODULE_OPTIONS.find((option) => option.value === moduleValue);
    const selectedStatus = COMPLEMENTARY_ACTIVITY_STATUS_OPTIONS.find((option) => option.value === statusValue);

    if (!selectedStudent || !selectedModule || !selectedStatus || !termValue) {
      setSubmitError("Preencha os campos obrigatórios: módulo, aluno, status e trimestre.");
      return;
    }

    if (!isPending && !eventName.trim()) {
      setSubmitError("O campo Evento é obrigatório.");
      return;
    }

    if (!attachmentFile) {
      setSubmitError("O anexo é obrigatório.");
      return;
    }

    setSubmitError(null);
    setIsSaving(true);

    try {
      const nextPreviewDataUrl = await fileToDataUrl(attachmentFile);
      const repository = getComplementaryActivitiesRepository();
      const updatedRecord = await repository.update(activityId, {
        studentEmail: selectedStudent.email,
        studentName: selectedStudent.name,
        studentInitials: selectedStudent.initials,
        moduleLabel: selectedModule.label,
        moduleValue: selectedModule.value,
        eventName: selectedStatus.value === "pending" ? null : eventName.trim() || null,
        eventDate: selectedStatus.value === "pending" ? null : eventDate,
        termValue: termValue as ComplementaryActivityTerm,
        statusLabel: selectedStatus.label as "Pendente" | "Concluído" | "Reprovado",
        statusValue: selectedStatus.value as "pending" | "completed" | "failed",
        attachment: {
          fileName: attachmentFile.name,
          mimeType: attachmentFile.type || "application/octet-stream",
          previewDataUrl: nextPreviewDataUrl || attachmentPreviewDataUrl,
          sizeInBytes: attachmentFile.size,
        },
      });

      if (!updatedRecord) {
        setSubmitError("Atividade não encontrada para atualização.");
        return;
      }

      handleClose();
    } catch {
      setSubmitError("Não foi possível salvar a atividade. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDateChange = (isoValue: string | null) => {
    setEventDate(isoValue);
    if (!isoValue) {
      setTermValue("");
      return;
    }

    const month = new Date(isoValue).getMonth() + 1;
    if (month >= 1 && month <= 4) {
      setTermValue("term-1");
      return;
    }
    if (month >= 5 && month <= 8) {
      setTermValue("term-2");
      return;
    }
    setTermValue("term-3");
  };

  return (
    <>
      <ComplementaryActivitiesPage />

      <ModalContainer
        closeLabel="Fechar edição de atividade complementar"
        isOpen
        isLoading={isSaving || isLoading}
        onClose={handleClose}
        subtitle="Atualize os dados da atividade complementar."
        title="Editar atividade complementar"
        footer={
          <>
            <Button onClick={handleClose} variant="ghost">
              Cancelar
            </Button>
            <Button disabled={!isFormValid || isSaving || isLoading} onClick={() => void handleSave()}>
              Salvar atividade
            </Button>
          </>
        }
      >
        <div className="grid gap-4">
          {loadError ? (
            <p className="text-[var(--feedback-error-content)] [font-size:var(--typography-body-small-regular-font-size)]">
              {loadError}
            </p>
          ) : null}
          {submitError ? (
            <p className="text-[var(--feedback-error-content)] [font-size:var(--typography-body-small-regular-font-size)]">
              {submitError}
            </p>
          ) : null}

          <SelectField
            label="Módulo *"
            onValueChange={(value) => {
              setModuleValue(value);
              setStudentValue("");
            }}
            options={toSelectFieldOptions(COMPLEMENTARY_ACTIVITY_MODULE_OPTIONS)}
            placeholder="Selecione um módulo"
            required
            value={moduleValue}
          />

          <SelectField
            disabled={!moduleValue}
            label="Aluno"
            onValueChange={setStudentValue}
            options={studentOptions}
            placeholder={moduleValue ? "Selecione um aluno" : "Selecione um módulo primeiro"}
            value={studentValue}
          />

          <DatePicker
            disabled={isPending}
            label="Data"
            onValueChange={handleDateChange}
            value={isPending ? "" : (eventDate ?? "")}
          />

          <SelectField
            label="Trimestre"
            onValueChange={setTermValue}
            options={toSelectFieldOptions(COMPLEMENTARY_ACTIVITY_TERM_OPTIONS)}
            placeholder="Selecione um trimestre"
            value={termValue}
          />

          <SelectField
            label="Status"
            onValueChange={setStatusValue}
            options={toSelectFieldOptions(COMPLEMENTARY_ACTIVITY_STATUS_OPTIONS)}
            placeholder="Selecione um status"
            value={statusValue}
          />

          <TextArea
            disabled={isPending}
            label="Evento *"
            onChange={(event) => setEventName(event.currentTarget.value)}
            placeholder={isPending ? "Não aplicável para pendente" : "Digite o nome da atividade complementar"}
            required={!isPending}
            value={isPending ? "" : eventName}
          />

          <DocumentUploadField
            label="Anexo *"
            onFileChange={(file) => {
              setAttachmentFile(file);
              setSavedAttachmentName(file?.name ?? null);
              if (!file) {
                setAttachmentPreviewDataUrl(null);
                return;
              }
              void fileToDataUrl(file).then((dataUrl) => {
                setAttachmentPreviewDataUrl(dataUrl);
              });
            }}
            required
            value={attachmentFile}
          />
          {!attachmentFile && savedAttachmentName ? (
            <p className="text-[var(--content-secondary)] [font-size:var(--typography-body-small-regular-font-size)]">
              Anexo salvo: {savedAttachmentName}
            </p>
          ) : null}
        </div>
      </ModalContainer>
    </>
  );
}
