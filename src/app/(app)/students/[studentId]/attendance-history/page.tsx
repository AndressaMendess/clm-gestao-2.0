"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { STUDENT_ROWS } from "../../_data/students.mock";

export default function StudentAttendanceHistoryPage() {
  const router = useRouter();
  const params = useParams<{ studentId: string }>();

  const student = useMemo(() => {
    const decodedStudentId = decodeURIComponent(params.studentId);
    return STUDENT_ROWS.find((item) => item.email === decodedStudentId) ?? null;
  }, [params.studentId]);

  return (
    <section className="space-y-6">
      <header className="grid gap-1">
        <h1 className="[font-size:var(--typography-body-x-large-semibold-font-size)] [line-height:var(--typography-body-x-large-semibold-line-height)] [font-weight:var(--typography-body-x-large-semibold-font-weight)] [letter-spacing:var(--typography-body-x-large-semibold-letter-spacing)] text-[var(--content-primary)]">
          Histórico de Frequência
        </h1>
        <p className="text-[var(--content-secondary)]">
          Aluno: <span className="font-semibold text-[var(--content-primary)]">{student?.name ?? "Não encontrado"}</span>
        </p>
      </header>

      <Card
        fields={[
          {
            id: "placeholder",
            label: "Conteúdo",
            value: "Estrutura pronta para receber o histórico completo de frequência via back-end.",
          },
        ]}
        title="Lista completa"
      />

      <div>
        <Button
          onClick={() => router.push(`/students/${encodeURIComponent(student?.email ?? "")}`)}
          variant="secondary"
        >
          Voltar para detalhes do aluno
        </Button>
      </div>
    </section>
  );
}
