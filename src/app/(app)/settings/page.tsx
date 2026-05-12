import { PageHeader } from "@/components/ui/page-header";

export default function SettingsPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        ctaLabel="Salvar alterações"
        subtitle="Ajuste preferências e parâmetros da plataforma."
        title="Configurações"
      />
    </section>
  );
}
