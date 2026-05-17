import { useOcrFlow } from "../ocr-flow-provider";

export function StepReviewFinal() {
  const { state } = useOcrFlow();

  return (
    <div className="grid gap-4">
      <h3 className="text-[var(--content-primary)] [font-size:var(--typography-body-large-semibold-font-size)] [font-weight:var(--typography-body-large-semibold-font-weight)]">
        Revisão final
      </h3>
      <p className="text-[var(--content-secondary)]">
        Confira os dados extraídos e o módulo selecionado antes de salvar.
      </p>
      <div className="rounded-xl border border-[var(--border-primary)] p-4">
        <p className="text-[var(--content-secondary)]">Módulo selecionado</p>
        <p className="text-[var(--content-primary)]">{state.manualModule || "Não definido"}</p>
      </div>
    </div>
  );
}
