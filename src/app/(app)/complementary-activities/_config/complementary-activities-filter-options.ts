import type { SelectFieldOption } from "@/components/ui/select-field";

export const COMPLEMENTARY_ACTIVITY_STATUS_OPTIONS = [
  { label: "Pendente", value: "pending" },
  { label: "Concluído", value: "completed" },
  { label: "Reprovado", value: "failed" },
] as const;

export const COMPLEMENTARY_ACTIVITY_MODULE_OPTIONS = [
  { label: "Módulo I", value: "module-i" },
  { label: "Módulo II", value: "module-ii" },
  { label: "Módulo III", value: "module-iii" },
] as const;

export const COMPLEMENTARY_ACTIVITY_TERM_OPTIONS = [
  { label: "1º trimestre", value: "term-1" },
  { label: "2º trimestre", value: "term-2" },
  { label: "3º trimestre", value: "term-3" },
] as const;

export function toSelectFieldOptions<T extends readonly { label: string; value: string }[]>(
  options: T,
): SelectFieldOption[] {
  return options.map((option) => ({ label: option.label, value: option.value }));
}
