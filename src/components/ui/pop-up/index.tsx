"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { cx } from "@/lib/cx";
import {
  popUpBodyStyles,
  popUpButtonStyles,
  popUpCloseStyles,
  popUpContainerStyles,
  popUpContentStyles,
  popUpFooterStyles,
  popUpHeaderStyles,
  popUpIconWrapperStyles,
  popUpOverlayStyles,
  popUpSubtitleStyles,
  popUpTitleStyles,
} from "./pop-up.styles";
import type { PopUpProps } from "./pop-up.types";

export function PopUp({
  cancelLabel = "Cancelar",
  className,
  closeLabel = "Fechar pop-up",
  confirmLabel = "Confirmar",
  confirmVariant = "primary",
  icon: Icon,
  iconAriaLabel = "Ícone do pop-up",
  isLoading = false,
  isOpen,
  onCancel,
  onClose,
  onConfirm,
  subtitle,
  title,
}: PopUpProps) {
  const popUpRef = useRef<HTMLElement | null>(null);
  const isLoadingRef = useRef(isLoading);

  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  const requestClose = useCallback(() => {
    if (isLoadingRef.current) return;
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const focusTarget =
      popUpRef.current?.querySelector<HTMLElement>(
        "button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
      ) ?? null;
    (focusTarget ?? popUpRef.current)?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isLoadingRef.current) requestClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, requestClose]);

  const handleCancel = () => {
    if (isLoading) return;
    onCancel?.();
    requestClose();
  };

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <div className={popUpOverlayStyles} onClick={requestClose} role="presentation">
      <section
        aria-busy={isLoading}
        aria-label={title}
        aria-modal="true"
        className={cx(popUpContainerStyles, className)}
        onClick={(event) => event.stopPropagation()}
        ref={popUpRef}
        role="dialog"
        tabIndex={-1}
      >
        <header className={popUpHeaderStyles}>
          <button
            aria-label={closeLabel}
            className={popUpCloseStyles}
            disabled={isLoading}
            onClick={requestClose}
            type="button"
          >
            <X aria-hidden className="h-5 w-5" />
          </button>
        </header>

        <div className={popUpBodyStyles}>
          <div className={popUpContentStyles}>
            <span aria-label={iconAriaLabel} className={popUpIconWrapperStyles} role="img">
              <Icon aria-hidden className="h-6 w-6" />
            </span>
            <h2 className={popUpTitleStyles}>{title}</h2>
            <p className={popUpSubtitleStyles}>{subtitle}</p>
          </div>
        </div>

        <footer className={popUpFooterStyles}>
          <Button className={popUpButtonStyles} disabled={isLoading} onClick={handleCancel} variant="ghost">
            {cancelLabel}
          </Button>
          <Button
            className={popUpButtonStyles}
            disabled={isLoading}
            loading={isLoading}
            loadingLabel="Processando..."
            onClick={onConfirm}
            variant={confirmVariant}
          >
            {confirmLabel}
          </Button>
        </footer>
      </section>
    </div>,
    document.body,
  );
}

export type { PopUpConfirmVariant, PopUpProps } from "./pop-up.types";
