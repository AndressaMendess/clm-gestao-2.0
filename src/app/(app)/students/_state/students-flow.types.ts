export type StudentCreateMode = "manual" | "ocr";

export type StudentsUiState = {
  createMode: StudentCreateMode | null;
  isDetailsDrawerOpen: boolean;
  selectedStudentId: string | null;
};

