import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { TableCardColumn } from "@/components/ui/table-card";
import type { TeacherRow } from "../_types/teachers.types";

type TeachersTableColumnsOptions = {
  onNameClick: (row: TeacherRow) => void;
};

export function getTeachersTableColumns({
  onNameClick,
}: TeachersTableColumnsOptions): TableCardColumn<TeacherRow>[] {
  return [
    {
      header: "Nome",
      id: "name",
      key: "name",
      render: (row) => (
        <button
          className="group flex items-center gap-3 rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--button-focus-ring)]"
          onClick={() => onNameClick(row)}
          type="button"
        >
          <Avatar
            alt={`Avatar de ${row.name}`}
            initials={row.initials}
            name={row.name}
            src={row.avatarSrc}
            variant={row.avatarSrc ? "with-image" : "without-image"}
          />
          <span className="[font-size:var(--typography-body-medium-semibold-font-size)] [line-height:var(--typography-body-medium-semibold-line-height)] [font-weight:var(--typography-body-medium-semibold-font-weight)] [letter-spacing:var(--typography-body-medium-semibold-letter-spacing)] text-[var(--content-primary)] transition-colors group-hover:text-[var(--brand-primary-strong)] group-hover:underline">
            {row.name}
          </span>
        </button>
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
      header: "Especialidade",
      id: "specialty",
      key: "specialty",
      render: (row) => <Badge variant={row.specialtyVariant}>{row.specialty}</Badge>,
      sortable: true,
    },
  ];
}
