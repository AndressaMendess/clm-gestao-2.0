"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DocumentUploadField } from "@/components/ui/document-upload-field";
import { DatePicker, TextArea } from "@/components/ui/input";
import { ModalContainer } from "@/components/ui/modal-container";
import { SelectField } from "@/components/ui/select-field";
import { getStudentRowsFromRegistry } from "../../students/_data/students-registry";
import ComplementaryActivitiesPage from "../page";
import {
  COMPLEMENTARY_ACTIVITY_MODULE_OPTIONS,
  COMPLEMENTARY_ACTIVITY_STATUS_OPTIONS,
  COMPLEMENTARY_ACTIVITY_TERM_OPTIONS,
  toSelectFieldOptions,
} from "../../_config/filters";
import { getComplementaryActivitiesRepository } from "../_data/complementary-activities-service";
import type { ComplementaryActivityTerm } from "../_data/complementary-activities.types";

export default function ComplementaryActivityCreatePage() {
  const router = useRouter();
  const [moduleValue, setModuleValue] = useState("");
  const [studentValue, setStudentValue] = useState("");
  const [termValue, setTermValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState<string | null>(null);
  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const isPending = statusValue === "pending";
  const isFormValid =
    Boolean(moduleValue) &&
    Boolean(studentValue) &&
    Boolean(termValue) &&
    Boolean(statusValue) &&
    (isPending || Boolean(eventName.trim())) &&
    Boolean(attachmentFile);
  const studentRows = useMemo(() => getStudentRowsFromRegistry(), []);
  const studentOptions = useMemo(
    () =>
      studentRows
        .filter((row) => (moduleValue ? row.moduleFilter === moduleValue : false))
        .map((row) => ({ label: row.name, value: row.email })),
    [moduleValue, studentRows],
  );

  const handleClose = () => {
    router.push("/complementary-activities");
  };

  const handleSave = async () => {
    if (isSaving) return;
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
      const repository = getComplementaryActivitiesRepository();
      await repository.create({
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
        attachment: attachmentFile
          ? {
              fileName: attachmentFile.name,
              mimeType: attachmentFile.type,
              sizeInBytes: attachmentFile.size,
            }
          : null,
      });
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
        closeLabel="Fechar cadastro de atividade complementar"
        isOpen
        isLoading={isSaving}
        onClose={handleClose}
        subtitle="Preencha os dados para cadastrar uma nova atividade complementar."
        title="Adicionar atividade complementar"
        footer={
          <>
            <Button onClick={handleClose} variant="ghost">
              Cancelar
            </Button>
            <Button disabled={!isFormValid || isSaving} onClick={() => void handleSave()}>
              Salvar atividade
            </Button>
          </>
        }
      >
        <div className="grid gap-4">
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
            onFileChange={setAttachmentFile}
            required
            value={attachmentFile}
          />
        </div>
      </ModalContainer>
    </>
  );
}

