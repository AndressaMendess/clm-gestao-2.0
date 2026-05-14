export type AttendanceStatus = "present" | "absent" | "excused";

export type AttendanceRegistryStudent = {
  attendance: AttendanceStatus;
  checkedAt?: string;
  id: string;
  name: string;
  note?: string;
};

export type AttendanceRegistryCall = {
  classroom: string;
  classroomFilter: string;
  createdAt: string;
  id: string;
  module: string;
  moduleFilter: string;
  students: AttendanceRegistryStudent[];
  userName: string;
};

const STORAGE_KEY = "clm.attendance.registry.v1";

function readAttendanceRegistry(): AttendanceRegistryCall[] {
  if (typeof window === "undefined") return [];
  const serialized = window.localStorage.getItem(STORAGE_KEY);
  if (!serialized) return [];

  try {
    const parsed = JSON.parse(serialized) as AttendanceRegistryCall[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveAttendanceRegistry(calls: AttendanceRegistryCall[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(calls));
}

export function getAttendanceCallsFromRegistry(): AttendanceRegistryCall[] {
  return readAttendanceRegistry();
}

export function upsertAttendanceCall(record: AttendanceRegistryCall) {
  const calls = readAttendanceRegistry();
  const existingIndex = calls.findIndex((call) => call.id === record.id);

  if (existingIndex >= 0) {
    calls[existingIndex] = record;
  } else {
    calls.unshift(record);
  }

  calls.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  saveAttendanceRegistry(calls);
}
