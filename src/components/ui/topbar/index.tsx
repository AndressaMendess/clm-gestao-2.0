"use client";

import { Menu, Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { tokens } from "../../../../design-system/tokens";
import { IconButton } from "../button";
import {
  topbarActionsStyles,
  topbarDesktopGroupStyles,
  topbarMenuButtonStyles,
  topbarMobileGroupStyles,
  topbarQuoteStyles,
  topbarRootStyles,
} from "./topbar.styles";
import type { TopbarProps } from "./topbar.types";

const THEME_STORAGE_KEY = "clm-theme";
const darkThemeClass = "dark";

export function Topbar({ onMenuClick, showMenuButton = true }: TopbarProps) {
  const availableThemes = useMemo(
    () => Object.keys(tokens.colors.semantic.background.primary) as Array<"light" | "dark">,
    [],
  );
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    const storedThemeIsValid = storedTheme && availableThemes.includes(storedTheme as "light" | "dark");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initialTheme = storedThemeIsValid
      ? (storedTheme as "light" | "dark")
      : systemPrefersDark
        ? "dark"
        : "light";

    root.classList.toggle(darkThemeClass, initialTheme === "dark");
    setTheme(initialTheme);
  }, [availableThemes]);

  function handleToggleTheme() {
    const root = document.documentElement;
    const nextTheme = theme === "dark" ? "light" : "dark";

    root.classList.toggle(darkThemeClass, nextTheme === "dark");
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    setTheme(nextTheme);
  }

  return (
    <header className={topbarRootStyles}>
      <p className={topbarQuoteStyles}>A música é a linguagem universal da humanidade. - Henry Wadsworth Longfellow.</p>

      <div className={topbarMobileGroupStyles}>
        <div className={topbarActionsStyles}>
          {showMenuButton ? (
            <button
              aria-label="Abrir menu"
              className={topbarMenuButtonStyles}
              onClick={onMenuClick}
              type="button"
            >
              <Menu className="h-5 w-5" />
            </button>
          ) : null}

          <IconButton
            icon={theme === "dark" ? Sun : Moon}
            label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
            onClick={handleToggleTheme}
          />
        </div>

        <Image alt="CLM Gestão" className="h-8 w-auto object-contain" height={33} src="/images/clm-logo.svg" width={110} />
      </div>

      <div className={topbarDesktopGroupStyles}>
        <IconButton
          icon={theme === "dark" ? Sun : Moon}
          label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
          onClick={handleToggleTheme}
        />
      </div>
    </header>
  );
}

export type { TopbarProps } from "./topbar.types";
