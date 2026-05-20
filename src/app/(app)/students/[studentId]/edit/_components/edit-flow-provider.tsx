"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { ManualFlowFormData } from "@/app/(app)/students/new/manual/_components/manual-flow-provider";

type EditFlowContextValue = {
  formData: ManualFlowFormData;
  hydrateFormData: (nextData: ManualFlowFormData) => void;
  isHydrated: boolean;
  updateFormData: (patch: Partial<ManualFlowFormData>) => void;
};

const INITIAL_FORM_DATA: ManualFlowFormData = {
  birthDate: "",
  city: "",
  cpf: "",
  district: "",
  email: "",
  enrollmentClassroom: "",
  enrollmentModule: "",
  enrollmentStatus: "",
  fatherName: "",
  fullName: "",
  maritalStatus: "",
  motherName: "",
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

const EditFlowContext = createContext<EditFlowContextValue | null>(null);

export function EditFlowProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<ManualFlowFormData>(INITIAL_FORM_DATA);
  const [isHydrated, setIsHydrated] = useState(false);

  const updateFormData = useCallback((patch: Partial<ManualFlowFormData>) => {
    setFormData((previous) => ({ ...previous, ...patch }));
  }, []);

  const hydrateFormData = useCallback((nextData: ManualFlowFormData) => {
    setFormData(nextData);
    setIsHydrated(true);
  }, []);

  const value = useMemo(
    () => ({ formData, hydrateFormData, isHydrated, updateFormData }),
    [formData, hydrateFormData, isHydrated, updateFormData],
  );

  return <EditFlowContext.Provider value={value}>{children}</EditFlowContext.Provider>;
}

export function useEditFlowForm() {
  const context = useContext(EditFlowContext);
  if (!context) {
    throw new Error("useEditFlowForm deve ser usado dentro de EditFlowProvider.");
  }
  return context;
}
