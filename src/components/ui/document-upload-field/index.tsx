"use client";

import { FileText, Trash2, Upload } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { ChangeEvent, DragEvent, KeyboardEvent } from "react";
import { cx } from "@/lib/cx";
import {
  documentUploadDropzoneRootStyles,
  documentUploadEmptyContentStyles,
  documentUploadEmptySubtitleStyles,
  documentUploadEmptyTitleStyles,
  documentUploadFieldLabelStyles,
  documentUploadRemoveButtonStyles,
  documentUploadSelectedContentStyles,
  documentUploadSelectedImagePreviewStyles,
  documentUploadSelectedFileNameStyles,
  documentUploadSelectedFileRowStyles,
  documentUploadSelectedFileSizeStyles,
  documentUploadFieldWrapperStyles,
  getDocumentUploadDropzonePadding,
  getDocumentUploadDropzoneStyles,
  getDocumentUploadHelperStyles,
} from "./document-upload-field.styles";
import type { DocumentUploadFieldProps } from "./document-upload-field.types";

const DEFAULT_ACCEPT = "application/pdf,image/*";

function formatFileSize(sizeInBytes: number): string {
  const sizeInMb = sizeInBytes / (1024 * 1024);
  if (sizeInMb >= 1) return `${sizeInMb.toFixed(2)} MB`;
  const sizeInKb = sizeInBytes / 1024;
  return `${Math.round(sizeInKb)} KB`;
}

function isAllowedFileType(file: File): boolean {
  if (file.type === "application/pdf") return true;
  if (file.type.startsWith("image/")) return true;
  return /\.(pdf|png|jpe?g|gif|webp|bmp|svg)$/i.test(file.name);
}

function isImageFile(file: File): boolean {
  if (file.type.startsWith("image/")) return true;
  return /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(file.name);
}

export function DocumentUploadField({
  accept = DEFAULT_ACCEPT,
  disabled,
  id,
  label,
  maxSizeMb = 5,
  name,
  onFileChange,
  onFileStateChange,
  onValidationError,
  required,
  tone = "default",
  value,
  wrapperClassName,
}: DocumentUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [internalFile, setInternalFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const resolvedFile = value === undefined ? internalFile : value;
  const errorId = `${inputId}-error`;
  const describedBy = errorMessage ? errorId : undefined;
  const resolvedTone = errorMessage ? "error" : resolvedFile ? "success" : tone;

  useEffect(() => {
    if (!resolvedFile || !isImageFile(resolvedFile)) {
      setImagePreviewUrl(null);
      return;
    }

    const previewUrl = URL.createObjectURL(resolvedFile);
    setImagePreviewUrl(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [resolvedFile]);

  const setError = (message: string | null) => {
    setErrorMessage(message);
    onValidationError?.(message);
  };

  const emitFileState = (file: File | null, message: string | null) => {
    onFileStateChange?.({
      errorMessage: message,
      file,
      isValid: Boolean(file) && !message,
      metadata: file
        ? {
            name: file.name,
            size: file.size,
            type: file.type,
          }
        : null,
    });
  };

  const updateFile = (file: File | null) => {
    if (value === undefined) {
      setInternalFile(file);
    }
    onFileChange?.(file);
  };

  const validateAndSetFile = (file: File | null) => {
    if (!file) {
      updateFile(null);
      setError(null);
      emitFileState(null, null);
      return;
    }

    if (!isAllowedFileType(file)) {
      const message = "Formato invalido. Envie PDF ou imagem.";
      setError(message);
      updateFile(null);
      emitFileState(file, message);
      return;
    }

    const maxSizeBytes = maxSizeMb * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      const message = `Arquivo excede ${maxSizeMb}MB.`;
      setError(message);
      updateFile(null);
      emitFileState(file, message);
      return;
    }

    setError(null);
    updateFile(file);
    emitFileState(file, null);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0] ?? null;
    validateAndSetFile(file);
  };

  const openFilePicker = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleDrop = (event: DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (disabled) return;
    const file = event.dataTransfer.files?.[0] ?? null;
    validateAndSetFile(file);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openFilePicker();
    }
  };

  const removeFile = () => {
    if (disabled) return;
    if (inputRef.current) inputRef.current.value = "";
    updateFile(null);
    setError(null);
  };

  return (
    <div className={cx(documentUploadFieldWrapperStyles, wrapperClassName)}>
      <label className={documentUploadFieldLabelStyles} htmlFor={inputId}>
        {label}
      </label>

      <input
        accept={accept}
        className="sr-only"
        disabled={disabled}
        id={inputId}
        name={name}
        onChange={handleInputChange}
        ref={inputRef}
        required={required}
        type="file"
      />

      <div className={documentUploadDropzoneRootStyles}>
        <button
          aria-describedby={describedBy}
          className={cx(
            getDocumentUploadDropzoneStyles(resolvedTone),
            getDocumentUploadDropzonePadding(Boolean(resolvedFile)),
          )}
          disabled={disabled || Boolean(resolvedFile)}
          onClick={openFilePicker}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          onKeyDown={handleKeyDown}
          type="button"
        >
          {resolvedFile ? (
            <div className={documentUploadSelectedContentStyles}>
              <div className={documentUploadSelectedFileRowStyles}>
                {imagePreviewUrl ? (
                  <img
                    alt={`Preview de ${resolvedFile.name}`}
                    className={documentUploadSelectedImagePreviewStyles}
                    src={imagePreviewUrl}
                  />
                ) : (
                  <FileText className="h-4 w-4 shrink-0 text-[var(--feedback-success-content)]" />
                )}
                <div className="min-w-0 text-left">
                  <p className={documentUploadSelectedFileNameStyles}>
                    {resolvedFile.name}
                  </p>
                  <p className={documentUploadSelectedFileSizeStyles}>
                    {formatFileSize(resolvedFile.size)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className={documentUploadEmptyContentStyles}>
              <Upload className="h-5 w-5 shrink-0 text-[var(--content-tertiary)] transition-colors group-hover:text-[var(--content-primary)]" />
              <p className={documentUploadEmptyTitleStyles}>
                Enviar documento
              </p>
              <p className={documentUploadEmptySubtitleStyles}>
                PDF ou imagem ate {maxSizeMb}MB.
              </p>
            </div>
          )}
        </button>

        {resolvedFile ? (
          <button
            aria-label="Remover arquivo"
            className={documentUploadRemoveButtonStyles}
            disabled={disabled}
            onClick={removeFile}
            type="button"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {errorMessage ? (
        <p className={getDocumentUploadHelperStyles("error")} id={errorId} role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}

export type { DocumentUploadFieldProps } from "./document-upload-field.types";
