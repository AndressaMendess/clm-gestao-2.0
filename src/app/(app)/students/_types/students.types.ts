export type StudentStatusFilter = "active" | "inactive" | "locked" | "completed";
export type StudentModuleFilter = "module-i" | "module-ii" | "module-iii";
export type StudentClassroomFilter =
  | "classe-1"
  | "classe-2"
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
  | "contrabaixo"
  | "canto-coral";

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
  classroomFilters?: StudentClassroomFilter[];
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
