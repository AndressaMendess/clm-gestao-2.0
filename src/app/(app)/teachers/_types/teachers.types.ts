export type TeacherStatusFilter = "active" | "inactive" | "locked";
export type TeacherSpecialtyFilter = "teoria-musical" | "violino" | "trompete" | "canto-coral";

export type TeacherFilters = {
  specialty: TeacherSpecialtyFilter | "";
  status: TeacherStatusFilter | "";
};

export type TeacherRow = {
  avatarSrc?: string;
  email: string;
  initials: string;
  name: string;
  phone: string;
  specialty: string;
  specialtyFilter: TeacherSpecialtyFilter;
  specialtyVariant: "blue" | "pink" | "violet" | "orange";
  status: string;
  statusFilter: TeacherStatusFilter;
};
