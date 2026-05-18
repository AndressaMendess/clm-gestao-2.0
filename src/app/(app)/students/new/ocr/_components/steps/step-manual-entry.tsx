"use client";

import { useMemo } from "react";
import { SelectField } from "@/components/ui/select-field";
import { STUDENT_CLASSROOM_OPTIONS, STUDENT_MODULE_OPTIONS, toSelectFieldOptions } from "@/app/(app)/students/_config/students-filter-options";
import { useOcrFlow } from "../ocr-flow-provider";

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

export function StepManualEntry() {
  const { setManualClassroom, setManualModule, state } = useOcrFlow();

  const moduleOptions = useMemo(() => toSelectFieldOptions(STUDENT_MODULE_OPTIONS), []);
  const classroomOptions = useMemo(() => {
    if (!state.manualModule) return [];
    const allowedClassrooms = CLASSROOMS_BY_MODULE[state.manualModule] ?? [];
    return toSelectFieldOptions(
      STUDENT_CLASSROOM_OPTIONS.filter((option) => allowedClassrooms.includes(option.value)),
    );
  }, [state.manualModule]);

  return (
    <div className="grid gap-4">
      <h3 className="text-[var(--content-primary)] [font-size:var(--typography-body-x-large-semibold-font-size)] [line-height:var(--typography-body-x-large-semibold-line-height)] [font-weight:var(--typography-body-x-large-semibold-font-weight)]">
        Matrícula <span className="text-[var(--feedback-error-content)]">*</span>
      </h3>

      <div className="grid grid-cols-1 gap-4">
        <SelectField
          label="Módulo *"
          onValueChange={(value) => setManualModule(value)}
          options={moduleOptions}
          placeholder="Selecione"
          required
          value={state.manualModule}
        />

        <SelectField
          disabled={!state.manualModule}
          helperText={!state.manualModule ? "Selecione um módulo primeiro" : undefined}
          label="Turma *"
          onValueChange={(value) => setManualClassroom(value)}
          options={classroomOptions}
          placeholder="Selecione"
          required
          value={state.manualClassroom}
        />
      </div>
    </div>
  );
}
