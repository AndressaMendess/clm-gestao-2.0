export type ComplementaryActivityStatus = "pending" | "completed" | "failed";
export type ComplementaryActivityModule = "module-i" | "module-ii" | "module-iii";
export type ComplementaryActivityTerm = "term-1" | "term-2" | "term-3";

export type ComplementaryActivityAttachment = {
  fileName: string;
  mimeType: string;
  sizeInBytes: number;
};

export type ComplementaryActivityRecord = {
  id: string;
  studentName: string;
  studentInitials: string;
  moduleLabel: string;
  moduleValue: ComplementaryActivityModule;
  eventName: string | null;
  eventDate: string | null;
  termValue: ComplementaryActivityTerm;
  statusLabel: "Pendente" | "Concluído" | "Reprovado";
  statusValue: ComplementaryActivityStatus;
  attachment: ComplementaryActivityAttachment | null;
  createdAt: string;
};

export type CreateComplementaryActivityInput = {
  studentName: string;
  studentInitials: string;
  moduleLabel: string;
  moduleValue: ComplementaryActivityModule;
  eventName: string | null;
  eventDate: string | null;
  termValue: ComplementaryActivityTerm;
  statusLabel: "Pendente" | "Concluído" | "Reprovado";
  statusValue: ComplementaryActivityStatus;
  attachment: ComplementaryActivityAttachment | null;
};

