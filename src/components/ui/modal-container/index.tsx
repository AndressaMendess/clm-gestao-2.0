"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { cx } from "@/lib/cx";
import {
  modalContainerBodyStyles,
  modalContainerCloseStyles,
  modalContainerCopyStyles,
  modalContainerFooterStyles,
  modalContainerHeaderStyles,
  modalContainerOverlayStyles,
  modalContainerStyles,
  modalContainerSubtitleStyles,
  modalContainerTitleStyles,
} from "./modal-container.styles";
import type { ModalContainerProps } from "./modal-container.types";

export function ModalContainer({
  bodyClassName,
  children,
  className,
  closeButtonClassName,
  closeLabel = "Fechar modal",
  closeOnOverlayClick = true,
  copyClassName,
  footer,
  footerClassName,
  headerClassName,
  initialFocusRef,
  isOpen,
  isLoading = false,
  onClose,
  onOpenChange,
  overlayClassName,
  subtitle,
  title,
  titleId,
}: ModalContainerProps) {
  const generatedId = useId();
  const resolvedTitleId = titleId ?? `modal-container-title-${generatedId}`;
  const dialogRef = useRef<HTMLElement | null>(null);

  const requestClose = useCallback(() => {
    if (isLoading) return;
    onOpenChange?.(false);
    onClose();
  }, [isLoading, onClose, onOpenChange]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const focusTarget = initialFocusRef?.current;
    const fallbackTarget =
      dialogRef.current?.querySelector<HTMLElement>(
        "button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
      ) ?? null;
    (focusTarget ?? fallbackTarget ?? dialogRef.current)?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isLoading) {
        requestClose();
      }
    };

    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          "button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
        ),
      );
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement as HTMLElement | null;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);
    window.addEventListener("keydown", handleTab);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("keydown", handleTab);
    };
  }, [initialFocusRef, isLoading, isOpen, requestClose]);

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div
      className={cx(modalContainerOverlayStyles, overlayClassName)}
      onClick={closeOnOverlayClick && !isLoading ? requestClose : undefined}
      role="presentation"
    >
      <section
        aria-labelledby={resolvedTitleId}
        aria-modal="true"
        aria-busy={isLoading}
        className={cx(modalContainerStyles, className)}
        onClick={(event) => event.stopPropagation()}
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
      >
        <header className={cx(modalContainerHeaderStyles, headerClassName)}>
          <div className={cx(modalContainerCopyStyles, copyClassName)}>
            <h2 className={modalContainerTitleStyles} id={resolvedTitleId}>
              {title}
            </h2>
            {subtitle ? <p className={modalContainerSubtitleStyles}>{subtitle}</p> : null}
          </div>

          <button
            aria-label={closeLabel}
            className={cx(modalContainerCloseStyles, closeButtonClassName)}
            disabled={isLoading}
            onClick={requestClose}
            type="button"
          >
            <X aria-hidden className="h-5 w-5" />
          </button>
        </header>

        <div className={cx(modalContainerBodyStyles, bodyClassName)}>{children}</div>

        {footer ? <footer className={cx(modalContainerFooterStyles, footerClassName)}>{footer}</footer> : null}
      </section>
    </div>,
    document.body,
  );
}

export type { ModalContainerProps } from "./modal-container.types";
