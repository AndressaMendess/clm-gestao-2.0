"use client";

import type {
  ComplementaryActivityRecord,
  CreateComplementaryActivityInput,
  UpdateComplementaryActivityInput,
} from "./complementary-activities.types";

const STORAGE_KEY = "clm.complementary-activities.registry.v1";

const INITIAL_COMPLEMENTARY_ACTIVITIES: ComplementaryActivityRecord[] = [
  {
    id: "activity-001",
    studentEmail: "ana.costa@email.com",
    studentName: "Ana Clara Costa",
    studentInitials: "AB",
    moduleLabel: "Módulo I",
    moduleValue: "module-i",
    eventName: null,
    eventDate: null,
    termValue: "term-1",
    statusLabel: "Pendente",
    statusValue: "pending",
    attachment: null,
    createdAt: "2026-01-15T10:00:00.000Z",
  },
  {
    id: "activity-002",
    studentEmail: "bruno.silva@email.com",
    studentName: "Bruno Henrique Silva",
    studentInitials: "BH",
    moduleLabel: "Módulo II",
    moduleValue: "module-ii",
    eventName: "Recital de Corda",
    eventDate: "2026-03-18",
    termValue: "term-1",
    statusLabel: "Concluído",
    statusValue: "completed",
    attachment: null,
    createdAt: "2026-03-18T20:30:00.000Z",
  },
  {
    id: "activity-003",
    studentEmail: "camila.rocha@email.com",
    studentName: "Camila Rocha",
    studentInitials: "CR",
    moduleLabel: "Módulo III",
    moduleValue: "module-iii",
    eventName: "Mostra de Teoria Musical",
    eventDate: "2026-04-04",
    termValue: "term-2",
    statusLabel: "Reprovado",
    statusValue: "failed",
    attachment: null,
    createdAt: "2026-04-04T16:00:00.000Z",
  },
];

export type ComplementaryActivitiesRepository = {
  create: (input: CreateComplementaryActivityInput) => Promise<ComplementaryActivityRecord>;
  getById: (id: string) => Promise<ComplementaryActivityRecord | null>;
  list: () => Promise<ComplementaryActivityRecord[]>;
  update: (
    id: string,
    input: UpdateComplementaryActivityInput,
  ) => Promise<ComplementaryActivityRecord | null>;
};

function readRegistry(): ComplementaryActivityRecord[] {
  if (typeof window === "undefined") return INITIAL_COMPLEMENTARY_ACTIVITIES;
  const serialized = window.localStorage.getItem(STORAGE_KEY);
  if (!serialized) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_COMPLEMENTARY_ACTIVITIES));
    return INITIAL_COMPLEMENTARY_ACTIVITIES;
  }

  try {
    return JSON.parse(serialized) as ComplementaryActivityRecord[];
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_COMPLEMENTARY_ACTIVITIES));
    return INITIAL_COMPLEMENTARY_ACTIVITIES;
  }
}

function saveRegistry(records: ComplementaryActivityRecord[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

const localStorageRepository: ComplementaryActivitiesRepository = {
  async list() {
    return readRegistry();
  },
  async getById(id) {
    const records = readRegistry();
    return records.find((record) => record.id === id) ?? null;
  },
  async create(input) {
    const record: ComplementaryActivityRecord = {
      id: `activity-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...input,
    };
    const records = readRegistry();
    records.unshift(record);
    saveRegistry(records);
    return record;
  },
  async update(id, input) {
    const records = readRegistry();
    const index = records.findIndex((record) => record.id === id);
    if (index < 0) return null;

    const updatedRecord: ComplementaryActivityRecord = {
      ...records[index],
      ...input,
    };
    records[index] = updatedRecord;
    saveRegistry(records);
    return updatedRecord;
  },
};

export function getComplementaryActivitiesRepository(): ComplementaryActivitiesRepository {
  return localStorageRepository;
}
