"use client";

import { useOcrFlow } from "../ocr-flow-provider";

export function StepManualEntry() {
  const { setManualModule, state } = useOcrFlow();

  return (
    <div className="grid gap-4">
      <h3 className="text-[var(--content-primary)] [font-size:var(--typography-body-large-semibold-font-size)] [font-weight:var(--typography-body-large-semibold-font-weight)]">
        Módulo manual
      </h3>
      <p className="text-[var(--content-secondary)]">Selecione manualmente o módulo para concluir o cadastro.</p>

      <label className="grid gap-2 text-[var(--content-primary)]" htmlFor="manual-module">
        Módulo
        <select
          className="min-h-11 rounded-xl border border-[var(--border-primary)] bg-[var(--background-primary)] px-3 text-[var(--content-primary)]"
          id="manual-module"
          onChange={(event) => setManualModule(event.target.value)}
          value={state.manualModule}
        >
          <option value="">Selecione</option>
          <option value="module-i">Módulo I</option>
          <option value="module-ii">Módulo II</option>
          <option value="module-iii">Módulo III</option>
        </select>
      </label>
    </div>
  );
}
