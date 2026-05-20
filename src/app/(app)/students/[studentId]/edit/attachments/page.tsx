"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DocumentUploadField } from "@/components/ui/document-upload-field";
import {
  STUDENT_CLASSROOM_OPTIONS,
  STUDENT_MODULE_OPTIONS,
  STUDENT_STATUS_OPTIONS,
} from "@/app/(app)/_config/filters";
import { getStudentRecordByEmail } from "@/app/(app)/students/_data/students-registry";
import { getStudentsRepository } from "@/app/(app)/students/_data/students-service";
import type {
  StudentClassroomFilter,
  StudentModuleFilter,
  StudentStatusFilter,
} from "@/app/(app)/students/_types/students.types";
import { useEditFlowForm } from "../_components/edit-flow-provider";
import { EditFlowShell } from "../_components/edit-flow-shell";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "--";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

export default function StudentEditAttachmentsPage() {
  const router = useRouter();
  const params = useParams<{ studentId: string }>();
  const decodedStudentId = useMemo(() => decodeURIComponent(params.studentId), [params.studentId]);
  const { formData } = useEditFlowForm();
  const studentsRepository = useMemo(() => getStudentsRepository(), []);
  const [isSaving, setIsSaving] = useState(false);
  const [photo34, setPhoto34] = useState<File | null>(null);
  const [rgFile, setRgFile] = useState<File | null>(null);
  const [cnhFile, setCnhFile] = useState<File | null>(null);
  const [proofOfAddressFile, setProofOfAddressFile] = useState<File | null>(null);

  const existingRecord = useMemo(() => getStudentRecordByEmail(decodedStudentId), [decodedStudentId]);
  const existingAttachmentNames = existingRecord?.details.attachments ?? [];

  const handleSave = async () => {
    if (isSaving) return;
    const normalizedEmail = formData.email.trim().toLowerCase();
    if (!normalizedEmail) return;

    const moduleOption = STUDENT_MODULE_OPTIONS.find((option) => option.value === formData.enrollmentModule);
    const classroomOption = STUDENT_CLASSROOM_OPTIONS.find((option) => option.value === formData.enrollmentClassroom);
    const statusOption = STUDENT_STATUS_OPTIONS.find((option) => option.value === formData.enrollmentStatus);

    const newAttachmentNames = [
      photo34 ? `Foto 3x4 (${photo34.name})` : null,
      rgFile ? `RG (${rgFile.name})` : null,
      cnhFile ? `CNH (${cnhFile.name})` : null,
      proofOfAddressFile ? `Comprovante de residência (${proofOfAddressFile.name})` : null,
    ].filter((item): item is string => Boolean(item));

    try {
      setIsSaving(true);
      await studentsRepository.updateByEmail({
        originalEmail: decodedStudentId,
        record: {
          details: {
            address: {
              city: formData.city || "-",
              complement: existingRecord?.details.address.complement ?? "-",
              neighborhood: formData.district || "-",
              number: formData.number || "-",
              state: formData.stateCode.toUpperCase() || "-",
              street: formData.street || "-",
              zipCode: formData.zipCode || "-",
            },
            attendance: existingRecord?.details.attendance ?? {
              history: [],
              justifiedAbsences: 0,
              presentRate: "-",
              totalAbsences: 0,
              totalClasses: 0,
            },
            attachments: [...existingAttachmentNames, ...newAttachmentNames],
            personalData: {
              birthDate: formData.birthDate || "-",
              cpf: formData.cpf || "-",
              fatherName: formData.fatherName || "-",
              fullName: formData.fullName || "-",
              maritalStatus: formData.maritalStatus || "-",
              motherName: formData.motherName || "-",
              nationality: formData.nationality || "-",
              rg: formData.rg || "-",
              sex: formData.sex || "-",
            },
            schoolEmail: formData.schoolEmail || "-",
          },
          row: {
            classroom: classroomOption?.label ?? "-",
            classroomFilter: (formData.enrollmentClassroom as StudentClassroomFilter) || "teoria-musical",
            classroomVariant: "blue",
            email: normalizedEmail,
            initials: getInitials(formData.fullName),
            module: moduleOption?.label ?? "-",
            moduleFilter: (formData.enrollmentModule as StudentModuleFilter) || "module-i",
            moduleVariant: formData.enrollmentModule === "module-i" ? "violet" : "orange",
            name: formData.fullName || normalizedEmail,
            phone: formData.phone || "-",
            status: statusOption?.label ?? "-",
            statusFilter: (formData.enrollmentStatus as StudentStatusFilter) || "active",
          },
        },
      });
      router.push(`/students/${encodeURIComponent(normalizedEmail)}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <EditFlowShell
      currentStep={4}
      onNext={handleSave}
      onPrevious={() => router.push(`/students/${encodeURIComponent(decodedStudentId)}/edit/enrollment`)}
    >
      <div className="grid gap-6">
        {existingAttachmentNames.length ? (
          <section className="grid gap-2 rounded-[12px] border border-[var(--border-primary)] p-4">
            <h4 className="text-[var(--content-primary)] [font-size:var(--typography-body-medium-semibold-font-size)] [line-height:var(--typography-body-medium-semibold-line-height)] [font-weight:var(--typography-body-medium-semibold-font-weight)]">
              Anexos atuais
            </h4>
            <ul className="grid gap-1 text-[var(--content-secondary)] [font-size:var(--typography-body-small-regular-font-size)]">
              {existingAttachmentNames.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="grid gap-4">
          <h3 className="text-[var(--content-primary)] [font-size:var(--typography-body-large-semibold-font-size)] [line-height:var(--typography-body-large-semibold-line-height)] [font-weight:var(--typography-body-large-semibold-font-weight)] [letter-spacing:var(--typography-body-large-semibold-letter-spacing)]">
            Adicionar novos anexos
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <DocumentUploadField label="Foto 3x4" onFileChange={setPhoto34} value={photo34} />
            <DocumentUploadField label="RG" onFileChange={setRgFile} value={rgFile} />
            <DocumentUploadField label="CNH" onFileChange={setCnhFile} value={cnhFile} />
            <DocumentUploadField
              label="Comprovante de residência"
              onFileChange={setProofOfAddressFile}
              value={proofOfAddressFile}
            />
          </div>
        </section>
        {isSaving ? <p className="text-[var(--content-secondary)]">Salvando alterações...</p> : null}
      </div>
    </EditFlowShell>
  );
}
