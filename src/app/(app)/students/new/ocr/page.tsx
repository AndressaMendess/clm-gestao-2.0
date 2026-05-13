import Link from "next/link";

export default function StudentCreateOcrPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="[font-size:var(--typography-body-x-large-semibold-font-size)] [font-weight:var(--typography-body-x-large-semibold-font-weight)] [line-height:var(--typography-body-x-large-semibold-line-height)] text-[var(--content-primary)]">
          Cadastro por OCR
        </h1>
        <p className="text-[var(--content-secondary)]">
          Fluxo base criado. Próximo passo: upload de documento, extração e revisão antes de salvar.
        </p>
      </header>
      <Link className="text-[var(--brand-primary-strong)] hover:underline" href="/students/new">
        Voltar para escolha de fluxo
      </Link>
    </section>
  );
}

