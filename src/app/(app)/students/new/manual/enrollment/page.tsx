"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/ui/select-field";
import {
  STUDENT_CLASSROOM_OPTIONS,
  STUDENT_MODULE_OPTIONS,
  STUDENT_STATUS_OPTIONS,
  toSelectFieldOptions,
} from "@/app/(app)/students/_config/students-filter-options";
import { useManualFlowForm } from "../_components/manual-flow-provider";
import { ManualFlowShell } from "../_components/manual-flow-shell";

const CLASSROOMS_BY_MODULE: Record<string, string[]> = {
  "module-i": ["classe-1", "classe-2"],
  "module-ii": [
    "teoria-musical",
    "solfejo",
    "violino",
    "trompete",
    "clarinete",
    "trompa",
    "saxofone",
    "teclado",
    "violoncelo",
    "flauta",
    "trombone",
    "guitarra",
    "violao",
    "contrabaixo",
    "canto-coral",
  ],
  "module-iii": [
    "teoria-musical",
    "solfejo",
    "violino",
    "trompete",
    "clarinete",
    "trompa",
    "saxofone",
    "teclado",
    "violoncelo",
    "flauta",
    "trombone",
    "guitarra",
    "violao",
    "contrabaixo",
    "canto-coral",
  ],
};

export default function StudentCreateManualEnrollmentPage() {
  const router = useRouter();
  const { formData, updateFormData } = useManualFlowForm();
  const {
    enrollmentModule,
    enrollmentClassroom,
    enrollmentStatus,
    fatherName,
    motherName,
  } = formData;

  const moduleOptions = useMemo(() => toSelectFieldOptions(STUDENT_MODULE_OPTIONS), []);
  const classroomOptions = useMemo(() => {
    if (!enrollmentModule) return [];
    const allowedClassrooms = CLASSROOMS_BY_MODULE[enrollmentModule] ?? [];
    return toSelectFieldOptions(
      STUDENT_CLASSROOM_OPTIONS.filter((option) => allowedClassrooms.includes(option.value)),
    );
  }, [enrollmentModule]);
  const statusOptions = useMemo(() => toSelectFieldOptions(STUDENT_STATUS_OPTIONS), []);
  const isNextDisabled = !enrollmentModule || !enrollmentClassroom || !enrollmentStatus;
  const requiredLabelStyles =
    "[font-size:var(--typography-body-medium-regular-font-size)] [line-height:var(--typography-body-medium-regular-line-height)] [font-weight:var(--typography-body-medium-regular-font-weight)] [letter-spacing:var(--typography-body-medium-regular-letter-spacing)] text-[var(--content-primary)]";

  return (
    <ManualFlowShell
      currentStep={3}
      nextDisabled={isNextDisabled}
      onNext={() => router.push("/students/new/manual/attachments")}
      onPrevious={() => router.push("/students/new/manual/documents")}
    >
      <div className="grid gap-6">
        <section className="grid gap-4">
          <h3 className="text-[var(--content-primary)] [font-size:var(--typography-body-large-semibold-font-size)] [line-height:var(--typography-body-large-semibold-line-height)] [font-weight:var(--typography-body-large-semibold-font-weight)] [letter-spacing:var(--typography-body-large-semibold-letter-spacing)]">
            Matrícula
          </h3>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <label className={requiredLabelStyles} htmlFor="manual-enrollment-module">
                Módulo <span className="text-[var(--feedback-error-content)]">*</span>
              </label>
              <SelectField
                id="manual-enrollment-module"
                onValueChange={(value) =>
                  updateFormData({
                    enrollmentClassroom: "",
                    enrollmentModule: value,
                  })
                }
                options={moduleOptions}
                placeholder="Selecione"
                required
                value={enrollmentModule}
                variant="without-label"
              />
            </div>

            <div className="grid gap-2">
              <label className={requiredLabelStyles} htmlFor="manual-enrollment-classroom">
                Turma <span className="text-[var(--feedback-error-content)]">*</span>
              </label>
              <SelectField
                disabled={!enrollmentModule}
                helperText={!enrollmentModule ? "Selecione um módulo primeiro" : undefined}
                id="manual-enrollment-classroom"
                onValueChange={(value) => updateFormData({ enrollmentClassroom: value })}
                options={classroomOptions}
                placeholder="Selecione"
                required
                value={enrollmentClassroom}
                variant="without-label"
              />
            </div>

            <div className="grid gap-2">
              <label className={requiredLabelStyles} htmlFor="manual-enrollment-status">
                Status <span className="text-[var(--feedback-error-content)]">*</span>
              </label>
              <SelectField
                id="manual-enrollment-status"
                onValueChange={(value) => updateFormData({ enrollmentStatus: value })}
                options={statusOptions}
                placeholder="Selecione"
                required
                value={enrollmentStatus}
                variant="without-label"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-4">
          <h3 className="text-[var(--content-primary)] [font-size:var(--typography-body-large-semibold-font-size)] [line-height:var(--typography-body-large-semibold-line-height)] [font-weight:var(--typography-body-large-semibold-font-weight)] [letter-spacing:var(--typography-body-large-semibold-letter-spacing)]">
            Informações familiares
          </h3>

          <div className="grid gap-4">
            <Input
              label="Nome do pai"
              onChange={(event) => updateFormData({ fatherName: event.currentTarget.value })}
              placeholder="Nome completo do pai"
              value={fatherName}
            />

            <Input
              label="Nome da mãe"
              onChange={(event) => updateFormData({ motherName: event.currentTarget.value })}
              placeholder="Nome completo da mãe"
              value={motherName}
            />
          </div>
        </section>
      </div>
    </ManualFlowShell>
  );
}
