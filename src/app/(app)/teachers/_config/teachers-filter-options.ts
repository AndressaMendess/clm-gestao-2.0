import type { SelectFieldOption } from "@/components/ui/select-field";
import type { TeacherFilters } from "../_types/teachers.types";

export const TEACHER_STATUS_OPTIONS = [
  { label: "Ativo", value: "active" },
  { label: "Inativo", value: "inactive" },
  { label: "Trancamento", value: "locked" },
] as const;

export const TEACHER_SPECIALTY_OPTIONS = [
  { label: "Teoria Musical", value: "teoria-musical" },
  { label: "Violino", value: "violino" },
  { label: "Trompete", value: "trompete" },
  { label: "Canto Coral", value: "canto-coral" },
] as const;

export const TEACHER_FILTERS_DEFAULT_VALUE: TeacherFilters = {
  specialty: "",
  status: "",
};

export function toSelectFieldOptions<T extends readonly { label: string; value: string }[]>(
  options: T,
): SelectFieldOption[] {
  return options.map((option) => ({ label: option.label, value: option.value }));
}
