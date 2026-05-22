import type { StudentClassroomFilter } from "@/app/(app)/students/_types/students.types";

export type TeacherStatusFilter = "active" | "inactive";
export type TeacherSpecialtyFilter = StudentClassroomFilter;

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
