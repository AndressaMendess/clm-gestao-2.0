import { CheckCircle2, CircleCheckBig, ScanLine, XCircle } from "lucide-react";

export function StepInstructions() {
  return (
    <div className="grid gap-6">
      <header className="grid justify-items-center gap-3 text-center">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--background-secondary)] text-[var(--brand-primary-main)]">
          <ScanLine className="h-6 w-6" />
        </span>
        <div className="grid gap-1">
          <h3 className="text-[var(--content-primary)] [font-size:var(--typography-body-large-semibold-font-size)] [font-weight:var(--typography-body-large-semibold-font-weight)]">
            Prepare os Documentos
          </h3>
          <p className="text-[var(--content-secondary)]">
            Siga estas orientações para obter os melhores resultados
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <article className="grid gap-3 rounded-2xl border border-[var(--border-primary)] bg-[var(--background-primary)] p-4">
          <div className="inline-flex items-center gap-2 text-[var(--content-primary)]">
            <h4 className="[font-size:var(--typography-body-medium-semibold-font-size)] [font-weight:var(--typography-body-medium-semibold-font-weight)]">
              Faça
            </h4>
          </div>
          <ul className="grid gap-2 text-[var(--content-secondary)]">
            <li className="flex items-start gap-2">
              <CircleCheckBig className="mt-0.5 h-4 w-4 shrink-0 text-[var(--feedback-success-content)]" />
              <span>Use boa iluminação</span>
            </li>
            <li className="flex items-start gap-2">
              <CircleCheckBig className="mt-0.5 h-4 w-4 shrink-0 text-[var(--feedback-success-content)]" />
              <span>Mantenha o documento inteiro visível</span>
            </li>
            <li className="flex items-start gap-2">
              <CircleCheckBig className="mt-0.5 h-4 w-4 shrink-0 text-[var(--feedback-success-content)]" />
              <span>Coloque sobre fundo neutro</span>
            </li>
            <li className="flex items-start gap-2">
              <CircleCheckBig className="mt-0.5 h-4 w-4 shrink-0 text-[var(--feedback-success-content)]" />
              <span>Tire fotos nítidas e focadas</span>
            </li>
          </ul>
        </article>

        <article className="grid gap-3 rounded-2xl border border-[var(--border-primary)] bg-[var(--background-primary)] p-4">
          <div className="inline-flex items-center gap-2 text-[var(--content-primary)]">
            <h4 className="[font-size:var(--typography-body-medium-semibold-font-size)] [font-weight:var(--typography-body-medium-semibold-font-weight)]">
              Evite
            </h4>
          </div>
          <ul className="grid gap-2 text-[var(--content-secondary)]">
            <li className="flex items-start gap-2">
              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--feedback-error-content)]" />
              <span>Sombras sobre o documento</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--feedback-error-content)]" />
              <span>Fotos borradas ou tremidas</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--feedback-error-content)]" />
              <span>Reflexos de luz ou flash</span>
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--feedback-error-content)]" />
              <span>Partes cortadas do documento</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  );
}
