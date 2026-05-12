import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { TableCardColumn } from "@/components/ui/table-card";
import type { StudentRow } from "../_types/students.types";

export const STUDENTS_TABLE_COLUMNS: TableCardColumn<StudentRow>[] = [
  {
    header: "Nome",
    id: "name",
    key: "name",
    render: (row) => (
      <div className="flex items-center gap-3">
        <Avatar
          alt={`Avatar de ${row.name}`}
          initials={row.initials}
          name={row.name}
          src={row.avatarSrc}
          variant={row.avatarSrc ? "with-image" : "without-image"}
        />
        <span className="[font-size:var(--typography-body-medium-semibold-font-size)] [line-height:var(--typography-body-medium-semibold-line-height)] [font-weight:var(--typography-body-medium-semibold-font-weight)] [letter-spacing:var(--typography-body-medium-semibold-letter-spacing)] text-[var(--content-primary)]">
          {row.name}
        </span>
      </div>
    ),
    sortable: true,
  },
  {
    header: "Status",
    id: "status",
    key: "status",
    render: (row) => (
      <Badge
        appearance="dot"
        variant={
          row.statusFilter === "active"
            ? "success"
            : row.statusFilter === "inactive"
              ? "subtle"
              : "warning"
        }
      >
        {row.status}
      </Badge>
    ),
    sortable: true,
  },
  {
    header: "Contato",
    id: "contact",
    key: "phone",
    render: (row) => (
      <div className="grid gap-0.5">
        <span>{row.phone}</span>
        <span className="text-[var(--content-secondary)]">{row.email}</span>
      </div>
    ),
  },
  {
    header: "Módulo",
    id: "module",
    key: "module",
    render: (row) => <Badge variant={row.moduleVariant}>{row.module}</Badge>,
    sortable: true,
  },
  {
    header: "Turma",
    id: "classroom",
    key: "classroom",
    render: (row) => <Badge variant={row.classroomVariant}>{row.classroom}</Badge>,
    sortable: true,
  },
];
