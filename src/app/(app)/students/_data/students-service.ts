"use client";

import type { StudentRegistryRecord } from "./students-registry";
import {
  deleteStudentRecordByEmail,
  getStudentRecordByEmail,
  upsertStudentRecord,
} from "./students-registry";

export type DeleteStudentInput = {
  email: string;
};

export type StudentsRepository = {
  deleteByEmail: (input: DeleteStudentInput) => Promise<void>;
  updateByEmail: (input: { originalEmail: string; record: StudentRegistryRecord }) => Promise<void>;
};

const localStorageStudentsRepository: StudentsRepository = {
  async deleteByEmail({ email }) {
    const didDelete = deleteStudentRecordByEmail(email);
    if (!didDelete) {
      throw new Error("Aluno não encontrado para exclusão.");
    }
  },
  async updateByEmail({ originalEmail, record }) {
    const existingRecord = getStudentRecordByEmail(originalEmail);
    if (!existingRecord) {
      throw new Error("Aluno não encontrado para atualização.");
    }
    if (originalEmail !== record.row.email) {
      deleteStudentRecordByEmail(originalEmail);
    }
    upsertStudentRecord(record);
  },
};

export function getStudentsRepository(): StudentsRepository {
  return localStorageStudentsRepository;
}
