export type ComplementaryActivityStatus = "pending" | "completed" | "failed";
export type ComplementaryActivityModule = "module-i" | "module-ii" | "module-iii";
export type ComplementaryActivityTerm = "term-1" | "term-2" | "term-3";

export type ComplementaryActivityAttachment = {
  fileName: string;
  mimeType: string;
  previewDataUrl?: string | null;
  sizeInBytes: number;
};

export type ComplementaryActivityRecord = {
  id: string;
  studentEmail: string;
  studentName: string;
  studentInitials: string;
  moduleLabel: string;
  moduleValue: ComplementaryActivityModule;
  eventName: string | null;
  eventDate: string | null;
  termValue: ComplementaryActivityTerm | "";
  statusLabel: "Pendente" | "Concluído" | "Reprovado";
  statusValue: ComplementaryActivityStatus;
  attachment: ComplementaryActivityAttachment | null;
  createdAt: string;
};

export type CreateComplementaryActivityInput = {
  studentEmail: string;
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

export type UpdateComplementaryActivityInput = {
  studentEmail: string;
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
