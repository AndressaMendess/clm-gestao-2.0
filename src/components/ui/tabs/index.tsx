"use client";

import { useId, useMemo, useState } from "react";
import type { KeyboardEvent } from "react";
import { cx } from "@/lib/cx";
import {
  tabsRootStyles,
  tabsTriggerActiveStyles,
  tabsTriggerBaseStyles,
  tabsTriggerInactiveStyles,
} from "./tabs.styles";
import type { TabsItem, TabsProps } from "./tabs.types";

function getInitialValue(items: TabsItem[], defaultValue?: string): string | undefined {
  if (!items.length) return undefined;
  if (defaultValue && items.some((item) => item.id === defaultValue && !item.disabled)) {
    return defaultValue;
  }
  return items.find((item) => !item.disabled)?.id;
}

export function Tabs({
  ariaLabel = "Abas",
  className,
  defaultValue,
  items,
  onValueChange,
  value,
}: TabsProps) {
  const groupId = useId();
  const [internalValue, setInternalValue] = useState<string | undefined>(
    getInitialValue(items, defaultValue),
  );
  const selectedValue = value ?? internalValue ?? getInitialValue(items, defaultValue);
  const enabledItems = useMemo(() => items.filter((item) => !item.disabled), [items]);

  const updateValue = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  };

  const focusTabById = (tabId: string) => {
    const element = document.getElementById(tabId);
    element?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, currentId: string) => {
    if (!enabledItems.length) return;
    const currentIndex = enabledItems.findIndex((item) => item.id === currentId);
    if (currentIndex < 0) return;

    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (currentIndex + direction + enabledItems.length) % enabledItems.length;
      const nextItem = enabledItems[nextIndex];
      updateValue(nextItem.id);
      focusTabById(`${groupId}-tab-${nextItem.id}`);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      const firstItem = enabledItems[0];
      updateValue(firstItem.id);
      focusTabById(`${groupId}-tab-${firstItem.id}`);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      const lastItem = enabledItems[enabledItems.length - 1];
      updateValue(lastItem.id);
      focusTabById(`${groupId}-tab-${lastItem.id}`);
    }
  };

  return (
    <div aria-label={ariaLabel} className={cx(tabsRootStyles, className)} role="tablist">
      {items.map((item) => {
        const isActive = selectedValue === item.id;
        return (
          <button
            aria-selected={isActive}
            className={cx(
              tabsTriggerBaseStyles,
              isActive ? tabsTriggerActiveStyles : tabsTriggerInactiveStyles,
            )}
            disabled={item.disabled}
            id={`${groupId}-tab-${item.id}`}
            key={item.id}
            onClick={() => updateValue(item.id)}
            onKeyDown={(event) => handleKeyDown(event, item.id)}
            role="tab"
            tabIndex={isActive ? 0 : -1}
            type="button"
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

export type { TabsItem, TabsProps } from "./tabs.types";
