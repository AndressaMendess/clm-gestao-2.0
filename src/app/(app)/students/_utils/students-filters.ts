import type { StudentFilters, StudentRow } from "../_types/students.types";

export function filterStudents(rows: StudentRow[], filters: StudentFilters, search: string): StudentRow[] {
  const normalizedSearch = search.trim().toLocaleLowerCase();

  return rows.filter((row) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      row.name.toLocaleLowerCase().includes(normalizedSearch) ||
      row.email.toLocaleLowerCase().includes(normalizedSearch) ||
      row.phone.toLocaleLowerCase().includes(normalizedSearch) ||
      row.module.toLocaleLowerCase().includes(normalizedSearch) ||
      row.classroom.toLocaleLowerCase().includes(normalizedSearch);

    const matchesStatus = !filters.status || row.statusFilter === filters.status;
    const matchesModule = !filters.module || row.moduleFilter === filters.module;
    const classroomFilters = row.classroomFilters ?? [row.classroomFilter];
    const matchesClassroom = !filters.classroom || classroomFilters.includes(filters.classroom);

    return matchesSearch && matchesStatus && matchesModule && matchesClassroom;
  });
}
