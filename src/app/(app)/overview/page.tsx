import { ClipboardCheck, ClipboardList, Users } from "lucide-react";
import { FeatureCard } from "@/components/ui/feature-card";
import { PageHeader } from "@/components/ui/page-header";

const userName = "Andressa";

function getCurrentDateLabel() {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    weekday: "long",
  }).format(new Date());
}

export default function OverviewPage() {
  return (
    <section className="space-y-6">
      <PageHeader subtitle={`Olá ${userName} - ${getCurrentDateLabel()}.`} title="Visão geral" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <FeatureCard
          arrowColorClassName="text-[var(--content-inverse)]"
          backgroundColorClassName="bg-[linear-gradient(148deg,var(--brand-primary-main)_34%,#f12c2c_100%)]"
          className="shadow-[0_10px_24px_rgb(241_108_44_/_0.24)]"
          href="/attendance/new"
          icon={ClipboardCheck}
          iconBackgroundColorClassName="bg-[rgb(255_255_255_/_0.2)]"
          iconColorClassName="text-[var(--content-inverse)]"
          subtitle="Registra a presença dos alunos de forma rápida e organizada."
          subtitleColorClassName="!text-[var(--content-inverse)]"
          title="Iniciar chamada"
          titleColorClassName="!text-[var(--content-inverse)]"
        />

        <FeatureCard
          href="/students"
          icon={Users}
          subtitle="Gerencie o cadastro completo de alunos."
          title="Alunos"
        />

        <FeatureCard
          backgroundColorClassName="bg-[var(--accent-green-background)]"
          href="/attendance"
          icon={ClipboardList}
          iconBackgroundColorClassName="bg-[var(--color-green-200)]"
          iconColorClassName="text-[var(--accent-green-content)]"
          subtitle="Consulte o histórico e registro de presenças."
          title="Presenças"
        />
      </div>
    </section>
  );
}
