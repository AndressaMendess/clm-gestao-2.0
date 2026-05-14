"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClickableCard } from "@/components/ui/clickable-card";
import { PageHeader } from "@/components/ui/page-header";
import { getStudentRowsFromRegistry } from "../../students/_data/students-registry";

type ModuleSection = {
  cards: Array<{
    classroomFilter: string;
    classroomLabel: string;
    studentCount: number;
    teacherName: string;
  }>;
  moduleFilter: string;
  moduleLabel: string;
};

const TEACHER_BY_CLASSROOM_FILTER: Record<string, string> = {
  "teoria-musical": "Lucas Almeida",
  violino: "Marina Costa",
  trompete: "Rafael Souza",
  teclado: "Paula Nunes",
  contrabaixo: "João Pedro Lima",
  "classe-1": "Carla Martins",
  "classe-2": "Eduardo Rocha",
  solfejo: "Aline Ferreira",
  clarinete: "Bruno Teixeira",
  trompa: "Camila Duarte",
  saxofone: "Diego Ramos",
  violoncelo: "Fernanda Moraes",
  flauta: "Gabriel Pires",
  trombone: "Helena Barros",
  guitarra: "Igor Azevedo",
  violao: "Juliana Melo",
  "canto-coral": "Karen Dias",
};

function buildCallId() {
  return `call-${Date.now()}`;
}

export default function AttendanceStartPage() {
  const router = useRouter();

  const sections = useMemo<ModuleSection[]>(() => {
    const rows = getStudentRowsFromRegistry();
    const grouped = new Map<string, Map<string, { classroomLabel: string; studentCount: number }>>();

    rows.forEach((row) => {
      const moduleGroup = grouped.get(row.moduleFilter) ?? new Map<string, { classroomLabel: string; studentCount: number }>();
      const classroom = moduleGroup.get(row.classroomFilter) ?? { classroomLabel: row.classroom, studentCount: 0 };
      classroom.studentCount += 1;
      moduleGroup.set(row.classroomFilter, classroom);
      grouped.set(row.moduleFilter, moduleGroup);
    });

    return Array.from(grouped.entries())
      .map(([moduleFilter, classrooms]) => ({
        moduleFilter,
        moduleLabel: rows.find((row) => row.moduleFilter === moduleFilter)?.module ?? moduleFilter,
        cards: Array.from(classrooms.entries())
          .map(([classroomFilter, info]) => ({
            classroomFilter,
            classroomLabel: info.classroomLabel,
            studentCount: info.studentCount,
            teacherName: TEACHER_BY_CLASSROOM_FILTER[classroomFilter] ?? "Professor(a) não definido",
          }))
          .sort((a, b) => a.classroomLabel.localeCompare(b.classroomLabel, "pt-BR")),
      }))
      .sort((a, b) => a.moduleLabel.localeCompare(b.moduleLabel, "pt-BR"));
  }, []);

  const handleOpenAttendanceCall = (moduleFilter: string, classroomFilter: string) => {
    const callId = buildCallId();
    const query = new URLSearchParams({ module: moduleFilter, classroom: classroomFilter });
    router.push(`/attendance/${callId}?${query.toString()}`);
  };

  return (
    <section>
      <Button className="mb-4" icon={ArrowLeft} onClick={() => router.back()} variant="ghost">
        Voltar
      </Button>
      <PageHeader subtitle="Selecione uma turma por módulo para iniciar a chamada." title="Iniciar chamada" />

      <div className="mt-6 grid gap-8">
        {sections.map((section) => (
          <section className="grid gap-2" key={section.moduleFilter}>
            <h2 className="text-[var(--content-primary)] [font-size:var(--typography-body-large-semibold-font-size)] [line-height:var(--typography-body-large-semibold-line-height)] [font-weight:var(--typography-body-large-semibold-font-weight)] [letter-spacing:var(--typography-body-large-semibold-letter-spacing)]">
              {section.moduleLabel}
            </h2>

            <div className="grid gap-3">
              {section.cards.map((card) => (
                <ClickableCard
                  ariaLabel={`Iniciar chamada da turma ${card.classroomLabel} do ${section.moduleLabel}`}
                  key={`${section.moduleFilter}-${card.classroomFilter}`}
                  onClick={() => handleOpenAttendanceCall(section.moduleFilter, card.classroomFilter)}
                  subtitle={`${card.teacherName} • ${card.studentCount} alunos`}
                  title={`${section.moduleLabel} - ${card.classroomLabel}`}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
