"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { BadgeVariant } from "@/components/ui/badge";
import { SearchInput } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { SelectField } from "@/components/ui/select-field";
import { TableCard } from "@/components/ui/table-card";
import type { TableCardColumn } from "@/components/ui/table-card";
import {
  COMPLEMENTARY_ACTIVITY_MODULE_OPTIONS,
  COMPLEMENTARY_ACTIVITY_STATUS_OPTIONS,
  COMPLEMENTARY_ACTIVITY_TERM_OPTIONS,
  toSelectFieldOptions,
} from "./_config/complementary-activities-filter-options";
import {
  getComplementaryActivitiesRepository,
} from "./_data/complementary-activities-service";
import type {
  ComplementaryActivityRecord,
  ComplementaryActivityStatus,
} from "./_data/complementary-activities.types";

const MODULE_BADGE_VARIANT: Record<ComplementaryActivityRecord["moduleValue"], BadgeVariant> = {
  "module-i": "violet",
  "module-ii": "orange",
  "module-iii": "blue",
};

const STATUS_BADGE_VARIANT: Record<ComplementaryActivityStatus, BadgeVariant> = {
  pending: "warning",
  completed: "success",
  failed: "error",
};

function formatDateLabel(date: string | null, status: ComplementaryActivityStatus) {
  if (status === "pending" || !date) return "-";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export default function ComplementaryActivitiesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [moduleFilter, setModuleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [termFilter, setTermFilter] = useState("");
  const [rows, setRows] = useState<ComplementaryActivityRecord[]>([]);
  const [isLoadingRows, setIsLoadingRows] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    const repository = getComplementaryActivitiesRepository();
    void repository
      .list()
      .then((records) => {
        if (!isActive) return;
        setRows(records);
      })
      .catch(() => {
        if (!isActive) return;
        setLoadError("Não foi possível carregar as atividades complementares.");
      })
      .finally(() => {
        if (!isActive) return;
        setIsLoadingRows(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  const filteredRows = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase();
    return rows.filter((row) => {
      const matchesSearch = normalizedSearch
        ? row.studentName.toLocaleLowerCase().includes(normalizedSearch) ||
          (row.eventName ?? "").toLocaleLowerCase().includes(normalizedSearch)
        : true;
      const matchesModule = moduleFilter ? row.moduleValue === moduleFilter : true;
      const matchesStatus = statusFilter ? row.statusValue === statusFilter : true;
      const matchesTerm = termFilter ? row.termValue === termFilter : true;
      return matchesSearch && matchesModule && matchesStatus && matchesTerm;
    });
  }, [moduleFilter, rows, search, statusFilter, termFilter]);

  const tableColumns = useMemo<TableCardColumn<ComplementaryActivityRecord>[]>(
    () => [
      {
        header: "Aluno",
        id: "student",
        key: "studentName",
        sortable: true,
        render: (row) => (
          <div className="flex items-center gap-3">
            <Avatar initials={row.studentInitials} name={row.studentName} size="sm" variant="without-image" />
            <span className="text-[var(--content-primary)] [font-size:var(--typography-body-medium-semibold-font-size)] [line-height:var(--typography-body-medium-semibold-line-height)] [font-weight:var(--typography-body-medium-semibold-font-weight)] [letter-spacing:var(--typography-body-medium-semibold-letter-spacing)]">
              {row.studentName}
            </span>
          </div>
        ),
      },
      {
        header: "Módulo",
        id: "module",
        key: "moduleLabel",
        sortable: true,
        render: (row) => <Badge variant={MODULE_BADGE_VARIANT[row.moduleValue]}>{row.moduleLabel}</Badge>,
      },
      {
        header: "Evento",
        id: "event",
        key: "eventName",
        sortable: true,
        render: (row) => (row.statusValue === "pending" ? "-" : row.eventName ?? "-"),
      },
      {
        header: "Data",
        id: "date",
        key: "eventDate",
        sortable: true,
        render: (row) => formatDateLabel(row.eventDate, row.statusValue),
      },
      {
        header: "Status",
        id: "status",
        key: "statusLabel",
        sortable: true,
        render: (row) => (
          <Badge appearance="dot" variant={STATUS_BADGE_VARIANT[row.statusValue]}>
            {row.statusLabel}
          </Badge>
        ),
      },
    ],
    [],
  );

  return (
    <section className="space-y-6">
      <PageHeader
        ctaLabel="Adicionar atividade"
        ctaOnClick={() => router.push("/complementary-activities/new")}
        subtitle="Gerencie registros, prazos e documentação das atividades complementares."
        title="Atividades complementares"
      />

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
        <div className="w-full min-w-0">
          <SearchInput
            aria-label="Buscar atividades complementares"
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="Buscar aluno, atividade, módulo..."
            value={search}
          />
        </div>

        <div className="grid w-full min-w-0 grid-cols-1 gap-2 sm:grid-cols-3">
          <SelectField
            aria-label="Filtrar por módulo"
            onValueChange={setModuleFilter}
            options={toSelectFieldOptions(COMPLEMENTARY_ACTIVITY_MODULE_OPTIONS)}
            placeholder="Selecione um módulo"
            value={moduleFilter}
            variant="without-label"
          />

          <SelectField
            aria-label="Filtrar por status"
            onValueChange={setStatusFilter}
            options={toSelectFieldOptions(COMPLEMENTARY_ACTIVITY_STATUS_OPTIONS)}
            placeholder="Selecione um status"
            value={statusFilter}
            variant="without-label"
          />

          <SelectField
            aria-label="Filtrar por trimestre"
            onValueChange={setTermFilter}
            options={toSelectFieldOptions(COMPLEMENTARY_ACTIVITY_TERM_OPTIONS)}
            placeholder="Selecione um trimestre"
            value={termFilter}
            variant="without-label"
          />
        </div>
      </div>

      <div className="pt-3">
        {loadError ? (
          <p className="pb-2 text-[var(--feedback-error-content)] [font-size:var(--typography-body-small-regular-font-size)]">
            {loadError}
          </p>
        ) : null}
        <TableCard
          ariaLabel="Tabela de atividades complementares"
          columns={tableColumns}
          emptyMessage="Nenhuma atividade complementar encontrada para os filtros selecionados."
          isLoading={isLoadingRows}
          loadingMessage="Carregando atividades complementares..."
          rowKey={(row) => row.id}
          rows={filteredRows}
          title="Atividades complementares"
          titleBadge={`${filteredRows.length} atividades`}
        />
      </div>
    </section>
  );
}
