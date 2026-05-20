"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/ui/select-field";
import {
  getClassroomOptionsByModule,
  STUDENT_MODULE_OPTIONS,
  STUDENT_STATUS_OPTIONS,
  toSelectFieldOptions,
} from "@/app/(app)/_config/filters";
import { useEditFlowForm } from "../_components/edit-flow-provider";
import { EditFlowShell } from "../_components/edit-flow-shell";

export default function StudentEditEnrollmentPage() {
  const router = useRouter();
  const params = useParams<{ studentId: string }>();
  const decodedStudentId = useMemo(() => decodeURIComponent(params.studentId), [params.studentId]);
  const { formData, updateFormData } = useEditFlowForm();
  const { enrollmentModule, enrollmentClassroom, enrollmentStatus, fatherName, motherName } = formData;

  const moduleOptions = useMemo(() => toSelectFieldOptions(STUDENT_MODULE_OPTIONS), []);
  const classroomOptions = useMemo(() => {
    if (!enrollmentModule) return [];
    return toSelectFieldOptions(getClassroomOptionsByModule(enrollmentModule));
  }, [enrollmentModule]);
  const statusOptions = useMemo(() => toSelectFieldOptions(STUDENT_STATUS_OPTIONS), []);
  const isNextDisabled = !enrollmentModule || !enrollmentClassroom || !enrollmentStatus;
  const requiredLabelStyles =
    "[font-size:var(--typography-body-medium-regular-font-size)] [line-height:var(--typography-body-medium-regular-line-height)] [font-weight:var(--typography-body-medium-regular-font-weight)] [letter-spacing:var(--typography-body-medium-regular-letter-spacing)] text-[var(--content-primary)]";

  return (
    <EditFlowShell
      currentStep={3}
      nextDisabled={isNextDisabled}
      onNext={() => router.push(`/students/${encodeURIComponent(decodedStudentId)}/edit/attachments`)}
      onPrevious={() => router.push(`/students/${encodeURIComponent(decodedStudentId)}/edit/documents`)}
    >
      <div className="grid gap-6">
        <section className="grid gap-4">
          <h3 className="text-[var(--content-primary)] [font-size:var(--typography-body-large-semibold-font-size)] [line-height:var(--typography-body-large-semibold-line-height)] [font-weight:var(--typography-body-large-semibold-font-weight)] [letter-spacing:var(--typography-body-large-semibold-letter-spacing)]">
            Matrícula
          </h3>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <label className={requiredLabelStyles} htmlFor="edit-enrollment-module">
                Módulo <span className="text-[var(--feedback-error-content)]">*</span>
              </label>
              <SelectField
                id="edit-enrollment-module"
                onValueChange={(value) => updateFormData({ enrollmentClassroom: "", enrollmentModule: value })}
                options={moduleOptions}
                placeholder="Selecione"
                required
                value={enrollmentModule}
                variant="without-label"
              />
            </div>

            <div className="grid gap-2">
              <label className={requiredLabelStyles} htmlFor="edit-enrollment-classroom">
                Turma <span className="text-[var(--feedback-error-content)]">*</span>
              </label>
              <SelectField
                disabled={!enrollmentModule}
                helperText={!enrollmentModule ? "Selecione um módulo primeiro" : undefined}
                id="edit-enrollment-classroom"
                onValueChange={(value) => updateFormData({ enrollmentClassroom: value })}
                options={classroomOptions}
                placeholder="Selecione"
                required
                value={enrollmentClassroom}
                variant="without-label"
              />
            </div>

            <div className="grid gap-2">
              <label className={requiredLabelStyles} htmlFor="edit-enrollment-status">
                Status <span className="text-[var(--feedback-error-content)]">*</span>
              </label>
              <SelectField
                id="edit-enrollment-status"
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
    </EditFlowShell>
  );
}
