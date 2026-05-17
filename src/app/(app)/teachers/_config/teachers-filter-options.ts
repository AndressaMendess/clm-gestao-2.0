import type { SelectFieldOption } from "@/components/ui/select-field";
import { STUDENT_CLASSROOM_OPTIONS } from "@/app/(app)/students/_config/students-filter-options";
import type { TeacherFilters } from "../_types/teachers.types";

export const TEACHER_STATUS_OPTIONS = [
  { label: "Ativo", value: "active" },
  { label: "Inativo", value: "inactive" },
  { label: "Trancamento", value: "locked" },
] as const;

export const TEACHER_SPECIALTY_OPTIONS = STUDENT_CLASSROOM_OPTIONS;

export const TEACHER_FILTERS_DEFAULT_VALUE: TeacherFilters = {
  specialty: "",
  status: "",
};

export function toSelectFieldOptions<T extends readonly { label: string; value: string }[]>(
  options: T,
): SelectFieldOption[] {
  return options.map((option) => ({ label: option.label, value: option.value }));
}
