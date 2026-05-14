"use client";

import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";
import type { BadgeVariant } from "@/components/ui/badge";
import { ListCollapsible } from "@/components/ui/list-collapsible";
import { PageHeader } from "@/components/ui/page-header";
import { SelectField } from "@/components/ui/select-field";
import {
  STUDENT_CLASSROOM_OPTIONS,
  STUDENT_MODULE_OPTIONS,
  toSelectFieldOptions,
} from "../students/_config/students-filter-options";

type AttendanceStatus = "present" | "absent" | "excused";

type AttendanceCall = {
  classroom: string;
  classroomFilter: string;
  createdAt: string;
  id: string;
  module: string;
  moduleFilter: string;
  userName: string;
  students: Array<{
    attendance: AttendanceStatus;
    id: string;
    name: string;
  }>;
};

const ATTENDANCE_STATUS_LABEL: Record<AttendanceStatus, string> = {
  present: "Presente",
  absent: "Ausente",
  excused: "Justificado",
};

const ATTENDANCE_STATUS_VARIANT: Record<AttendanceStatus, BadgeVariant> = {
  present: "success",
  absent: "error",
  excused: "warning",
};

const ATTENDANCE_CALLS: AttendanceCall[] = [
  {
    id: "call-001",
    module: "Módulo I",
    moduleFilter: "module-i",
    classroom: "Teoria musical",
    classroomFilter: "teoria-musical",
    createdAt: "2026-05-14T09:30:00-03:00",
    userName: "Andressa Mendes",
    students: [
      { id: "st-1", name: "Ana Clara Costa", attendance: "present" },
      { id: "st-2", name: "Ester Sousa", attendance: "excused" },
    ],
  },
  {
    id: "call-002",
    module: "Módulo II",
    moduleFilter: "module-ii",
    classroom: "Violino",
    classroomFilter: "violino",
    createdAt: "2026-05-14T08:15:00-03:00",
    userName: "Andressa Mendes",
    students: [
      { id: "st-3", name: "Bruno Henrique Silva", attendance: "present" },
      { id: "st-4", name: "Diego Pires", attendance: "absent" },
    ],
  },
  {
    id: "call-003",
    module: "Módulo III",
    moduleFilter: "module-iii",
    classroom: "Trompete",
    classroomFilter: "trompete",
    createdAt: "2026-05-13T18:45:00-03:00",
    userName: "Andressa Mendes",
    students: [{ id: "st-5", name: "Camila Rocha", attendance: "present" }],
  },
];

function formatAttendanceCallSubtitle(createdAt: string, userName: string) {
  const date = new Date(createdAt);
  const dateLabel = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
  const timeLabel = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

  return `${dateLabel} ${timeLabel} - por ${userName}`;
}

export default function AttendancePage() {
  const [moduleFilter, setModuleFilter] = useState("");
  const [classroomFilter, setClassroomFilter] = useState("");

  const filteredAttendanceCalls = useMemo(
    () =>
      ATTENDANCE_CALLS.filter((call) => {
        const matchesModule = moduleFilter ? call.moduleFilter === moduleFilter : true;
        const matchesClassroom = classroomFilter ? call.classroomFilter === classroomFilter : true;
        return matchesModule && matchesClassroom;
      }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [classroomFilter, moduleFilter],
  );

  return (
    <section>
      <PageHeader
        ctaLabel="Adicionar presença"
        subtitle="Acompanhe e registre a frequência dos alunos."
        title="Presenças"
      />

      <div className="mt-6 mb-6 grid w-full min-w-0 grid-cols-1 gap-2 sm:grid-cols-2">
        <SelectField
          aria-label="Filtrar por módulo"
          onValueChange={setModuleFilter}
          options={toSelectFieldOptions(STUDENT_MODULE_OPTIONS)}
          placeholder="Selecione um módulo"
          value={moduleFilter}
          variant="without-label"
        />

        <SelectField
          aria-label="Filtrar por turma"
          onValueChange={setClassroomFilter}
          options={toSelectFieldOptions(STUDENT_CLASSROOM_OPTIONS)}
          placeholder="Selecione uma turma"
          value={classroomFilter}
          variant="without-label"
        />
      </div>

      <div className="grid gap-4 py-8">
        {filteredAttendanceCalls.map((call) => (
          <ListCollapsible
            icon={CalendarDays}
            key={call.id}
            items={call.students.map((student) => ({
              id: student.id,
              text: student.name,
              badgeLabel: ATTENDANCE_STATUS_LABEL[student.attendance],
              badgeVariant: ATTENDANCE_STATUS_VARIANT[student.attendance],
            }))}
            subtitle={formatAttendanceCallSubtitle(call.createdAt, call.userName)}
            title={`${call.module} - ${call.classroom}`}
          />
        ))}
      </div>
    </section>
  );
}
