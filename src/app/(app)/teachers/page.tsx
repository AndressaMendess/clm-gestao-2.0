import { PageHeader } from "@/components/ui/page-header";

export default function TeachersPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        ctaLabel="Adicionar professor"
        ctaVariant="ghost"
        subtitle="Gerencie o cadastro e os dados da equipe docente."
        title="Professores"
      />
    </section>
  );
}

