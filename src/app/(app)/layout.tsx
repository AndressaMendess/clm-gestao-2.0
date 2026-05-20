"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useState } from "react";
import { AppProfileProvider, useAppProfile } from "./_context/app-profile-context";
import { ContentShell } from "@/components/ui/content-shell";
import { Sidebar } from "@/components/ui/sidebar";
import type { SidebarItemId } from "@/components/ui/sidebar";

type NavRouteItemId =
  | "overview"
  | "students"
  | "attendance"
  | "complementary-activities"
  | "teachers"
  | "settings";

const navRouteDefs: { itemId: NavRouteItemId; route: string; matchPrefix: string }[] = [
  { itemId: "students", route: "/students", matchPrefix: "/students" },
  { itemId: "attendance", route: "/attendance", matchPrefix: "/attendance" },
  {
    itemId: "complementary-activities",
    route: "/complementary-activities",
    matchPrefix: "/complementary-activities",
  },
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

type AppShellProps = {
  children: ReactNode;
};

function AppLayoutContent({ children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { profile } = useAppProfile();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isPlaygroundPage = pathname.startsWith("/playground");

  const activeItem = resolveActiveItem(pathname);

  return (
    <main className="min-h-screen bg-[var(--background-secondary)]">
      {!isPlaygroundPage ? (
        <div
          aria-hidden={!isSidebarOpen}
          className={isSidebarOpen ? "pointer-events-auto lg:hidden" : "pointer-events-none lg:hidden"}
        >
          <Sidebar
            instanceId="mobile-sidebar"
            activeItem={activeItem}
            collapsible={false}
            isCollapsed={false}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            onNavigate={(itemId) => {
              if (isNavRouteItemId(itemId)) router.push(navRouteMap[itemId]);
              setIsSidebarOpen(false);
            }}
            showFloatingTrigger={false}
            user={{ avatarSrc: profile.avatarSrc, email: profile.email, name: profile.name }}
          />
        </div>
      ) : null}

      <div className="flex min-h-screen overflow-visible">
        {!isPlaygroundPage ? (
          <div className="hidden lg:relative lg:z-[70] lg:block">
            <Sidebar
              instanceId="desktop-sidebar"
              collapsedWidthPx={88}
              expandedWidthPx={264}
              activeItem={activeItem}
              isCollapsed={isSidebarCollapsed}
              isOpen
              onNavigate={(itemId) => {
                if (isNavRouteItemId(itemId)) router.push(navRouteMap[itemId]);
              }}
              onToggleCollapse={() => setIsSidebarCollapsed((current) => !current)}
              showFloatingTrigger={false}
              user={{ avatarSrc: profile.avatarSrc, email: profile.email, name: profile.name }}
            />
          </div>
        ) : null}

        <div className="relative z-0 flex-1 min-w-0">
          <ContentShell
            className="p-0"
            contentClassName="min-h-screen py-8"
            onMenuClick={!isPlaygroundPage ? () => setIsSidebarOpen(true) : undefined}
            showTopbarMenuButton={!isPlaygroundPage}
          >
            {children}
          </ContentShell>
        </div>
      </div>
    </main>
  );
}

export default function AppLayout({ children }: AppShellProps) {
  return (
    <AppProfileProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </AppProfileProvider>
  );
}
