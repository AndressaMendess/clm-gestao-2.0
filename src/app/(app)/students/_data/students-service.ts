"use client";

import { deleteStudentRecordByEmail } from "./students-registry";

export type DeleteStudentInput = {
  email: string;
};

export type StudentsRepository = {
  deleteByEmail: (input: DeleteStudentInput) => Promise<void>;
};

const localStorageStudentsRepository: StudentsRepository = {
  async deleteByEmail({ email }) {
    const didDelete = deleteStudentRecordByEmail(email);
    if (!didDelete) {
      throw new Error("Aluno não encontrado para exclusão.");
    }
  },
};

export function getStudentsRepository(): StudentsRepository {
  return localStorageStudentsRepository;
}
