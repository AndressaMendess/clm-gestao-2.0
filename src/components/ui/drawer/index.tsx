"use client";

import { Trash2, X } from "lucide-react";
import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { cx } from "@/lib/cx";
import { Avatar } from "../avatar";
import { Badge } from "../badge";
import { Button } from "../button";
import { Tabs } from "../tabs";
import {
  drawerCloseButtonStyles,
  drawerContentStyles,
  drawerHeaderActionsStyles,
  drawerEditButtonStyles,
  drawerHeaderStyles,
  drawerHeaderTopStyles,
  drawerOverlayStyles,
  drawerShellStyles,
  drawerStudentMetaStyles,
  drawerStudentInfoStyles,
  drawerStudentNameStyles,
  drawerTabsSectionStyles,
} from "./drawer.styles";
import type { DrawerProps } from "./drawer.types";

export function Drawer({
  avatarAlt,
  avatarInitials,
  avatarSrc,
  children,
  className,
  closeLabel = "Fechar painel",
  editButtonLabel = "Editar aluno",
  isLoading = false,
  isOpen,
  onClose,
  onDeleteStudent,
  onEditStudent,
  onOpenChange,
  onTabChange,
  statusLabel,
  statusVariant = "default",
  studentName,
  tabValue,
  tabs,
}: DrawerProps) {
  const generatedId = useId();
  const [internalTab, setInternalTab] = useState<string | undefined>(tabs.find((item) => !item.disabled)?.id);
  const [isMounted, setIsMounted] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(isOpen);
  const resolvedTab = tabValue ?? internalTab;
  const firstEnabledTab = useMemo(() => tabs.find((item) => !item.disabled)?.id, [tabs]);
  const transitionMs = 220;

  useEffect(() => {
    if (!resolvedTab && firstEnabledTab) {
      setInternalTab(firstEnabledTab);
    }
  }, [firstEnabledTab, resolvedTab]);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      const frame = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    setIsVisible(false);
    const timeout = window.setTimeout(() => setIsMounted(false), transitionMs);
    return () => window.clearTimeout(timeout);
  }, [isOpen]);

  const requestClose = useCallback(() => {
    if (isLoading) return;
    onOpenChange?.(false);
    onClose();
  }, [isLoading, onClose, onOpenChange]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, requestClose]);

  if (!isMounted || typeof document === "undefined") return null;

  return createPortal(
    <>
      <div
        className={cx(
          drawerOverlayStyles,
          "transition-opacity duration-200",
          isVisible ? "opacity-100" : "opacity-0",
        )}
        onClick={requestClose}
        role="presentation"
      />
      <aside
        aria-labelledby={`drawer-title-${generatedId}`}
        aria-modal="true"
        className={cx(
          drawerShellStyles,
          "transform transition-transform duration-200 ease-out",
          isVisible ? "translate-x-0" : "translate-x-4",
          className,
        )}
        role="dialog"
      >
        <header className={drawerHeaderStyles}>
          <div className={drawerHeaderTopStyles}>
            <div className={drawerStudentInfoStyles}>
              <Avatar
                alt={avatarAlt ?? `Avatar de ${studentName}`}
                initials={avatarInitials}
                name={studentName}
                src={avatarSrc}
                variant={avatarSrc ? "with-image" : "without-image"}
              />
              <div className={drawerStudentMetaStyles}>
                <h2 className={drawerStudentNameStyles} id={`drawer-title-${generatedId}`}>
                  {studentName}
                </h2>
                <Badge appearance="dot" variant={statusVariant}>
                  {statusLabel}
                </Badge>
              </div>
            </div>

            <button aria-label={closeLabel} className={drawerCloseButtonStyles} onClick={requestClose} type="button">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className={drawerHeaderActionsStyles}>
            <Button className={drawerEditButtonStyles} onClick={onEditStudent} variant="primary">
              {editButtonLabel}
            </Button>
            <Button aria-label="Excluir aluno" icon={Trash2} onClick={onDeleteStudent} variant="icon" />
          </div>
        </header>

        <div className={drawerTabsSectionStyles}>
          <Tabs
            ariaLabel="Abas do drawer"
            items={tabs}
            onValueChange={(nextValue) => {
              if (tabValue === undefined) {
                setInternalTab(nextValue);
              }
              onTabChange?.(nextValue);
            }}
            value={resolvedTab}
          />
        </div>

        <div className={drawerContentStyles}>{children}</div>
      </aside>
    </>,
    document.body,
  );
}

export type { DrawerProps } from "./drawer.types";
