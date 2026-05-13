import Link from "next/link";

type StudentDetailsPageProps = {
  params: Promise<{
    studentId: string;
  }>;
};

export default async function StudentDetailsPage({ params }: StudentDetailsPageProps) {
  const { studentId } = await params;

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="[font-size:var(--typography-body-x-large-semibold-font-size)] [font-weight:var(--typography-body-x-large-semibold-font-weight)] [line-height:var(--typography-body-x-large-semibold-line-height)] text-[var(--content-primary)]">
          Detalhes do Aluno
        </h1>
        <p className="text-[var(--content-secondary)]">
          Estrutura inicial da rota de detalhes. Identificador recebido:{" "}
          <span className="font-medium text-[var(--content-primary)]">{decodeURIComponent(studentId)}</span>
        </p>
      </header>
      <Link className="text-[var(--brand-primary-strong)] hover:underline" href="/students">
        Voltar para lista de alunos
      </Link>
    </section>
  );
}

