import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "../badge";
import { TableCard } from "./index";

type StudentRow = {
  classroom: string;
  classroomVariant: "blue" | "pink";
  email: string;
  id: string;
  initials: string;
  module: string;
  moduleVariant: "orange" | "violet";
  name: string;
  phone: string;
  status: "Ativo" | "Trancamento";
};

const rows: StudentRow[] = [
  {
    id: "1",
    initials: "TL",
    name: "Thiago Fernandes Luz",
    status: "Ativo",
    phone: "(11) 90987-9900",
    email: "thiago.luz@email.com",
    module: "Módulo II",
    moduleVariant: "orange",
    classroom: "Percussão",
    classroomVariant: "blue",
  },
  {
    id: "2",
    initials: "SO",
    name: "Sofia Barbosa Oliveira",
    status: "Ativo",
    phone: "(11) 91098-8890",
    email: "sofia.oliveira@email.com",
    module: "Módulo I",
    moduleVariant: "violet",
    classroom: "Classe 2",
    classroomVariant: "pink",
  },
  {
    id: "3",
    initials: "RP",
    name: "Rafael Teixeira Pinto",
    status: "Trancamento",
    phone: "(11) 91109-7788",
    email: "rafael.pinto@email.com",
    module: "Módulo II",
    moduleVariant: "orange",
    classroom: "Teclado",
    classroomVariant: "pink",
  },
];

const meta = {
  title: "Components/UI/TableCard",
  component: TableCard<StudentRow>,
  parameters: { layout: "padded" },
  args: {
    ariaLabel: "Tabela de alunos",
    selectableRows: true,
    title: "Alunos",
    titleBadge: "18 alunos",
    columns: [
      {
        id: "name",
        header: "Nome",
        key: "name",
        sortable: true,
        render: (row) => (
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent-purple-background-primary)] text-[var(--content-primary)] [font-size:var(--typography-body-large-medium-font-size)] [font-weight:var(--typography-body-large-medium-font-weight)]">
              {row.initials}
            </span>
            <span className="[font-size:var(--typography-body-large-semibold-font-size)] [line-height:var(--typography-body-large-semibold-line-height)] [font-weight:var(--typography-body-large-semibold-font-weight)] [letter-spacing:var(--typography-body-large-semibold-letter-spacing)] text-[var(--content-primary)]">
              {row.name}
            </span>
          </div>
        ),
      },
      {
        id: "status",
        header: "Status",
        key: "status",
        sortable: true,
        render: (row) => (
          <Badge appearance="dot" variant={row.status === "Ativo" ? "success" : "warning"}>
            {row.status}
          </Badge>
        ),
      },
      {
        id: "contact",
        header: "Contato",
        key: "phone",
        render: (row) => (
          <div className="grid gap-0.5">
            <span>{row.phone}</span>
            <span className="text-[var(--content-secondary)]">{row.email}</span>
          </div>
        ),
      },
      {
        id: "module",
        header: "Módulo",
        key: "module",
        sortable: true,
        render: (row) => <Badge variant={row.moduleVariant}>{row.module}</Badge>,
      },
      {
        id: "turma",
        header: "Turma",
        key: "classroom",
        sortable: true,
        render: (row) => <Badge variant={row.classroomVariant}>{row.classroom}</Badge>,
      },
    ],
    rows,
  },
} satisfies Meta<typeof TableCard<StudentRow>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    rows: [],
    emptyMessage: "Nenhum aluno cadastrado.",
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    rows: [],
  },
};

/** Linhas no formato de API genérica com campo aninhado, `sortValue` e `rowKey` por propriedade. */
export const DynamicRows: Story = {
  render: () => (
    <TableCard<Record<string, unknown>>
      ariaLabel="Tabela de registros"
      columns={[
        {
          id: "titulo",
          header: "Título",
          key: "titulo",
          sortable: true,
        },
        {
          id: "valor",
          header: "Valor (R$)",
          key: "valor",
          sortable: true,
          render: (row) => {
            const n = row.valor;
            return typeof n === "number"
              ? n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
              : "-";
          },
          sortValue: (row) => (typeof row.valor === "number" ? row.valor : 0),
        },
        {
          id: "ativo",
          header: "Ativo",
          key: "ativo",
          sortable: true,
        },
        {
          id: "inicio",
          header: "Início",
          accessor: (row) => {
            const p = row.periodo as { inicio?: string } | undefined;
            return p?.inicio;
          },
          sortable: true,
          sortValue: (row) => {
            const p = row.periodo as { inicio?: string } | undefined;
            return p?.inicio ?? "";
          },
          render: (row) => {
            const p = row.periodo as { inicio?: string } | undefined;
            return p?.inicio ? new Date(p.inicio).toLocaleDateString("pt-BR") : "-";
          },
          hideOnMobile: true,
        },
      ]}
      rowKey="id"
      rows={[
        {
          id: "r1",
          titulo: "Contrato alpha",
          valor: 1500.5,
          ativo: true,
          periodo: { inicio: "2024-01-10", fim: "2024-06-01" },
        },
        {
          id: "r2",
          titulo: "Contrato beta",
          valor: 820,
          ativo: false,
          periodo: { inicio: "2023-12-01", fim: "2024-12-31" },
        },
        {
          id: "r3",
          titulo: "Contrato gama",
          valor: 2100,
          ativo: true,
          periodo: { inicio: "2024-03-15", fim: "2025-03-15" },
        },
      ]}
      title="Registros dinâmicos"
    />
  ),
};
