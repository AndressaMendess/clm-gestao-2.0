import type { SelectFieldOption } from "@/components/ui/select-field";
import type { TeacherFilters } from "../teachers/_types/teachers.types";
import type { StudentFilters } from "../students/_types/students.types";

export const STATUS_OPTIONS = [
  { label: "Ativo", value: "active" },
  { label: "Inativo", value: "inactive" },
  { label: "Trancamento", value: "locked" },
  { label: "Concluído", value: "completed" },
] as const;

export const MODULE_OPTIONS = [
  { label: "Módulo I", value: "module-i" },
  { label: "Módulo II", value: "module-ii" },
  { label: "Módulo III", value: "module-iii" },
] as const;

export const CLASSROOM_OPTIONS = [
  { label: "Classe 1", value: "classe-1" },
  { label: "Classe 2", value: "classe-2" },
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
  { label: "Canto coral", value: "canto-coral" },
] as const;

export const ATTENDANCE_STATUS_OPTIONS = [
  { label: "Presente", value: "present" },
  { label: "Ausente", value: "absent" },
  { label: "Justificado", value: "excused" },
] as const;

export const COMPLEMENTARY_ACTIVITY_STATUS_OPTIONS = [
  { label: "Pendente", value: "pending" },
  { label: "Concluído", value: "completed" },
  { label: "Reprovado", value: "failed" },
] as const;

export const COMPLEMENTARY_ACTIVITY_MODULE_OPTIONS = MODULE_OPTIONS;

export const COMPLEMENTARY_ACTIVITY_TERM_OPTIONS = [
  { label: "1º trimestre", value: "term-1" },
  { label: "2º trimestre", value: "term-2" },
  { label: "3º trimestre", value: "term-3" },
] as const;

export const TEACHER_STATUS_OPTIONS = [
  { label: "Ativo", value: "active" },
  { label: "Inativo", value: "inactive" },
] as const;
export const TEACHER_SPECIALTY_OPTIONS = CLASSROOM_OPTIONS;

export const STUDENT_STATUS_OPTIONS = STATUS_OPTIONS;
export const STUDENT_MODULE_OPTIONS = MODULE_OPTIONS;
export const STUDENT_CLASSROOM_OPTIONS = CLASSROOM_OPTIONS;
export const STUDENT_ATTENDANCE_STATUS_OPTIONS = ATTENDANCE_STATUS_OPTIONS;

export const CLASSROOM_VALUES_BY_MODULE = {
  "module-i": ["classe-1", "classe-2"],
  "module-ii": [
    "teoria-musical",
    "solfejo",
    "violino",
    "trompete",
    "clarinete",
    "trompa",
    "saxofone",
    "teclado",
    "violoncelo",
    "flauta",
    "trombone",
    "guitarra",
    "violao",
    "contrabaixo",
    "canto-coral",
  ],
  "module-iii": [
    "teoria-musical",
    "solfejo",
    "violino",
    "trompete",
    "clarinete",
    "trompa",
    "saxofone",
    "teclado",
    "violoncelo",
    "flauta",
    "trombone",
    "guitarra",
    "violao",
    "contrabaixo",
    "canto-coral",
  ],
} as const;

export const TEACHER_FILTERS_DEFAULT_VALUE: TeacherFilters = {
  specialty: "",
  status: "",
};

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

export function getClassroomOptionsByModule(moduleValue: string) {
  const allowedClassrooms =
    (CLASSROOM_VALUES_BY_MODULE[moduleValue as keyof typeof CLASSROOM_VALUES_BY_MODULE] ??
      []) as readonly string[];
  return CLASSROOM_OPTIONS.filter((option) => allowedClassrooms.includes(option.value));
}
