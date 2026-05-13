import type { InputHelperTone } from "../input";

export type AttachmentItem = {
  id: string;
  mimeType?: string;
  name: string;
  sizeInBytes?: number;
  url?: string;
};

export type AttachmentCollapsibleProps = {
  addButtonLabel?: string;
  className?: string;
  defaultExpanded?: boolean;
  disabled?: boolean;
  initialItems?: AttachmentItem[];
  items?: AttachmentItem[];
  maxSizeMb?: number;
  modalSubtitle?: string;
  modalTitle?: string;
  onCreateItem?: (file: File) => Promise<AttachmentItem> | AttachmentItem;
  onDeleteItem?: (item: AttachmentItem) => Promise<void> | void;
  onDownloadItem?: (item: AttachmentItem) => Promise<void> | void;
  onItemsChange?: (items: AttachmentItem[]) => void;
  onPreviewItem?: (item: AttachmentItem) => Promise<void> | void;
  title?: string;
  tone?: InputHelperTone;
};
