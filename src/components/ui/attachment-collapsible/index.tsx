"use client";

import { ChevronDown, ChevronUp, Download, Eye, Paperclip, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { cx } from "@/lib/cx";
import { Button } from "../button";
import { DocumentUploadField } from "../document-upload-field";
import { ModalContainer } from "../modal-container";
import {
  attachmentCollapsibleContentStyles,
  attachmentCollapsibleEmptyStyles,
  attachmentCollapsibleHeaderStyles,
  attachmentCollapsibleItemMetaStyles,
  attachmentCollapsibleItemNameStyles,
  attachmentCollapsibleItemStyles,
  attachmentCollapsibleListStyles,
  attachmentCollapsibleRootStyles,
  attachmentCollapsibleTitleGroupStyles,
  attachmentCollapsibleTitleStyles,
} from "./attachment-collapsible.styles";
import type { AttachmentCollapsibleProps, AttachmentItem } from "./attachment-collapsible.types";

function formatSize(sizeInBytes?: number): string {
  if (!sizeInBytes || sizeInBytes <= 0) return "";
  const sizeInMb = sizeInBytes / (1024 * 1024);
  if (sizeInMb >= 1) return `${sizeInMb.toFixed(2)} MB`;
  const sizeInKb = sizeInBytes / 1024;
  return `${Math.round(sizeInKb)} KB`;
}

function createAttachmentFromFile(file: File): AttachmentItem {
  const id = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  return {
    id,
    mimeType: file.type,
    name: file.name,
    sizeInBytes: file.size,
    url: URL.createObjectURL(file),
  };
}

export function AttachmentCollapsible({
  addButtonLabel = "Adicionar documento",
  className,
  defaultExpanded = true,
  disabled = false,
  initialItems = [],
  items,
  maxSizeMb = 5,
  modalSubtitle = "Adicione um novo anexo em PDF ou imagem.",
  modalTitle = "Novo anexo",
  onCreateItem,
  onDeleteItem,
  onDownloadItem,
  onItemsChange,
  onPreviewItem,
  title = "Documentos pessoais",
  tone = "default",
}: AttachmentCollapsibleProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [internalItems, setInternalItems] = useState<AttachmentItem[]>(initialItems);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [isValidFile, setIsValidFile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resolvedItems = items ?? internalItems;

  const canSubmit = Boolean(pendingFile) && isValidFile && !isSubmitting && !disabled;
  const ChevronIcon = isExpanded ? ChevronUp : ChevronDown;

  const updateItems = (nextItems: AttachmentItem[]) => {
    if (items === undefined) {
      setInternalItems(nextItems);
    }
    onItemsChange?.(nextItems);
  };

  const handleAddAttachment = async () => {
    if (!pendingFile || !canSubmit) return;
    try {
      setIsSubmitting(true);
      const createdItem = onCreateItem
        ? await onCreateItem(pendingFile)
        : createAttachmentFromFile(pendingFile);
      updateItems([...resolvedItems, createdItem]);
      setPendingFile(null);
      setIsValidFile(false);
      setIsModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteAttachment = async (item: AttachmentItem) => {
    if (item.url?.startsWith("blob:")) {
      URL.revokeObjectURL(item.url);
    }
    await onDeleteItem?.(item);
    updateItems(resolvedItems.filter((currentItem) => currentItem.id !== item.id));
  };

  const handlePreviewAttachment = async (item: AttachmentItem) => {
    if (onPreviewItem) {
      await onPreviewItem(item);
      return;
    }
    if (!item.url) return;
    window.open(item.url, "_blank", "noopener,noreferrer");
  };

  const handleDownloadAttachment = async (item: AttachmentItem) => {
    if (onDownloadItem) {
      await onDownloadItem(item);
      return;
    }
    if (!item.url) return;
    const anchor = document.createElement("a");
    anchor.href = item.url;
    anchor.download = item.name;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.click();
  };

  const modalFooter = useMemo(
    () => (
      <>
        <Button disabled={isSubmitting} onClick={() => setIsModalOpen(false)} variant="ghost">
          Cancelar
        </Button>
        <Button disabled={!canSubmit} onClick={handleAddAttachment} variant="primary">
          Salvar anexo
        </Button>
      </>
    ),
    [canSubmit, handleAddAttachment, isSubmitting],
  );

  return (
    <section className={cx(attachmentCollapsibleRootStyles, className)}>
      <button
        aria-expanded={isExpanded}
        className={attachmentCollapsibleHeaderStyles}
        disabled={disabled}
        onClick={() => setIsExpanded((currentValue) => !currentValue)}
        type="button"
      >
        <span className={attachmentCollapsibleTitleGroupStyles}>
          <Paperclip className="h-4 w-4 text-[var(--content-secondary)]" />
          <span className={attachmentCollapsibleTitleStyles}>{title}</span>
        </span>
        <ChevronIcon className="h-4 w-4 text-[var(--content-tertiary)]" />
      </button>

      <div
        aria-hidden={!isExpanded}
        className={cx(
          "grid transition-all duration-300 ease-out",
          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className={cx(attachmentCollapsibleContentStyles, "grid gap-4")}>
            <Button className="w-full" icon={Plus} onClick={() => setIsModalOpen(true)} variant="secondary">
              {addButtonLabel}
            </Button>

            {resolvedItems.length ? (
              <div className={attachmentCollapsibleListStyles}>
                {resolvedItems.map((item) => (
                  <article className={attachmentCollapsibleItemStyles} key={item.id}>
                    <div className="min-w-0 flex-1">
                      <p className={attachmentCollapsibleItemNameStyles}>{item.name}</p>
                      <p className={attachmentCollapsibleItemMetaStyles}>
                        {formatSize(item.sizeInBytes) || "Sem tamanho informado"}
                      </p>
                    </div>
                    <div className="flex w-full items-center justify-end gap-1 sm:w-auto">
                      <Button
                        aria-label={`Visualizar anexo ${item.name}`}
                        disabled={!item.url}
                        icon={Eye}
                        onClick={() => handlePreviewAttachment(item)}
                        variant="icon"
                      />
                      <Button
                        aria-label={`Baixar anexo ${item.name}`}
                        disabled={!item.url}
                        icon={Download}
                        onClick={() => handleDownloadAttachment(item)}
                        variant="icon"
                      />
                      <Button
                        aria-label={`Remover anexo ${item.name}`}
                        icon={Trash2}
                        onClick={() => handleDeleteAttachment(item)}
                        variant="icon"
                      />
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className={attachmentCollapsibleEmptyStyles}>
                Nenhum documento anexado.
              </p>
            )}
          </div>
        </div>
      </div>

      <ModalContainer
        closeLabel="Fechar modal de anexo"
        footer={modalFooter}
        isLoading={isSubmitting}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        subtitle={modalSubtitle}
        title={modalTitle}
      >
        <DocumentUploadField
          label="Enviar documento"
          maxSizeMb={maxSizeMb}
          onFileStateChange={({ file, isValid }) => {
            setPendingFile(file);
            setIsValidFile(isValid);
          }}
          tone={tone}
          value={pendingFile}
        />
      </ModalContainer>
    </section>
  );
}

export type { AttachmentCollapsibleProps, AttachmentItem } from "./attachment-collapsible.types";
