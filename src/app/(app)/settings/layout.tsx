"use client";

import { User, Users } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { NavItem } from "@/components/ui/nav-item";
import { PageHeader } from "@/components/ui/page-header";

type SettingsLayoutProps = {
  children: ReactNode;
};

const settingsNavItems = [
  { href: "/settings/profile", icon: User, label: "Perfil" },
  { href: "/settings/users", icon: Users, label: "Usuários" },
] as const;

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <section className="space-y-6">
      <PageHeader subtitle="Gerencie as configurações do sistema." title="Configurações" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="h-fit rounded-3xl bg-[var(--background-primary)]">
          <nav aria-label="Navegação das configurações" className="space-y-4">
            {settingsNavItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <NavItem
                  key={item.href}
                  icon={item.icon}
                  label={item.label}
                  onClick={() => router.push(item.href)}
                  state={isActive ? "active" : "inactive"}
                  variant="simple"
                />
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0 rounded-3xl border border-[var(--border-primary)] bg-[var(--background-primary)] p-6">
          {children}
        </div>
      </div>
    </section>
  );
}

