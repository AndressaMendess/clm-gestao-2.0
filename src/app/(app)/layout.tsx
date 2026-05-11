"use client";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { ContentShell } from "@/components/ui/content-shell";
import { Sidebar } from "@/components/ui/sidebar";
import type { SidebarItemId } from "@/components/ui/sidebar";

type NavRouteItemId = "overview" | "students" | "attendance" | "teachers" | "settings";

const navRouteDefs: { itemId: NavRouteItemId; route: string; matchPrefix: string }[] = [
  { itemId: "students", route: "/students", matchPrefix: "/students" },
  { itemId: "attendance", route: "/attendance", matchPrefix: "/attendance" },
  { itemId: "teachers", route: "/teachers", matchPrefix: "/teachers" },
  { itemId: "settings", route: "/settings", matchPrefix: "/settings" },
  { itemId: "overview", route: "/overview", matchPrefix: "/overview" },
];

const navRouteMap = Object.fromEntries(navRouteDefs.map(({ itemId, route }) => [itemId, route])) as Record<
  NavRouteItemId,
  string
>;

function isNavRouteItemId(itemId: SidebarItemId): itemId is NavRouteItemId {
  return itemId in navRouteMap;
}

function resolveActiveItem(pathname: string): SidebarItemId {
  const activeDef = navRouteDefs.find((def) => pathname.startsWith(def.matchPrefix));
  return activeDef?.itemId ?? "overview";
}

function resolveActiveModule(pathname: string): string | null {
  if (pathname === "/modules/module-i" || pathname.startsWith("/modules/module-i/")) return "module-i";
  if (pathname === "/modules/module-ii" || pathname.startsWith("/modules/module-ii/")) return "module-ii";
  if (pathname === "/modules/module-iii" || pathname.startsWith("/modules/module-iii/")) return "module-iii";
  return null;
}

type AppShellProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const activeItem = resolveActiveItem(pathname);
  const activeModule = resolveActiveModule(pathname);

  return (
    <main className="min-h-screen bg-[var(--background-secondary)]">
      <div
        aria-hidden={!isSidebarOpen}
        className={isSidebarOpen ? "pointer-events-auto lg:hidden" : "pointer-events-none lg:hidden"}
      >
        <Sidebar
          instanceId="mobile-sidebar"
          activeItem={activeItem}
          activeModuleId={activeModule}
          collapsible={false}
          isCollapsed={false}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onNavigate={(itemId) => {
            if (isNavRouteItemId(itemId)) router.push(navRouteMap[itemId]);
            setIsSidebarOpen(false);
          }}
          onNavigateModule={(moduleId) => {
            router.push(`/modules/${moduleId}`);
            setIsSidebarOpen(false);
          }}
          showFloatingTrigger={false}
        />
      </div>

      <div className="flex min-h-screen">
        <div className="hidden lg:block">
          <Sidebar
            instanceId="desktop-sidebar"
            activeItem={activeItem}
            activeModuleId={activeModule}
            isCollapsed={isSidebarCollapsed}
            isOpen
            onNavigate={(itemId) => {
              if (isNavRouteItemId(itemId)) router.push(navRouteMap[itemId]);
            }}
            onNavigateModule={(moduleId) => {
              router.push(`/modules/${moduleId}`);
            }}
            onToggleCollapse={() => setIsSidebarCollapsed((current) => !current)}
            showFloatingTrigger={false}
          />
        </div>

        <div className="flex-1 min-w-0">
          <ContentShell
            className="p-0"
            contentClassName="min-h-screen"
            onMenuClick={() => setIsSidebarOpen(true)}
          >
            {children}
          </ContentShell>
        </div>
      </div>
    </main>
  );
}
