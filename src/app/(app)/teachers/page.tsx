"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchInput } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { SelectField } from "@/components/ui/select-field";
import { TableCard } from "@/components/ui/table-card";
import {
  TEACHER_FILTERS_DEFAULT_VALUE,
  TEACHER_SPECIALTY_OPTIONS,
  TEACHER_STATUS_OPTIONS,
  toSelectFieldOptions,
} from "../_config/filters";
import { getTeachersTableColumns } from "./_config/teachers-table-columns";
import { getTeacherRowsFromRegistry } from "./_data/teachers-registry";
import type { TeacherFilters } from "./_types/teachers.types";
import { filterTeachers } from "./_utils/teachers-filters";

export default function TeachersPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<TeacherFilters>(TEACHER_FILTERS_DEFAULT_VALUE);
  const [teacherRows, setTeacherRows] = useState(() => getTeacherRowsFromRegistry());

  useEffect(() => {
    setTeacherRows(getTeacherRowsFromRegistry());
  }, []);

  const filteredRows = useMemo(
    () => filterTeachers(teacherRows, filters, search),
    [filters, search, teacherRows],
  );

  const tableColumns = useMemo(
    () =>
      getTeachersTableColumns({
        onNameClick: (row) => router.push(`/teachers/${encodeURIComponent(row.email)}`),
      }),
    [router],
  );

  return (
    <section className="space-y-6">
      <PageHeader
        ctaLabel="Adicionar professor"
        ctaVariant="ghost"
        subtitle="Gerencie o cadastro e os dados da equipe docente."
        title="Professores"
      />

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
        <div className="w-full min-w-0">
          <SearchInput
            aria-label="Buscar professores"
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="Buscar professor, especialidade, contato..."
            value={search}
          />
        </div>

        <div className="grid w-full min-w-0 grid-cols-1 gap-2 sm:grid-cols-2">
          <SelectField
            aria-label="Filtrar por status"
            onValueChange={(status) =>
              setFilters((current) => ({ ...current, status: status as TeacherFilters["status"] }))
            }
            options={toSelectFieldOptions(TEACHER_STATUS_OPTIONS)}
            placeholder="Selecione um status"
            value={filters.status}
            variant="without-label"
          />

          <SelectField
            aria-label="Filtrar por especialidade"
            onValueChange={(specialty) =>
              setFilters((current) => ({ ...current, specialty: specialty as TeacherFilters["specialty"] }))
            }
            options={toSelectFieldOptions(TEACHER_SPECIALTY_OPTIONS)}
            placeholder="Selecione uma especialidade"
            value={filters.specialty}
            variant="without-label"
          />
        </div>
      </div>

      <div className="pt-3">
        <TableCard
          ariaLabel="Tabela de professores"
          columns={tableColumns}
          emptyMessage="Nenhum professor encontrado para os filtros selecionados."
          rowKey={(row) => row.email}
          rows={filteredRows}
          selectableRows
          title="Professores"
          titleBadge={`${filteredRows.length} professores`}
        />
      </div>
    </section>
  );
}


