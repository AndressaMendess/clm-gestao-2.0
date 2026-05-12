export type StudentStatusFilter = "active" | "inactive" | "locked";
export type StudentModuleFilter = "module-i" | "module-ii" | "module-iii";
export type StudentClassroomFilter =
  | "teoria-musical"
  | "solfejo"
  | "violino"
  | "trompete"
  | "clarinete"
  | "trompa"
  | "saxofone"
  | "teclado"
  | "violoncelo"
  | "flauta"
  | "trombone"
  | "guitarra"
  | "violao"
  | "contrabaixo";

export type StudentAttendanceStatusFilter = "present" | "absent" | "excused";

export type StudentFilters = {
  classroom: StudentClassroomFilter | "";
  module: StudentModuleFilter | "";
  status: StudentStatusFilter | "";
};

export type StudentRow = {
  avatarSrc?: string;
  classroom: string;
  classroomFilter: StudentClassroomFilter;
  classroomVariant: "blue" | "pink";
  email: string;
  initials: string;
  module: string;
  moduleFilter: StudentModuleFilter;
  moduleVariant: "orange" | "violet";
  name: string;
  phone: string;
  status: string;
  statusFilter: StudentStatusFilter;
};
