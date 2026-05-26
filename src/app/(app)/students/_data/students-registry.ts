"use client";

import { STUDENT_DETAILS_BY_EMAIL_MOCK } from "./students-details.mock";
import { STUDENT_ROWS } from "./students.mock";
import type { StudentDetails } from "../_types/student-details.types";
import type { StudentRow } from "../_types/students.types";

export type StudentRegistryRecord = {
  details: StudentDetails;
  row: StudentRow;
};

const STORAGE_KEY = "clm.students.registry.v2";

function createFallbackDetails(row: StudentRow): StudentDetails {
  return {
    address: {
      city: "-",
      complement: "-",
      neighborhood: "-",
      number: "-",
      state: "-",
      street: "-",
      zipCode: "-",
    },
    attendance: {
      history: [],
      justifiedAbsences: 0,
      presentRate: "-",
      totalAbsences: 0,
      totalClasses: 0,
    },
    attachments: [],
    personalData: {
      birthDate: "-",
      cpf: "-",
      fatherName: "-",
      fullName: row.name,
      maritalStatus: "-",
      motherName: "-",
      nationality: "-",
      rg: "-",
      sex: "-",
    },
    schoolEmail: "-",
  };
}

function buildInitialRegistry(): StudentRegistryRecord[] {
  return STUDENT_ROWS.map((row) => ({
    details: STUDENT_DETAILS_BY_EMAIL_MOCK[row.email] ?? createFallbackDetails(row),
    row,
  }));
}

function mergeRegistryWithMockRows(
  records: StudentRegistryRecord[],
): StudentRegistryRecord[] {
  const byEmail = new Map(records.map((record) => [record.row.email, record]));

  STUDENT_ROWS.forEach((row) => {
    if (!byEmail.has(row.email)) {
      byEmail.set(row.email, {
        details: STUDENT_DETAILS_BY_EMAIL_MOCK[row.email] ?? createFallbackDetails(row),
        row,
      });
    }
  });

  return Array.from(byEmail.values());
}

function readRegistry(): StudentRegistryRecord[] {
  if (typeof window === "undefined") return buildInitialRegistry();
  const serialized = window.localStorage.getItem(STORAGE_KEY);
  if (!serialized) {
    const initial = buildInitialRegistry();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
  try {
    const parsed = JSON.parse(serialized) as StudentRegistryRecord[];
    const merged = mergeRegistryWithMockRows(parsed);
    if (merged.length !== parsed.length) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    }
    return merged;
  } catch {
    const initial = buildInitialRegistry();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
}

function saveRegistry(records: StudentRegistryRecord[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function getStudentRegistryRecords(): StudentRegistryRecord[] {
  return readRegistry();
}

export function getStudentRowsFromRegistry(): StudentRow[] {
  return readRegistry().map((record) => record.row);
}

export function getStudentRecordByEmail(email: string): StudentRegistryRecord | null {
  return readRegistry().find((record) => record.row.email === email) ?? null;
}

export function upsertStudentRecord(record: StudentRegistryRecord) {
  const records = readRegistry();
  const index = records.findIndex((item) => item.row.email === record.row.email);
  if (index >= 0) {
    records[index] = record;
  } else {
    records.unshift(record);
  }
  saveRegistry(records);
}

export function deleteStudentRecordByEmail(email: string): boolean {
  const records = readRegistry();
  const nextRecords = records.filter((item) => item.row.email !== email);
  if (nextRecords.length === records.length) return false;
  saveRegistry(nextRecords);
  return true;
}
