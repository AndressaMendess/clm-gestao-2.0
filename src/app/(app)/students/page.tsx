import { PageHeader } from "@/components/ui/page-header";

export default function StudentsPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        ctaLabel="Adicionar aluno"
        subtitle="Gerencie o cadastro completo de alunos."
        title="Alunos"
      />
    </section>
  );
}
