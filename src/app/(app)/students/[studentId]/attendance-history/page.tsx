"use client";

import { ChevronLeft, MessageCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { BadgeVariant } from "@/components/ui/badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/input/date-picker";
import { SelectField } from "@/components/ui/select-field";
import { TableCard } from "@/components/ui/table-card";
import type { TableCardColumn } from "@/components/ui/table-card";
import { getAttendanceCallsFromRegistry, type AttendanceRegistryCall, type AttendanceStatus } from "@/app/(app)/attendance/_data/attendance-registry";
import { getAllAttendanceJustifications } from "./_data/attendance-justifications-registry";
import { STUDENT_ROWS } from "../../_data/students.mock";
import type { AttendanceJustificationRecord } from "./_data/attendance-justifications-registry";

type StudentAttendanceHistoryRow = {
  callId: string;
  classroom: string;
  classroomVariant: "blue" | "pink";
  dateIso: string;
  hasJustification: boolean;
  module: string;
  moduleVariant: "orange" | "violet";
  note: string;
  status: AttendanceStatus;
};

const ANA_CLARA_EMAIL = "ana.costa@email.com";

const ANA_CLARA_HISTORY_MOCK: StudentAttendanceHistoryRow[] = [
  {
    callId: "mock-call-1",
    dateIso: "2026-05-12T14:00:00.000Z",
    hasJustification: false,
    module: "Módulo I",
    moduleVariant: "violet",
    classroom: "Teoria musical",
    classroomVariant: "blue",
    status: "present",
    note: "-",
  },
  {
    callId: "mock-call-2",
    dateIso: "2026-05-10T14:00:00.000Z",
    hasJustification: false,
    module: "Módulo I",
    moduleVariant: "violet",
    classroom: "Teoria musical",
    classroomVariant: "blue",
    status: "absent",
    note: "Faltou por motivo pessoal.",
  },
  {
    callId: "mock-call-3",
    dateIso: "2026-05-08T14:00:00.000Z",
    hasJustification: false,
    module: "Módulo I",
    moduleVariant: "violet",
    classroom: "Teoria musical",
    classroomVariant: "blue",
    status: "excused",
    note: "Consulta médica (justificada).",
  },
];

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

function formatDate(dateIso: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateIso));
}

export default function StudentAttendanceHistoryPage() {
  const router = useRouter();
  const params = useParams<{ studentId: string }>();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [attendanceCalls, setAttendanceCalls] = useState<AttendanceRegistryCall[]>([]);
  const [justificationVersion, setJustificationVersion] = useState(0);
  const [justifications, setJustifications] = useState<Record<string, AttendanceJustificationRecord>>({});

  const decodedStudentId = useMemo(() => decodeURIComponent(params.studentId), [params.studentId]);

  const student = useMemo(() => {
    return STUDENT_ROWS.find((item) => item.email === decodedStudentId) ?? null;
  }, [decodedStudentId]);

  useEffect(() => {
    setAttendanceCalls(getAttendanceCallsFromRegistry());
  }, []);

  useEffect(() => {
    setJustifications(getAllAttendanceJustifications());
  }, [justificationVersion]);

  useEffect(() => {
    const handleFocus = () => setJustificationVersion((current) => current + 1);
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const rows = useMemo<StudentAttendanceHistoryRow[]>(() => {
    const registryRows = attendanceCalls
      .flatMap((call) => {
        const attendance = call.students.find((studentRow) => studentRow.id === decodedStudentId);
        if (!attendance) return [];
        const justification = justifications[`${decodedStudentId}::${call.id}`] ?? null;

        return [
          {
            callId: call.id,
            dateIso: call.createdAt,
            module: call.module,
            moduleVariant: student?.moduleVariant ?? "violet",
            classroom: call.classroom,
            classroomVariant: student?.classroomVariant ?? "blue",
            status: justification?.status ?? attendance.attendance,
            note: justification?.note || attendance.note || "-",
            hasJustification: Boolean(justification),
          },
        ];
      });

    const sourceRows =
      registryRows.length > 0 ? registryRows : decodedStudentId === ANA_CLARA_EMAIL ? ANA_CLARA_HISTORY_MOCK : [];

    return sourceRows
      .map((row) => {
        const justification = justifications[`${decodedStudentId}::${row.callId}`] ?? null;
        if (!justification) return row;

        return {
          ...row,
          status: justification.status,
          note: justification.note || row.note,
          hasJustification: true,
          dateIso: justification.dateIso ?? row.dateIso,
        };
      })
      .filter((row) => {
        const matchesDate = selectedDate ? row.dateIso.startsWith(selectedDate) : true;
        const matchesStatus = selectedStatus ? row.status === selectedStatus : true;
        return matchesDate && matchesStatus;
      })
      .sort((a, b) => new Date(b.dateIso).getTime() - new Date(a.dateIso).getTime());
  }, [
    attendanceCalls,
    decodedStudentId,
    justificationVersion,
    selectedDate,
    selectedStatus,
    student?.classroomVariant,
    student?.moduleVariant,
  ]);

  const columns = useMemo<TableCardColumn<StudentAttendanceHistoryRow>[]>(
    () => [
      {
        id: "date",
        header: "Data",
        sortable: true,
        sortValue: (row) => row.dateIso,
        render: (row) => formatDate(row.dateIso),
      },
      {
        id: "status",
        header: "Status",
        sortable: true,
        sortValue: (row) => ATTENDANCE_STATUS_LABEL[row.status],
        render: (row) => <Badge variant={ATTENDANCE_STATUS_VARIANT[row.status]}>{ATTENDANCE_STATUS_LABEL[row.status]}</Badge>,
      },
      {
        id: "note",
        header: "Observação",
        key: "note",
      },
      {
        id: "action",
        header: "Ação",
        render: (row) =>
          row.status === "absent" || row.hasJustification ? (
            <Button
              className={row.hasJustification ? "text-[var(--content-tertiary)] hover:text-[var(--content-secondary)]" : undefined}
              icon={MessageCircle}
              onClick={() =>
                router.push(
                  `/students/${encodeURIComponent(decodedStudentId)}/attendance-history/${encodeURIComponent(row.callId)}/justification`,
                )
              }
              variant="ghost"
            >
              {row.hasJustification ? "Editar justificativa" : "Adicionar justificativa"}
            </Button>
          ) : (
            "-"
          ),
      },
    ],
    [decodedStudentId, router],
  );

  return (
    <section className="space-y-6">
      <header className="grid gap-4">
        <Button className="w-fit" icon={ChevronLeft} onClick={() => router.back()} variant="ghost">
          Voltar
        </Button>

        <div className="grid gap-1">
          <h1 className="[font-size:var(--typography-body-x-large-semibold-font-size)] [line-height:var(--typography-body-x-large-semibold-line-height)] [font-weight:var(--typography-body-x-large-semibold-font-weight)] [letter-spacing:var(--typography-body-x-large-semibold-letter-spacing)] text-[var(--content-primary)]">
            Histórico de frequência
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-[var(--content-secondary)]">
            <span>{student?.name ?? "Estudante não encontrado"}</span>
            {student ? (
              <>
                <Badge variant={student.moduleVariant}>{student.module}</Badge>
                <Badge variant={student.classroomVariant}>{student.classroom}</Badge>
              </>
            ) : null}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <DatePicker onValueChange={(isoValue) => setSelectedDate(isoValue)} value={selectedDate ?? ""} />

          <SelectField
            aria-label="Filtrar status de frequência"
            onValueChange={setSelectedStatus}
            options={[
              { label: "Presente", value: "present" },
              { label: "Ausente", value: "absent" },
              { label: "Justificado", value: "excused" },
            ]}
            placeholder="Status de frequência"
            value={selectedStatus}
            variant="without-label"
          />
        </div>
      </header>

      <TableCard
        ariaLabel="Histórico de frequência do aluno"
        columns={columns}
        emptyMessage="Nenhum registro de frequência encontrado para os filtros selecionados."
        rowKey={(row) => `${row.callId}-${row.dateIso}`}
        rows={rows}
        title="Registros"
      />
    </section>
  );
}
