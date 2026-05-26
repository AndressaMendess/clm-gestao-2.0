"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DocumentUploadField } from "@/components/ui/document-upload-field";
import {
  STUDENT_CLASSROOM_OPTIONS,
  STUDENT_MODULE_OPTIONS,
  STUDENT_STATUS_OPTIONS,
} from "@/app/(app)/_config/filters";
import { upsertStudentRecord } from "@/app/(app)/students/_data/students-registry";
import type {
  StudentClassroomFilter,
  StudentModuleFilter,
  StudentStatusFilter,
} from "@/app/(app)/students/_types/students.types";
import { useManualFlowForm } from "../_components/manual-flow-provider";
import { ManualFlowShell } from "../_components/manual-flow-shell";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "--";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

function getClassroomFiltersByModule(
  moduleFilter: StudentModuleFilter,
  classroomFilter: StudentClassroomFilter,
): StudentClassroomFilter[] {
  if (moduleFilter === "module-ii" || moduleFilter === "module-iii") {
    return Array.from(new Set(["teoria-musical", "solfejo", classroomFilter]));
  }
  return [classroomFilter];
}

export default function StudentCreateManualAttachmentsPage() {
  const router = useRouter();
  const { formData, resetFormData } = useManualFlowForm();
  const [photo34, setPhoto34] = useState<File | null>(null);
  const [rgFile, setRgFile] = useState<File | null>(null);
  const [cnhFile, setCnhFile] = useState<File | null>(null);
  const [proofOfAddressFile, setProofOfAddressFile] = useState<File | null>(null);

  const handleFinish = () => {
    const moduleOption = STUDENT_MODULE_OPTIONS.find((option) => option.value === formData.enrollmentModule);
    const classroomOption = STUDENT_CLASSROOM_OPTIONS.find(
      (option) => option.value === formData.enrollmentClassroom,
    );
    const statusOption = STUDENT_STATUS_OPTIONS.find((option) => option.value === formData.enrollmentStatus);
    const normalizedEmail = formData.email.trim().toLowerCase();
    if (!normalizedEmail) return;

    const attachmentNames = [
      photo34 ? `Foto 3x4 (${photo34.name})` : null,
      rgFile ? `RG (${rgFile.name})` : null,
      cnhFile ? `CNH (${cnhFile.name})` : null,
      proofOfAddressFile ? `Comprovante de residência (${proofOfAddressFile.name})` : null,
    ].filter((item): item is string => Boolean(item));
    const resolvedClassroomFilter =
      (formData.enrollmentClassroom as StudentClassroomFilter) || "teoria-musical";
    const resolvedModuleFilter = (formData.enrollmentModule as StudentModuleFilter) || "module-i";

    upsertStudentRecord({
      details: {
        address: {
          city: formData.city || "-",
          complement: "-",
          neighborhood: formData.district || "-",
          number: formData.number || "-",
          state: formData.stateCode.toUpperCase() || "-",
          street: formData.street || "-",
          zipCode: formData.zipCode || "-",
        },
        attendance: {
          history: [],
          justifiedAbsences: 0,
          presentRate: "-",
          totalAbsences: 0,
          totalClasses: 0,
        },
        attachments: attachmentNames,
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
        classroomFilter: resolvedClassroomFilter,
        classroomFilters: getClassroomFiltersByModule(resolvedModuleFilter, resolvedClassroomFilter),
        classroomVariant: "blue",
        email: normalizedEmail,
        initials: getInitials(formData.fullName),
        module: moduleOption?.label ?? "-",
        moduleFilter: resolvedModuleFilter,
        moduleVariant: formData.enrollmentModule === "module-i" ? "violet" : "orange",
        name: formData.fullName || normalizedEmail,
        phone: formData.phone || "-",
        status: statusOption?.label ?? "-",
        statusFilter: (formData.enrollmentStatus as StudentStatusFilter) || "active",
      },
    });

    resetFormData();
    router.push(`/students/${encodeURIComponent(normalizedEmail)}`);
  };

  return (
    <ManualFlowShell
      currentStep={4}
      onNext={handleFinish}
      onPrevious={() => router.push("/students/new/manual/enrollment")}
    >
      <div className="grid gap-6">
        <section className="grid gap-4">
          <h3 className="text-[var(--content-primary)] [font-size:var(--typography-body-large-semibold-font-size)] [line-height:var(--typography-body-large-semibold-line-height)] [font-weight:var(--typography-body-large-semibold-font-weight)] [letter-spacing:var(--typography-body-large-semibold-letter-spacing)]">
            Documentos necessários
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
      </div>
    </ManualFlowShell>
  );
}

