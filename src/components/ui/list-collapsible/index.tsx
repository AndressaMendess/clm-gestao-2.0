"use client";

import { ChevronDown, ChevronUp, List } from "lucide-react";
import { useMemo, useState } from "react";
import { cx } from "@/lib/cx";
import { Badge } from "../badge";
import {
  listCollapsibleContentStyles,
  listCollapsibleEmptyStyles,
  listCollapsibleHeaderStyles,
  listCollapsibleItemStyles,
  listCollapsibleItemTextStyles,
  listCollapsibleListStyles,
  listCollapsibleRootStyles,
  listCollapsibleSubtitleStyles,
  listCollapsibleTitleGroupStyles,
  listCollapsibleTitleStyles,
} from "./list-collapsible.styles";
import type { ListCollapsibleProps } from "./list-collapsible.types";

export function ListCollapsible({
  className,
  defaultExpanded = true,
  disabled = false,
  expanded,
  icon: Icon = List,
  items = [],
  onExpandedChange,
  subtitle = "Itens da lista",
  title = "Lista",
}: ListCollapsibleProps) {
  const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
  const isExpanded = expanded ?? internalExpanded;
  const ChevronIcon = isExpanded ? ChevronUp : ChevronDown;

  const handleToggle = () => {
    if (disabled) return;
    const nextExpanded = !isExpanded;
    if (expanded === undefined) {
      setInternalExpanded(nextExpanded);
    }
    onExpandedChange?.(nextExpanded);
  };

  const hasItems = useMemo(() => items.length > 0, [items.length]);

  return (
    <section className={cx(listCollapsibleRootStyles, className)}>
      <button
        aria-expanded={isExpanded}
        className={listCollapsibleHeaderStyles}
        disabled={disabled}
        onClick={handleToggle}
        type="button"
      >
        <span className={listCollapsibleTitleGroupStyles}>
          <Icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--content-secondary)]" />
          <span className="grid min-w-0 gap-0.5">
            <span className={listCollapsibleTitleStyles}>{title}</span>
            <span className={listCollapsibleSubtitleStyles}>{subtitle}</span>
          </span>
        </span>
        <ChevronIcon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--content-tertiary)]" />
      </button>

      <div
        aria-hidden={!isExpanded}
        className={cx(
          "grid transition-all duration-300 ease-out",
          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className={listCollapsibleContentStyles}>
            {hasItems ? (
              <div className={listCollapsibleListStyles}>
                {items.map((item) => (
                  <article className={listCollapsibleItemStyles} key={item.id}>
                    <p className={listCollapsibleItemTextStyles}>{item.text}</p>
                    <Badge appearance="dot" variant={item.badgeVariant ?? "default"}>
                      {item.badgeLabel}
                    </Badge>
                  </article>
                ))}
              </div>
            ) : (
              <p className={listCollapsibleEmptyStyles}>Nenhum item disponível.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export type { ListCollapsibleItem, ListCollapsibleProps } from "./list-collapsible.types";
