"use client";

import {
  ClipboardList,
  Home,
  LogOut,
  Menu,
  Music2,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  UserRound,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { cx } from "@/lib/cx";
import { NavItem } from "../nav-item";
import {
  getSidebarOverlayStateStyles,
  getSidebarStateStyles,
  sidebarBrandStyles,
  sidebarContentStyles,
  sidebarDividerStyles,
  sidebarFooterStyles,
  sidebarHeaderStyles,
  sidebarIconButtonStyles,
  sidebarLogoutStyles,
  sidebarModulesListStyles,
  sidebarNavBlocksStyles,
  sidebarNavStyles,
  sidebarOverlayStyles,
  sidebarShellStyles,
  sidebarUserEmailStyles,
  sidebarUserNameStyles,
} from "./sidebar.styles";
import type { SidebarNavItem, SidebarProps } from "./sidebar.types";

const defaultPrimaryItems: SidebarNavItem[] = [
  { id: "overview", icon: Home, label: "Visao geral" },
  { id: "students", icon: Users, label: "Alunos" },
  { id: "attendance", icon: ClipboardList, label: "Presencas" },
];

const defaultSecondaryItems: SidebarNavItem[] = [
  { id: "teachers", icon: UserRound, label: "Professores" },
  { id: "settings", icon: Settings, label: "Configuracoes" },
];

const defaultModules = [
  { id: "module-i", label: "Modulo I" },
  { id: "module-ii", label: "Modulo II" },
  { id: "module-iii", label: "Modulo III" },
];

const defaultUser = {
  email: "andressa.clm@gmail.com",
  name: "Andressa Mendes",
};

export function Sidebar({
  activeItem,
  activeModuleId = null,
  isCollapsed = false,
  isOpen = false,
  moduleItems = defaultModules,
  onClose,
  onLogout,
  onNavigate,
  onNavigateModule,
  onToggleCollapse,
  primaryItems = defaultPrimaryItems,
  secondaryItems = defaultSecondaryItems,
  showOverlay = true,
  showFloatingTrigger = true,
  user = defaultUser,
}: SidebarProps) {
  const [isModulesOpen, setIsModulesOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(activeModuleId);

  useEffect(() => {
    setSelectedModuleId(activeModuleId);
  }, [activeModuleId]);

  const isDesktopCollapsed = isCollapsed;
  const showLabels = !isDesktopCollapsed;
  const ToggleIcon = isDesktopCollapsed ? PanelLeftOpen : PanelLeftClose;

  const primaryBlockItems = useMemo(() => primaryItems.slice(0, 3), [primaryItems]);
  const secondaryBlockItems = useMemo(() => secondaryItems.slice(0, 2), [secondaryItems]);

  return (
    <>
      {showOverlay ? (
        <div
          aria-hidden={!isOpen}
          className={cx(sidebarOverlayStyles, getSidebarOverlayStateStyles(isOpen))}
          onClick={onClose}
        />
      ) : null}

      <aside className={cx(sidebarShellStyles, getSidebarStateStyles(isDesktopCollapsed, isOpen))}>
        <header className={sidebarHeaderStyles}>
          <div className={sidebarBrandStyles}>
            <Image
              alt="CLM Gestao"
              className={cx("h-8 w-auto object-contain", showLabels ? "inline-flex" : "hidden")}
              height={33}
              priority
              src="/images/clm-logo.svg"
              width={110}
            />
            {!showLabels ? (
              <span aria-hidden className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] bg-[var(--brand-primary-main)] text-[var(--content-inverse)] [font-size:var(--typography-body-small-font-size)] [font-weight:600]">
                CLM
              </span>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <button
              aria-label={isDesktopCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
              className="hidden lg:inline-flex"
              onClick={onToggleCollapse}
              type="button"
            >
              <span className={sidebarIconButtonStyles}>
                <ToggleIcon className="h-5 w-5" />
              </span>
            </button>
            <button aria-label="Fechar menu" className="inline-flex lg:hidden" onClick={onClose} type="button">
              <span className={sidebarIconButtonStyles}>
                <X className="h-5 w-5" />
              </span>
            </button>
          </div>
        </header>

        <div className={sidebarContentStyles}>
          <div className={sidebarNavBlocksStyles}>
            <div>
              <nav aria-label="Navegacao principal" className={sidebarNavStyles}>
                {primaryBlockItems.map((item) => {
                  const isActive = item.id === activeItem;
                  return (
                    <NavItem
                      icon={item.icon}
                      key={item.id}
                      label={item.label}
                      onClick={() => onNavigate(item.id)}
                      showLabel={showLabels}
                      state={isActive ? "active" : "inactive"}
                      variant={showLabels ? "simple" : "simple-collapsed"}
                    />
                  );
                })}
              </nav>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className={sidebarDividerStyles} />
              <nav aria-label="Navegacao secundaria" className={sidebarNavStyles}>
                <NavItem
                  ariaControls="sidebar-modules-subitems"
                  ariaExpanded={isModulesOpen}
                  icon={Music2}
                  label="Modulos"
                  onClick={() => setIsModulesOpen((current) => !current)}
                  showChevron={showLabels}
                  showLabel={showLabels}
                  state={isModulesOpen ? "active" : "inactive"}
                  variant={showLabels ? "composite" : "composite-collapsed"}
                >
                  {isModulesOpen && showLabels ? (
                    <div className={sidebarModulesListStyles} id="sidebar-modules-subitems">
                      {moduleItems.map((moduleItem) => {
                        const isActive = moduleItem.id === selectedModuleId;
                        return (
                          <NavItem
                            key={moduleItem.id}
                            label={moduleItem.label}
                            onClick={() => {
                              setSelectedModuleId(moduleItem.id);
                              onNavigateModule?.(moduleItem.id);
                            }}
                            showLabel
                            state={isActive ? "active" : "inactive"}
                            variant="subitem"
                          />
                        );
                      })}
                    </div>
                  ) : null}
                </NavItem>

                {secondaryBlockItems.map((item) => {
                  const isActive = item.id === activeItem;
                  return (
                    <NavItem
                      icon={item.icon}
                      key={item.id}
                      label={item.label}
                      onClick={() => onNavigate(item.id)}
                      showLabel={showLabels}
                      state={isActive ? "active" : "inactive"}
                      variant={showLabels ? "simple" : "simple-collapsed"}
                    />
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        <footer className={sidebarFooterStyles}>
          {showLabels ? (
            <div>
              <p className={sidebarUserNameStyles}>{user.name}</p>
              <p className={sidebarUserEmailStyles}>{user.email}</p>
            </div>
          ) : null}

          <button aria-label="Sair" className={sidebarLogoutStyles} onClick={onLogout} type="button">
            <LogOut className="h-4 w-4 shrink-0" />
            {showLabels ? <span>Sair</span> : null}
          </button>
        </footer>
      </aside>

      {showFloatingTrigger ? (
        <button
          aria-label="Abrir menu"
          className="fixed bottom-4 left-4 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-primary)] bg-[var(--background-primary)] text-[var(--content-primary)] shadow-[0_8px_24px_rgb(0_0_0_/_0.12)] lg:hidden"
          onClick={onToggleCollapse ?? onClose}
          type="button"
        >
          <Menu className="h-5 w-5" />
        </button>
      ) : null}
    </>
  );
}

export type { SidebarItemId, SidebarModuleItem, SidebarNavItem, SidebarProps } from "./sidebar.types";
