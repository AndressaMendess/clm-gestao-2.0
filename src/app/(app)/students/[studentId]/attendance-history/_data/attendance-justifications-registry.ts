"use client";

export type AttendanceJustificationRecord = {
  dateIso: string | null;
  note: string;
  proofFileDataUrl: string | null;
  proofFileName: string | null;
  status: "present" | "absent" | "excused";
  studentId: string;
};

type AttendanceJustificationRegistry = Record<string, AttendanceJustificationRecord>;

const STORAGE_KEY = "clm.attendance.justifications.v1";

function makeKey(studentId: string, recordId: string) {
  return `${studentId}::${recordId}`;
}

function readRegistry(): AttendanceJustificationRegistry {
  if (typeof window === "undefined") return {};
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw) as AttendanceJustificationRegistry;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeRegistry(registry: AttendanceJustificationRegistry) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(registry));
}

export function getAllAttendanceJustifications() {
  return readRegistry();
}

export function getAttendanceJustification(studentId: string, recordId: string) {
  const registry = readRegistry();
  return registry[makeKey(studentId, recordId)] ?? null;
}

export function upsertAttendanceJustification(recordId: string, payload: AttendanceJustificationRecord) {
  const registry = readRegistry();
  registry[makeKey(payload.studentId, recordId)] = payload;
  writeRegistry(registry);
}
