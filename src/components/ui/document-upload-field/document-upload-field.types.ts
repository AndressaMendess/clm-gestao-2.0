import type { InputHelperTone } from "../input";

export type DocumentUploadFieldProps = {
  accept?: string;
  disabled?: boolean;
  id?: string;
  label: string;
  maxSizeMb?: number;
  name?: string;
  onFileChange?: (file: File | null) => void;
  onFileStateChange?: (payload: {
    errorMessage: string | null;
    file: File | null;
    isValid: boolean;
    metadata: { name: string; size: number; type: string } | null;
  }) => void;
  onValidationError?: (errorMessage: string | null) => void;
  required?: boolean;
  tone?: InputHelperTone;
  value?: File | null;
  wrapperClassName?: string;
};
