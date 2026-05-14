import type { TeacherFilters, TeacherRow } from "../_types/teachers.types";

export function filterTeachers(rows: TeacherRow[], filters: TeacherFilters, search: string): TeacherRow[] {
  const normalizedSearch = search.trim().toLocaleLowerCase();

  return rows.filter((row) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      row.name.toLocaleLowerCase().includes(normalizedSearch) ||
      row.email.toLocaleLowerCase().includes(normalizedSearch) ||
      row.phone.toLocaleLowerCase().includes(normalizedSearch) ||
      row.specialty.toLocaleLowerCase().includes(normalizedSearch);

    const matchesStatus = !filters.status || row.statusFilter === filters.status;
    const matchesSpecialty = !filters.specialty || row.specialtyFilter === filters.specialty;

    return matchesSearch && matchesStatus && matchesSpecialty;
  });
}
