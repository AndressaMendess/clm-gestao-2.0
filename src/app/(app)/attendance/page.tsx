import { PageHeader } from "@/components/ui/page-header";

export default function AttendancePage() {
  return (
    <section className="space-y-6">
      <PageHeader
        ctaLabel="Adicionar presença"
        subtitle="Acompanhe e registre a frequência dos alunos."
        title="Presenças"
      />
    </section>
  );
}
