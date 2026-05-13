"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchInput } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { SelectField } from "@/components/ui/select-field";
import { TableCard } from "@/components/ui/table-card";
import { STUDENT_ROWS } from "./_data/students.mock";
import {
  STUDENT_CLASSROOM_OPTIONS,
  STUDENT_FILTERS_DEFAULT_VALUE,
  STUDENT_MODULE_OPTIONS,
  STUDENT_STATUS_OPTIONS,
  toSelectFieldOptions,
} from "./_config/students-filter-options";
import { getStudentsTableColumns } from "./_config/students-table-columns";
import type { StudentFilters } from "./_types/students.types";
import { filterStudents } from "./_utils/students-filters";

export default function StudentsPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<StudentFilters>(STUDENT_FILTERS_DEFAULT_VALUE);

  const filteredRows = useMemo(
    () => filterStudents(STUDENT_ROWS, filters, search),
    [filters, search],
  );
  const tableColumns = useMemo(
    () =>
      getStudentsTableColumns({
        onNameClick: (row) => router.push(`/students/${encodeURIComponent(row.email)}`),
      }),
    [router],
  );

  return (
    <section className="space-y-6">
      <PageHeader
        ctaLabel="Adicionar aluno"
        ctaOnClick={() => router.push("/students/new")}
        subtitle="Gerencie o cadastro completo de alunos."
        title="Alunos"
      />

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
        <div className="w-full min-w-0">
          <SearchInput
            aria-label="Buscar alunos"
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="Buscar aluno, turma, matrícula..."
            value={search}
          />
        </div>

        <div className="grid w-full min-w-0 grid-cols-1 gap-2 sm:grid-cols-3">
          <SelectField
            aria-label="Filtrar por status"
            onValueChange={(status) =>
              setFilters((current) => ({ ...current, status: status as StudentFilters["status"] }))
            }
            options={toSelectFieldOptions(STUDENT_STATUS_OPTIONS)}
            placeholder="Selecione um status"
            value={filters.status}
            variant="without-label"
          />

          <SelectField
            aria-label="Filtrar por módulo"
            onValueChange={(module) =>
              setFilters((current) => ({ ...current, module: module as StudentFilters["module"] }))
            }
            options={toSelectFieldOptions(STUDENT_MODULE_OPTIONS)}
            placeholder="Selecione um módulo"
            value={filters.module}
            variant="without-label"
          />

          <SelectField
            aria-label="Filtrar por turma"
            onValueChange={(classroom) =>
              setFilters((current) => ({ ...current, classroom: classroom as StudentFilters["classroom"] }))
            }
            options={toSelectFieldOptions(STUDENT_CLASSROOM_OPTIONS)}
            placeholder="Selecione uma turma"
            value={filters.classroom}
            variant="without-label"
          />
        </div>
      </div>

      <div className="pt-3">
        <TableCard
          ariaLabel="Tabela de alunos"
          columns={tableColumns}
          emptyMessage="Nenhum aluno encontrado para os filtros selecionados."
          rowKey={(row) => row.email}
          rows={filteredRows}
          selectableRows
          title="Alunos"
          titleBadge={`${filteredRows.length} alunos`}
        />
      </div>
    </section>
  );
}
