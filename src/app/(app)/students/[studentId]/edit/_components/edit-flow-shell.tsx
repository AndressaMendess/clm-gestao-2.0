"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ModalContainer } from "@/components/ui/modal-container";
import { Stepper } from "@/components/ui/stepper";
import {
  STUDENT_CLASSROOM_OPTIONS,
  STUDENT_MODULE_OPTIONS,
  STUDENT_STATUS_OPTIONS,
} from "@/app/(app)/_config/filters";
import { getStudentRecordByEmail } from "@/app/(app)/students/_data/students-registry";
import StudentsPage from "../../../page";
import type { ManualFlowFormData } from "@/app/(app)/students/new/manual/_components/manual-flow-provider";
import { useEditFlowForm } from "./edit-flow-provider";

const STEPS = [
  { id: "personal-data", label: "Dados pessoais" },
  { id: "documents", label: "Documentos" },
  { id: "enrollment", label: "Matrícula" },
  { id: "attachments", label: "Anexos" },
];

type EditFlowShellProps = {
  children: ReactNode;
  currentStep: 1 | 2 | 3 | 4;
  nextDisabled?: boolean;
  onNext: () => void;
  onPrevious?: () => void;
};

function normalizeField(value?: string): string {
  if (!value || value === "-") return "";
  return value;
}

function toFormDataFromRecord(email: string): ManualFlowFormData | null {
  const record = getStudentRecordByEmail(email);
  if (!record) return null;

  const moduleValue =
    STUDENT_MODULE_OPTIONS.find((option) => option.label === record.row.module)?.value ??
    record.row.moduleFilter ??
    "";
  const classroomValue =
    STUDENT_CLASSROOM_OPTIONS.find((option) => option.label === record.row.classroom)?.value ??
    record.row.classroomFilter ??
    "";
  const statusValue =
    STUDENT_STATUS_OPTIONS.find((option) => option.label === record.row.status)?.value ??
    record.row.statusFilter ??
    "";

  return {
    birthDate: normalizeField(record.details.personalData.birthDate),
    city: normalizeField(record.details.address.city),
    cpf: normalizeField(record.details.personalData.cpf),
    district: normalizeField(record.details.address.neighborhood),
    email: normalizeField(record.row.email),
    enrollmentClassroom: classroomValue,
    enrollmentModule: moduleValue,
    enrollmentStatus: statusValue,
    fatherName: normalizeField(record.details.personalData.fatherName),
    fullName: normalizeField(record.details.personalData.fullName || record.row.name),
    maritalStatus: normalizeField(record.details.personalData.maritalStatus),
    motherName: normalizeField(record.details.personalData.motherName),
    nationality: normalizeField(record.details.personalData.nationality),
    number: normalizeField(record.details.address.number),
    phone: normalizeField(record.row.phone),
    rg: normalizeField(record.details.personalData.rg),
    schoolEmail: normalizeField(record.details.schoolEmail),
    sex: normalizeField(record.details.personalData.sex),
    stateCode: normalizeField(record.details.address.state),
    street: normalizeField(record.details.address.street),
    zipCode: normalizeField(record.details.address.zipCode),
  };
}

export function EditFlowShell({ children, currentStep, nextDisabled = false, onNext, onPrevious }: EditFlowShellProps) {
  const router = useRouter();
  const params = useParams<{ studentId: string }>();
  const decodedStudentId = useMemo(() => decodeURIComponent(params.studentId), [params.studentId]);
  const { hydrateFormData, isHydrated } = useEditFlowForm();
  const [isLoadingRecord, setIsLoadingRecord] = useState(true);

  useEffect(() => {
    if (isHydrated) {
      setIsLoadingRecord(false);
      return;
    }
    const prefilledData = toFormDataFromRecord(decodedStudentId);
    if (!prefilledData) {
      router.push("/students");
      return;
    }
    hydrateFormData(prefilledData);
    setIsLoadingRecord(false);
  }, [decodedStudentId, hydrateFormData, isHydrated, router]);

  return (
    <>
      <StudentsPage />

      <ModalContainer
        className="max-w-[920px]"
        closeLabel="Fechar edição de aluno"
        isOpen
        onClose={() => router.push(`/students/${encodeURIComponent(decodedStudentId)}`)}
        subtitle="Atualize os dados do aluno"
        title="Editar Aluno"
        footer={
          <>
            <Button
              onClick={onPrevious ?? (() => router.push(`/students/${encodeURIComponent(decodedStudentId)}`))}
              variant="ghost"
            >
              {onPrevious ? "Voltar" : "Cancelar"}
            </Button>
            <Button disabled={isLoadingRecord || nextDisabled} onClick={onNext} variant="primary">
              Próximo
            </Button>
          </>
        }
      >
        {isLoadingRecord ? (
          <div className="py-8 text-center text-[var(--content-secondary)]">Carregando dados do aluno...</div>
        ) : (
          <div className="grid gap-6">
            <div className="w-full">
              <Stepper ariaLabel="Etapas da edição de aluno" currentStep={currentStep} steps={STEPS} />
            </div>
            {children}
          </div>
        )}
      </ModalContainer>
    </>
  );
}
