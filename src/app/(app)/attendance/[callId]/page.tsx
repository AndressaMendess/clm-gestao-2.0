"use client";

import { ArrowLeft, MessageCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, IconButton } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TextArea } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { TableCard } from "@/components/ui/table-card";
import type { TableCardColumn } from "@/components/ui/table-card";
import { getStudentRowsFromRegistry } from "../../students/_data/students-registry";
import { upsertAttendanceCall, type AttendanceStatus } from "../_data/attendance-registry";

type AttendanceTableRow = {
  checked: boolean;
  checkedAt: string;
  id: string;
  module: string;
  moduleVariant: "orange" | "violet";
  name: string;
  note: string;
};

const CURRENT_USER_NAME = "Andressa Mendes";

function humanizeFilterValue(filterValue: string) {
  return filterValue
    .split("-")
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");
}

function getCurrentDateWeekdayLabel() {
  const date = new Date();
  const dateLabel = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
  const weekdayLabel = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
  }).format(date);

  return `${dateLabel} - ${weekdayLabel}`;
}

function getCurrentTimeLabel() {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

export default function AttendanceCallPage() {
  const params = useParams<{ callId: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const moduleFilter = searchParams.get("module") ?? "";
  const classroomFilter = searchParams.get("classroom") ?? "";
  const moduleLabel = moduleFilter ? humanizeFilterValue(moduleFilter).replace("Module", "Módulo") : "Módulo";
  const classroomLabel = classroomFilter ? humanizeFilterValue(classroomFilter) : "Turma";

  const initialRows = useMemo<AttendanceTableRow[]>(() => {
    const rows = getStudentRowsFromRegistry();
    return rows
      .filter((row) => {
        const matchesModule = moduleFilter ? row.moduleFilter === moduleFilter : true;
        const matchesClassroom = classroomFilter ? row.classroomFilter === classroomFilter : true;
        return matchesModule && matchesClassroom;
      })
      .map((row) => ({
        id: row.email,
        name: row.name,
        module: row.module,
        moduleVariant: row.moduleVariant,
        checked: false,
        checkedAt: "",
        note: "",
      }));
  }, [classroomFilter, moduleFilter]);

  const [attendanceRows, setAttendanceRows] = useState<AttendanceTableRow[]>(initialRows);
  const [openNoteByRowId, setOpenNoteByRowId] = useState<string | null>(null);
  const activeNoteRow = useMemo(
    () => attendanceRows.find((row) => row.id === openNoteByRowId) ?? null,
    [attendanceRows, openNoteByRowId],
  );

  const presentCount = useMemo(
    () => attendanceRows.filter((row) => row.checked).length,
    [attendanceRows],
  );
  const notRegisteredCount = attendanceRows.length - presentCount;

  const handleToggleAttendance = (studentId: string) => {
    setAttendanceRows((current) =>
      current.map((row) => {
        if (row.id !== studentId) return row;
        const nextChecked = !row.checked;
        return {
          ...row,
          checked: nextChecked,
          checkedAt: nextChecked ? getCurrentTimeLabel() : "",
        };
      }),
    );
  };

  const handleChangeNote = (studentId: string, note: string) => {
    setAttendanceRows((current) =>
      current.map((row) => (row.id === studentId ? { ...row, note } : row)),
    );
  };

  const columns = useMemo<TableCardColumn<AttendanceTableRow>[]>(
    () => [
      {
        id: "status",
        header: "Status",
        align: "center",
        width: "96px",
        render: (row) => (
          <div className="flex justify-start md:justify-center">
            <Checkbox
              aria-label={`Marcar presença de ${row.name}`}
              checked={row.checked}
              onChange={() => handleToggleAttendance(row.id)}
              size="lg"
              variant="success"
            />
          </div>
        ),
      },
      {
        id: "name",
        header: "Nome",
        render: (row) => (
          <div className="inline-flex items-center gap-3">
            <Avatar name={row.name} size="md" />
            <span className="text-[var(--content-primary)] [font-size:var(--typography-body-large-medium-font-size)] [line-height:var(--typography-body-large-medium-line-height)] [font-weight:var(--typography-body-large-medium-font-weight)] [letter-spacing:var(--typography-body-large-medium-letter-spacing)]">
              {row.name}
            </span>
          </div>
        ),
      },
      {
        id: "module",
        header: "Módulo",
        render: (row) => <Badge variant={row.moduleVariant}>{row.module}</Badge>,
      },
      {
        id: "time",
        header: "Horário",
        accessor: (row) => row.checkedAt || "-",
      },
      {
        id: "note",
        header: "Observação",
        width: "320px",
        render: (row) => {
          return (
            <IconButton
              icon={MessageCircle}
              label={`Adicionar observação para ${row.name}`}
              onClick={() => setOpenNoteByRowId((current) => (current === row.id ? null : row.id))}
            />
          );
        },
      },
    ],
    [openNoteByRowId],
  );

  const handleFinalizeCall = () => {
    const students = attendanceRows.map((row) => ({
      id: row.id,
      name: row.name,
      attendance: (row.checked ? "present" : "absent") as AttendanceStatus,
      checkedAt: row.checkedAt || undefined,
      note: row.note || undefined,
    }));

    upsertAttendanceCall({
      id: params.callId,
      module: moduleLabel,
      moduleFilter: moduleFilter || "module-i",
      classroom: classroomLabel,
      classroomFilter: classroomFilter || "teoria-musical",
      createdAt: new Date().toISOString(),
      userName: CURRENT_USER_NAME,
      students,
    });

    router.push("/attendance");
  };

  return (
    <section className="grid gap-4">
      <Button className="justify-self-start" icon={ArrowLeft} onClick={() => router.back()} variant="ghost">
        Voltar
      </Button>
      <PageHeader subtitle={getCurrentDateWeekdayLabel()} title={`${moduleLabel} - ${classroomLabel}`} />

      <>
        <div className="mb-3 flex flex-wrap items-center gap-8 px-1">
          <span className="inline-flex items-center gap-2 text-[var(--content-primary)] [font-size:var(--typography-body-large-medium-font-size)] [line-height:var(--typography-body-large-medium-line-height)] [font-weight:var(--typography-body-large-medium-font-weight)] [letter-spacing:var(--typography-body-large-medium-letter-spacing)]">
            <span aria-hidden className="h-3 w-3 rounded-full bg-[var(--accent-green-content)]" />
            <strong className="[font-size:var(--typography-body-large-semibold-font-size)] [line-height:var(--typography-body-large-semibold-line-height)] [font-weight:var(--typography-body-large-semibold-font-weight)] [letter-spacing:var(--typography-body-large-semibold-letter-spacing)]">
              {presentCount}
            </strong>
            <span>presentes</span>
          </span>

          <span className="inline-flex items-center gap-2 text-[var(--content-primary)] [font-size:var(--typography-body-large-medium-font-size)] [line-height:var(--typography-body-large-medium-line-height)] [font-weight:var(--typography-body-large-medium-font-weight)] [letter-spacing:var(--typography-body-large-medium-letter-spacing)]">
            <span aria-hidden className="h-3 w-3 rounded-full bg-[var(--content-tertiary)]" />
            <strong className="[font-size:var(--typography-body-large-semibold-font-size)] [line-height:var(--typography-body-large-semibold-line-height)] [font-weight:var(--typography-body-large-semibold-font-weight)] [letter-spacing:var(--typography-body-large-semibold-letter-spacing)]">
              {notRegisteredCount}
            </strong>
            <span>não registrados</span>
          </span>
        </div>

        <TableCard
          ariaLabel="Tabela de chamada"
          columns={columns}
          emptyMessage="Nenhum aluno encontrado para os filtros selecionados."
          rowKey={(row) => row.id}
          rows={attendanceRows}
        />
      </>

      {activeNoteRow ? (
        <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--background-primary)] p-4">
          <TextArea
            aria-label={`Observação do aluno ${activeNoteRow.name}`}
            className="min-h-24"
            label={`Observação • ${activeNoteRow.name}`}
            onChange={(event) => handleChangeNote(activeNoteRow.id, event.currentTarget.value)}
            placeholder="Adicionar observação"
            value={activeNoteRow.note}
          />
        </div>
      ) : null}

      <div className="flex justify-end">
        <Button onClick={handleFinalizeCall}>Finalizar chamada</Button>
      </div>
    </section>
  );
}
