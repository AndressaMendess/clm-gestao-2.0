"use client";

import { TEACHER_DETAILS_BY_EMAIL_MOCK } from "./teacher-details.mock";
import { TEACHER_ROWS } from "./teachers.mock";
import type { TeacherDetails } from "../_types/teacher-details.types";
import type { TeacherRow } from "../_types/teachers.types";

export type TeacherRegistryRecord = {
  details: TeacherDetails;
  row: TeacherRow;
};

const STORAGE_KEY = "clm.teachers.registry.v1";

function emptyTeacherDetails(fullName = "-"): TeacherDetails {
  return {
    attachments: [],
    personalData: {
      birthDate: "-",
      cpf: "-",
      fatherName: "-",
      fullName,
      maritalStatus: "-",
      motherName: "-",
      nationality: "-",
      rg: "-",
      sex: "-",
    },
    schoolEmail: "-",
  };
}

function normalizeDetails(details: Partial<TeacherDetails> | undefined, fullName: string): TeacherDetails {
  const fallback = emptyTeacherDetails(fullName);
  return {
    attachments: Array.isArray(details?.attachments) ? details.attachments : fallback.attachments,
    personalData: {
      birthDate: details?.personalData?.birthDate ?? fallback.personalData.birthDate,
      cpf: details?.personalData?.cpf ?? fallback.personalData.cpf,
      fatherName: details?.personalData?.fatherName ?? fallback.personalData.fatherName,
      fullName: details?.personalData?.fullName ?? fullName,
      maritalStatus: details?.personalData?.maritalStatus ?? fallback.personalData.maritalStatus,
      motherName: details?.personalData?.motherName ?? fallback.personalData.motherName,
      nationality: details?.personalData?.nationality ?? fallback.personalData.nationality,
      rg: details?.personalData?.rg ?? fallback.personalData.rg,
      sex: details?.personalData?.sex ?? fallback.personalData.sex,
    },
    schoolEmail: details?.schoolEmail ?? fallback.schoolEmail,
  };
}

function buildInitialRegistry(): TeacherRegistryRecord[] {
  return TEACHER_ROWS.map((row) => ({
    details: normalizeDetails(TEACHER_DETAILS_BY_EMAIL_MOCK[row.email], row.name),
    row,
  }));
}

function readRegistry(): TeacherRegistryRecord[] {
  if (typeof window === "undefined") return buildInitialRegistry();
  const serialized = window.localStorage.getItem(STORAGE_KEY);
  if (!serialized) {
    const initial = buildInitialRegistry();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }

  try {
    const parsed = JSON.parse(serialized) as unknown;
    if (!Array.isArray(parsed)) {
      const initial = buildInitialRegistry();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }

    const normalized = parsed
      .map((item) => {
        if (!item || typeof item !== "object") return null;

        const maybeRecord = item as Partial<TeacherRegistryRecord>;
        if (maybeRecord.row && typeof maybeRecord.row === "object") {
          const row = maybeRecord.row as TeacherRow;
          return {
            details: normalizeDetails(maybeRecord.details, row.name),
            row,
          } satisfies TeacherRegistryRecord;
        }

        const maybeRow = item as Partial<TeacherRow>;
        if (typeof maybeRow.email === "string" && typeof maybeRow.name === "string") {
          const row = maybeRow as TeacherRow;
          return {
            details: normalizeDetails(TEACHER_DETAILS_BY_EMAIL_MOCK[maybeRow.email], maybeRow.name),
            row,
          } satisfies TeacherRegistryRecord;
        }

        return null;
      })
      .filter((record): record is TeacherRegistryRecord => Boolean(record));

    if (!normalized.length) {
      const initial = buildInitialRegistry();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  } catch {
    const initial = buildInitialRegistry();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
}

export function getTeacherRowsFromRegistry(): TeacherRow[] {
  return readRegistry().map((record) => record.row);
}

export function getTeacherRecordByEmail(email: string): TeacherRegistryRecord | null {
  return readRegistry().find((record) => record.row.email === email) ?? null;
}
