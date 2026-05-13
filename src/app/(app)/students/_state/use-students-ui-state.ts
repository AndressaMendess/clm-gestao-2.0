"use client";

import { useState } from "react";
import type { StudentCreateMode, StudentsUiState } from "./students-flow.types";

const DEFAULT_UI_STATE: StudentsUiState = {
  createMode: null,
  isDetailsDrawerOpen: false,
  selectedStudentId: null,
};

export function useStudentsUiState() {
  const [state, setState] = useState<StudentsUiState>(DEFAULT_UI_STATE);

  const openCreateFlow = (mode: StudentCreateMode) => {
    setState((current) => ({ ...current, createMode: mode }));
  };

  const closeCreateFlow = () => {
    setState((current) => ({ ...current, createMode: null }));
  };

  const openDetailsDrawer = (studentId: string) => {
    setState((current) => ({
      ...current,
      isDetailsDrawerOpen: true,
      selectedStudentId: studentId,
    }));
  };

  const closeDetailsDrawer = () => {
    setState((current) => ({
      ...current,
      isDetailsDrawerOpen: false,
      selectedStudentId: null,
    }));
  };

  return {
    ...state,
    closeCreateFlow,
    closeDetailsDrawer,
    openCreateFlow,
    openDetailsDrawer,
  };
}

