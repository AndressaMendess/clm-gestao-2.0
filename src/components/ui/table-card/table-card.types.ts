import type { ReactNode } from "react";

export type TableCardAlign = "left" | "center" | "right";
export type TableCardSortDirection = "asc" | "desc";

/**
 * Column definition for dynamic tables: use `key` for flat rows, or `accessor` / `sortValue`
 * for nested or computed fields. `render` overrides how the cell is displayed.
 */
export type TableCardColumn<Row extends Record<string, unknown> = Record<string, unknown>> = {
  align?: TableCardAlign;
  /** Cell value when not using `render`; also used for sorting unless `sortValue` is set */
  accessor?: (row: Row) => unknown;
  header: ReactNode;
  /**
   * Plain-text name when `header` is not a string (used for sort control `aria-label`
   * and similar). Falls back to `id`.
   */
  headerLabel?: string;
  /** When true, this column is omitted from the stacked mobile card body */
  hideOnMobile?: boolean;
  id: string;
  /** Field name on the row; ignored when `accessor` is provided */
  key?: keyof Row | string;
  render?: (row: Row, rowIndex: number) => ReactNode;
  sortable?: boolean;
  /** Value used only for sorting (e.g. ISO date while `render` shows a formatted label) */
  sortValue?: (row: Row) => unknown;
  width?: string;
};

export type TableCardSortState = {
  columnId: string;
  direction: TableCardSortDirection;
};

export type TableCardProps<Row extends Record<string, unknown> = Record<string, unknown>> = {
  ariaLabel?: string;
  caption?: string;
  className?: string;
  columns: TableCardColumn<Row>[];
  defaultSelectedRowKeys?: string[];
  emptyMessage?: string;
  isLoading?: boolean;
  loadingMessage?: string;
  onSelectionChange?: (selectedRowKeys: string[]) => void;
  onSortChange?: (sortState: TableCardSortState | null) => void;
  onRowClick?: (row: Row, rowIndex: number) => void;
  rowClassName?: string;
  /** Stable row id: property name or function. Defaults to row index (not ideal for selection/sort). */
  rowKey?: keyof Row | ((row: Row, rowIndex: number) => string);
  rows: Row[];
  selectableRows?: boolean;
  selectedRowKeys?: string[];
  sortState?: TableCardSortState | null;
  subtitle?: string;
  title?: string;
  titleBadge?: string;
};
