"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";
import { useRouter } from "next/navigation";
import type { BadgeVariant } from "@/components/ui/badge";
import { ListCollapsible } from "@/components/ui/list-collapsible";
import { PageHeader } from "@/components/ui/page-header";
import { SelectField } from "@/components/ui/select-field";
import {
  getClassroomOptionsByModule,
  STUDENT_CLASSROOM_OPTIONS,
  STUDENT_MODULE_OPTIONS,
  toSelectFieldOptions,
} from "../_config/filters";
import {
  getAttendanceCallsFromRegistry,
  type AttendanceRegistryCall,
  type AttendanceStatus,
} from "./_data/attendance-registry";

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
  const router = useRouter();
  const [moduleFilter, setModuleFilter] = useState("");
  const [classroomFilter, setClassroomFilter] = useState("");
  const [attendanceCalls, setAttendanceCalls] = useState<AttendanceRegistryCall[]>([]);

  useEffect(() => {
    setAttendanceCalls(getAttendanceCallsFromRegistry());
  }, []);

  const filteredAttendanceCalls = useMemo(
    () =>
      attendanceCalls
        .filter((call) => {
          const matchesModule = moduleFilter ? call.moduleFilter === moduleFilter : true;
          const matchesClassroom = classroomFilter ? call.classroomFilter === classroomFilter : true;
          return matchesModule && matchesClassroom;
        })
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [attendanceCalls, classroomFilter, moduleFilter],
  );
  const classroomOptions = useMemo(
    () =>
      toSelectFieldOptions(
        moduleFilter ? getClassroomOptionsByModule(moduleFilter) : STUDENT_CLASSROOM_OPTIONS,
      ),
    [moduleFilter],
  );

  return (
    <section>
      <PageHeader
        ctaLabel="Adicionar presença"
        ctaOnClick={() => router.push("/attendance/new")}
        subtitle="Acompanhe e registre a frequência dos alunos."
        title="Presenças"
      />

      <div className="mt-6 mb-6 grid w-full min-w-0 grid-cols-1 gap-2 sm:grid-cols-2">
        <SelectField
          aria-label="Filtrar por módulo"
          onValueChange={(value) => {
            setModuleFilter(value);
            setClassroomFilter("");
          }}
          options={toSelectFieldOptions(STUDENT_MODULE_OPTIONS)}
          placeholder="Selecione um módulo"
          value={moduleFilter}
          variant="without-label"
        />

        <SelectField
          aria-label="Filtrar por turma"
          onValueChange={setClassroomFilter}
          options={classroomOptions}
          placeholder="Selecione uma turma"
          value={classroomFilter}
          variant="without-label"
        />
      </div>

      {filteredAttendanceCalls.length ? (
        <div className="grid gap-4 py-8">
          {filteredAttendanceCalls.map((call) => (
            <ListCollapsible
              icon={CalendarDays}
              key={call.id}
              items={call.students.map((student) => ({
                id: student.id,
                text: student.name,
                secondaryText: student.note ? `Observação: ${student.note}` : undefined,
                badgeLabel: ATTENDANCE_STATUS_LABEL[student.attendance],
                badgeVariant: ATTENDANCE_STATUS_VARIANT[student.attendance],
              }))}
              subtitle={formatAttendanceCallSubtitle(call.createdAt, call.userName)}
              title={`${call.module} - ${call.classroom}`}
            />
          ))}
        </div>
      ) : (
        <p className="py-8 text-[var(--content-secondary)] [font-size:var(--typography-body-medium-regular-font-size)] [line-height:var(--typography-body-medium-regular-line-height)] [font-weight:var(--typography-body-medium-regular-font-weight)] [letter-spacing:var(--typography-body-medium-regular-letter-spacing)]">
          Nenhuma chamada recente encontrada.
        </p>
      )}
    </section>
  );
}

