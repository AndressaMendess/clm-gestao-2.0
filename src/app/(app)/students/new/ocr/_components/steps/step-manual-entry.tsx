"use client";

import { useMemo } from "react";
import { SelectField } from "@/components/ui/select-field";
import {
  getClassroomOptionsByModule,
  STUDENT_MODULE_OPTIONS,
  toSelectFieldOptions,
} from "@/app/(app)/_config/filters";
import { useOcrFlow } from "../ocr-flow-provider";

export function StepManualEntry() {
  const { setManualClassroom, setManualModule, state } = useOcrFlow();

  const moduleOptions = useMemo(() => toSelectFieldOptions(STUDENT_MODULE_OPTIONS), []);
  const classroomOptions = useMemo(() => {
    if (!state.manualModule) return [];
    return toSelectFieldOptions(getClassroomOptionsByModule(state.manualModule));
  }, [state.manualModule]);

  return (
    <div className="grid gap-4">
      <h3 className="text-[var(--content-primary)] [font-size:var(--typography-body-x-large-semibold-font-size)] [line-height:var(--typography-body-x-large-semibold-line-height)] [font-weight:var(--typography-body-x-large-semibold-font-weight)]">
        MatrÃ­cula <span className="text-[var(--feedback-error-content)]">*</span>
      </h3>

      <div className="grid grid-cols-1 gap-4">
        <SelectField
          label="MÃ³dulo *"
          onValueChange={(value) => setManualModule(value)}
          options={moduleOptions}
          placeholder="Selecione"
          required
          value={state.manualModule}
        />

        <SelectField
          disabled={!state.manualModule}
          helperText={!state.manualModule ? "Selecione um mÃ³dulo primeiro" : undefined}
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

