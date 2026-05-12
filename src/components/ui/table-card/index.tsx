import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import { isValidElement, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import { Badge } from "../badge";
import { Button } from "../button";
import { Checkbox } from "../checkbox";
import {
  getTableCardAlignStyles,
  getTableCardFlexAlignStyles,
  tableCardBodyCellBaseStyles,
  tableCardBodyRowStyles,
  tableCardClickableRowStyles,
  tableCardContainerStyles,
  tableCardHeadSortButtonStyles,
  tableCardHeadCellBaseStyles,
  tableCardHeaderBarStyles,
  tableCardMobileFieldLabelStyles,
  tableCardMobileFieldStyles,
  tableCardMobileItemStyles,
  tableCardMobileListStyles,
  tableCardMobileRowTopStyles,
  tableCardPaginationPageButtonActiveStyles,
  tableCardPaginationPageButtonBaseStyles,
  tableCardPaginationPagesStyles,
  tableCardPaginationStyles,
  tableCardHeadRowStyles,
  tableCardScrollWrapperStyles,
  tableCardSelectionCellStyles,
  tableCardTableMinWidthStyles,
  tableCardStatusCellStyles,
  tableCardStatusRowStyles,
  tableCardTableStyles,
  tableCardSubtitleStyles,
  tableCardTitleBadgeStyles,
  tableCardTitleStyles,
} from "./table-card.styles";
import type {
  TableCardColumn,
  TableCardProps,
  TableCardSortDirection,
  TableCardSortState,
} from "./table-card.types";

function getColumnHeaderLabel<Row extends Record<string, unknown>>(column: TableCardColumn<Row>): string {
  if (typeof column.header === "string") return column.header;
  return column.headerLabel ?? column.id;
}

function getRawCellValue<Row extends Record<string, unknown>>(
  row: Row,
  column: TableCardColumn<Row>,
): unknown {
  if (column.accessor) return column.accessor(row);
  if (column.key !== undefined && column.key !== "") {
    return row[column.key as keyof Row];
  }
  return undefined;
}

function getSortComparableValue<Row extends Record<string, unknown>>(
  row: Row,
  column: TableCardColumn<Row>,
): unknown {
  if (column.sortValue) return column.sortValue(row);
  return getRawCellValue(row, column);
}

function formatCellValue(value: unknown): ReactNode {
  if (value == null) return "-";
  if (isValidElement(value)) return value;
  if (typeof value === "boolean") return value ? "Sim" : "Não";
  if (typeof value === "number") return Number.isFinite(value) ? value : "-";
  if (typeof value === "bigint") return String(value);
  if (typeof value === "string") return value;
  if (value instanceof Date) return value.toLocaleString("pt-BR");
  if (Array.isArray(value)) return value.length ? value.map((item) => formatCellValue(item)).join(", ") : "-";
  if (typeof value === "object") return "-";
  return String(value);
}

function resolveRowKey<Row extends Record<string, unknown>>(
  rowKey: TableCardProps<Row>["rowKey"],
  row: Row,
  rowIndex: number,
): string {
  if (typeof rowKey === "function") return rowKey(row, rowIndex);
  if (typeof rowKey === "string") return String(row[rowKey as keyof Row] ?? rowIndex);
  return String(rowIndex);
}

function compareValues(a: unknown, b: unknown, direction: TableCardSortDirection): number {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  if (typeof a === "number" && typeof b === "number") {
    return direction === "asc" ? a - b : b - a;
  }

  const left = String(a).toLocaleLowerCase();
  const right = String(b).toLocaleLowerCase();
  if (left === right) return 0;
  if (direction === "asc") return left > right ? 1 : -1;
  return left < right ? 1 : -1;
}

export function TableCard<Row extends Record<string, unknown>>({
  ariaLabel = "Tabela de dados",
  caption,
  className,
  columns,
  defaultSelectedRowKeys = [],
  emptyMessage = "Nenhum dado encontrado.",
  isLoading = false,
  loadingMessage = "Carregando dados...",
  onSelectionChange,
  onSortChange,
  onRowClick,
  rowClassName,
  rowKey,
  rows,
  pageSize = 10,
  selectableRows = false,
  selectedRowKeys,
  sortState,
  subtitle,
  title,
  titleBadge,
}: TableCardProps<Row>) {
  const [internalSortState, setInternalSortState] = useState<TableCardSortState | null>(null);
  const [internalSelectedRowKeys, setInternalSelectedRowKeys] =
    useState<string[]>(defaultSelectedRowKeys);
  const [currentPage, setCurrentPage] = useState(1);
  const resolvedSortState = sortState === undefined ? internalSortState : sortState;
  const resolvedSelectedRowKeys =
    selectedRowKeys === undefined ? internalSelectedRowKeys : selectedRowKeys;
  const activeSortColumn = columns.find((column) => column.id === resolvedSortState?.columnId);

  const resolvedRows = useMemo(() => {
    if (!resolvedSortState || !activeSortColumn) return rows;
    const list = [...rows];
    list.sort((left, right) => {
      const leftValue = getSortComparableValue(left, activeSortColumn);
      const rightValue = getSortComparableValue(right, activeSortColumn);
      return compareValues(leftValue, rightValue, resolvedSortState.direction);
    });
    return list;
  }, [activeSortColumn, resolvedSortState, rows]);

  const hasRows = resolvedRows.length > 0;
  const shouldPaginate = !isLoading && resolvedRows.length > pageSize;
  const totalPages = shouldPaginate ? Math.ceil(resolvedRows.length / pageSize) : 1;
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageStart = (safeCurrentPage - 1) * pageSize;
  const pageEnd = pageStart + pageSize;
  const paginatedRows = shouldPaginate ? resolvedRows.slice(pageStart, pageEnd) : resolvedRows;
  const statusMessage = isLoading ? loadingMessage : emptyMessage;
  const showStatusRow = !hasRows || isLoading;
  const visibleRowKeys = paginatedRows.map((row, rowIndex) =>
    resolveRowKey(rowKey, row, pageStart + rowIndex),
  );
  const selectedVisibleCount = visibleRowKeys.filter((key) => resolvedSelectedRowKeys.includes(key)).length;
  const allVisibleSelected = visibleRowKeys.length > 0 && selectedVisibleCount === visibleRowKeys.length;
  const someVisibleSelected = selectedVisibleCount > 0 && !allVisibleSelected;

  const handleSort = (columnId: string, sortable?: boolean) => {
    if (!sortable) return;
    const current = resolvedSortState;
    const nextState: TableCardSortState =
      current?.columnId === columnId
        ? { columnId, direction: current.direction === "asc" ? "desc" : "asc" }
        : { columnId, direction: "asc" };

    if (sortState === undefined) {
      setInternalSortState(nextState);
    }
    onSortChange?.(nextState);
  };

  const updateSelection = (nextKeys: string[]) => {
    if (selectedRowKeys === undefined) {
      setInternalSelectedRowKeys(nextKeys);
    }
    onSelectionChange?.(nextKeys);
  };

  const handleToggleAll = () => {
    if (!selectableRows) return;
    if (allVisibleSelected) {
      const remaining = resolvedSelectedRowKeys.filter((key) => !visibleRowKeys.includes(key));
      updateSelection(remaining);
      return;
    }
    const merged = Array.from(new Set([...resolvedSelectedRowKeys, ...visibleRowKeys]));
    updateSelection(merged);
  };

  const handleToggleRow = (targetKey: string) => {
    if (!selectableRows) return;
    const exists = resolvedSelectedRowKeys.includes(targetKey);
    const nextKeys = exists
      ? resolvedSelectedRowKeys.filter((key) => key !== targetKey)
      : [...resolvedSelectedRowKeys, targetKey];
    updateSelection(nextKeys);
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(1, page - 1));
  };

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(totalPages, page + 1));
  };

  const handleGoToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  const renderCellValue = (row: Row, column: TableCardColumn<Row>, rowIndex: number) => {
    if (column.render) return column.render(row, rowIndex);
    return formatCellValue(getRawCellValue(row, column));
  };

  const mobileColumns = useMemo(
    () => columns.filter((column) => !column.hideOnMobile),
    [columns],
  );

  return (
    <div className={cx(tableCardContainerStyles, className)}>
      {title ? (
        <header className={tableCardHeaderBarStyles}>
          <h3 className={tableCardTitleStyles}>{title}</h3>
          {titleBadge ? (
            <Badge className={tableCardTitleBadgeStyles} variant="violet">
              {titleBadge}
            </Badge>
          ) : null}
          {subtitle ? <span className={tableCardSubtitleStyles}>{subtitle}</span> : null}
        </header>
      ) : null}

      <div className={tableCardScrollWrapperStyles}>
        <table aria-label={ariaLabel} className={cx(tableCardTableStyles, tableCardTableMinWidthStyles)}>
          {caption ? <caption className="sr-only">{caption}</caption> : null}

          <thead>
            <tr className={tableCardHeadRowStyles}>
              {selectableRows ? (
                <th className={tableCardSelectionCellStyles} scope="col">
                  <Checkbox
                    aria-label="Selecionar todas as linhas"
                    checked={allVisibleSelected}
                    indeterminate={someVisibleSelected}
                    onChange={handleToggleAll}
                  />
                </th>
              ) : null}
              {columns.map((column) => (
                <th
                  className={cx(tableCardHeadCellBaseStyles, getTableCardAlignStyles(column.align))}
                  key={column.id}
                  scope="col"
                  style={column.width ? { width: column.width } : undefined}
                >
                  {column.sortable ? (
                    <button
                      aria-label={`Reordenar coluna ${getColumnHeaderLabel(column)}`}
                      className={tableCardHeadSortButtonStyles}
                      onClick={() => handleSort(column.id, column.sortable)}
                      type="button"
                    >
                      <span className={cx("inline-flex w-full items-center gap-1", getTableCardFlexAlignStyles(column.align))}>
                        <span>{column.header}</span>
                        {resolvedSortState?.columnId === column.id ? (
                          resolvedSortState.direction === "asc" ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )
                        ) : (
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        )}
                      </span>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {showStatusRow ? (
              <tr className={tableCardStatusRowStyles}>
                <td className={tableCardStatusCellStyles} colSpan={columns.length + (selectableRows ? 1 : 0)}>
                  {statusMessage}
                </td>
              </tr>
            ) : null}

            {!isLoading
              ? paginatedRows.map((row, rowIndex) => {
                  const interactive = Boolean(onRowClick);
                  const absoluteRowIndex = pageStart + rowIndex;
                  const currentRowKey = resolveRowKey(rowKey, row, absoluteRowIndex);
                  return (
                    <tr
                      className={cx(
                        tableCardBodyRowStyles,
                        interactive && tableCardClickableRowStyles,
                        rowClassName,
                      )}
                      key={currentRowKey}
                      onClick={interactive ? () => onRowClick?.(row, absoluteRowIndex) : undefined}
                      onKeyDown={
                        interactive
                          ? (event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                onRowClick?.(row, absoluteRowIndex);
                              }
                            }
                          : undefined
                      }
                      tabIndex={interactive ? 0 : undefined}
                    >
                      {selectableRows ? (
                        <td className={tableCardSelectionCellStyles} onClick={(event) => event.stopPropagation()}>
                          <Checkbox
                            aria-label={`Selecionar linha ${rowIndex + 1}`}
                            checked={resolvedSelectedRowKeys.includes(currentRowKey)}
                            onChange={() => handleToggleRow(currentRowKey)}
                          />
                        </td>
                      ) : null}
                      {columns.map((column) => (
                        <td
                          className={cx(tableCardBodyCellBaseStyles, getTableCardAlignStyles(column.align))}
                          key={column.id}
                        >
                          <div className={cx("w-full", getTableCardAlignStyles(column.align))}>
                            {renderCellValue(row, column, rowIndex)}
                          </div>
                        </td>
                      ))}
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>

      <div className={tableCardMobileListStyles}>
        {showStatusRow ? (
          <div className={tableCardStatusCellStyles}>{statusMessage}</div>
        ) : (
          paginatedRows.map((row, rowIndex) => {
            const interactive = Boolean(onRowClick);
            const absoluteRowIndex = pageStart + rowIndex;
            const currentRowKey = resolveRowKey(rowKey, row, absoluteRowIndex);
            return (
              <article
                className={cx(tableCardMobileItemStyles, interactive && tableCardClickableRowStyles, rowClassName)}
                key={currentRowKey}
                onClick={interactive ? () => onRowClick?.(row, absoluteRowIndex) : undefined}
                onKeyDown={
                  interactive
                    ? (event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          onRowClick?.(row, absoluteRowIndex);
                        }
                      }
                    : undefined
                }
                tabIndex={interactive ? 0 : undefined}
              >
                {selectableRows ? (
                  <div className={tableCardMobileRowTopStyles} onClick={(event) => event.stopPropagation()}>
                    <Checkbox
                      aria-label={`Selecionar linha ${rowIndex + 1}`}
                      checked={resolvedSelectedRowKeys.includes(currentRowKey)}
                      onChange={() => handleToggleRow(currentRowKey)}
                    />
                  </div>
                ) : null}

                {mobileColumns.map((column) => (
                  <div className={tableCardMobileFieldStyles} key={column.id}>
                    <span className={tableCardMobileFieldLabelStyles}>{column.header}</span>
                    <div>{renderCellValue(row, column, absoluteRowIndex)}</div>
                  </div>
                ))}
              </article>
            );
          })
        )}
      </div>

      {shouldPaginate ? (
        <footer className={tableCardPaginationStyles}>
          <Button
            aria-label="Página anterior"
            disabled={safeCurrentPage === 1}
            icon={ChevronLeft}
            variant="icon"
            onClick={goToPreviousPage}
          />
          <div className={tableCardPaginationPagesStyles}>
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              const isActivePage = page === safeCurrentPage;
              return (
                <button
                  aria-current={isActivePage ? "page" : undefined}
                  aria-label={`Ir para página ${page}`}
                  className={cx(
                    tableCardPaginationPageButtonBaseStyles,
                    isActivePage && tableCardPaginationPageButtonActiveStyles,
                  )}
                  key={page}
                  onClick={() => handleGoToPage(page)}
                  type="button"
                >
                  {page}
                </button>
              );
            })}
          </div>
          <Button
            aria-label="Próxima página"
            disabled={safeCurrentPage === totalPages}
            icon={ChevronRight}
            variant="icon"
            onClick={goToNextPage}
          />
        </footer>
      ) : null}
    </div>
  );
}

export type { TableCardAlign, TableCardColumn, TableCardProps } from "./table-card.types";
