import { useOcrFlow } from "../ocr-flow-provider";

export function StepReviewOcr() {
  const { state } = useOcrFlow();
  const data = state.extractedData;

  return (
    <div className="grid gap-4">
      <h3 className="text-[var(--content-primary)] [font-size:var(--typography-body-large-semibold-font-size)] [font-weight:var(--typography-body-large-semibold-font-weight)]">
        Revisão OCR
      </h3>
      {!data ? (
        <p className="text-[var(--content-secondary)]">Faça o upload para visualizar os campos extraídos.</p>
      ) : (
        <dl className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="rounded-xl border border-[var(--border-primary)] p-3">
            <dt className="text-[var(--content-secondary)]">Nome completo</dt>
            <dd className="text-[var(--content-primary)]">{data.fullName}</dd>
          </div>
          <div className="rounded-xl border border-[var(--border-primary)] p-3">
            <dt className="text-[var(--content-secondary)]">CPF</dt>
            <dd className="text-[var(--content-primary)]">{data.cpf}</dd>
          </div>
          <div className="rounded-xl border border-[var(--border-primary)] p-3">
            <dt className="text-[var(--content-secondary)]">RG</dt>
            <dd className="text-[var(--content-primary)]">{data.rg}</dd>
          </div>
          <div className="rounded-xl border border-[var(--border-primary)] p-3">
            <dt className="text-[var(--content-secondary)]">Data de nascimento</dt>
            <dd className="text-[var(--content-primary)]">{data.birthDate}</dd>
          </div>
        </dl>
      )}
    </div>
  );
}
