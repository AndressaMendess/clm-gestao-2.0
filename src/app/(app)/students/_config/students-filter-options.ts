import type { SelectFieldOption } from "@/components/ui/select-field";
import type { StudentFilters } from "../_types/students.types";

export const STUDENT_STATUS_OPTIONS = [
  { label: "Ativo", value: "active" },
  { label: "Inativo", value: "inactive" },
  { label: "Trancamento", value: "locked" },
] as const;

export const STUDENT_MODULE_OPTIONS = [
  { label: "Módulo I", value: "module-i" },
  { label: "Módulo II", value: "module-ii" },
  { label: "Módulo III", value: "module-iii" },
] as const;

export const STUDENT_CLASSROOM_OPTIONS = [
  { label: "Teoria musical", value: "teoria-musical" },
  { label: "Solfejo", value: "solfejo" },
  { label: "Violino", value: "violino" },
  { label: "Trompete", value: "trompete" },
  { label: "Clarinete", value: "clarinete" },
  { label: "Trompa", value: "trompa" },
  { label: "Saxofone", value: "saxofone" },
  { label: "Teclado", value: "teclado" },
  { label: "Violoncelo", value: "violoncelo" },
  { label: "Flauta", value: "flauta" },
  { label: "Trombone", value: "trombone" },
  { label: "Guitarra", value: "guitarra" },
  { label: "Violão", value: "violao" },
  { label: "Contrabaixo", value: "contrabaixo" },
] as const;

export const STUDENT_ATTENDANCE_STATUS_OPTIONS = [
  { label: "Presente", value: "present" },
  { label: "Ausente", value: "absent" },
  { label: "Justificado", value: "excused" },
] as const;

export const STUDENT_FILTERS_DEFAULT_VALUE: StudentFilters = {
  classroom: "",
  module: "",
  status: "",
};

export function toSelectFieldOptions<T extends readonly { label: string; value: string }[]>(
  options: T,
): SelectFieldOption[] {
  return options.map((option) => ({ label: option.label, value: option.value }));
}
