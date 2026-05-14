"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type ManualFlowFormData = {
  birthDate: string;
  city: string;
  cpf: string;
  district: string;
  email: string;
  fullName: string;
  maritalStatus: string;
  nationality: string;
  number: string;
  phone: string;
  rg: string;
  schoolEmail: string;
  sex: string;
  stateCode: string;
  street: string;
  zipCode: string;
};

const INITIAL_FORM_DATA: ManualFlowFormData = {
  birthDate: "",
  city: "",
  cpf: "",
  district: "",
  email: "",
  fullName: "",
  maritalStatus: "",
  nationality: "",
  number: "",
  phone: "",
  rg: "",
  schoolEmail: "",
  sex: "",
  stateCode: "",
  street: "",
  zipCode: "",
};

type ManualFlowContextValue = {
  formData: ManualFlowFormData;
  resetFormData: () => void;
  updateFormData: (patch: Partial<ManualFlowFormData>) => void;
};

const ManualFlowContext = createContext<ManualFlowContextValue | null>(null);

export function ManualFlowProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<ManualFlowFormData>(INITIAL_FORM_DATA);

  const updateFormData = useCallback((patch: Partial<ManualFlowFormData>) => {
    setFormData((previous) => ({ ...previous, ...patch }));
  }, []);

  const resetFormData = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
  }, []);

  const value = useMemo(
    () => ({ formData, resetFormData, updateFormData }),
    [formData, resetFormData, updateFormData],
  );

  return <ManualFlowContext.Provider value={value}>{children}</ManualFlowContext.Provider>;
}

export function useManualFlowForm() {
  const context = useContext(ManualFlowContext);
  if (!context) {
    throw new Error("useManualFlowForm deve ser usado dentro de ManualFlowProvider.");
  }
  return context;
}

