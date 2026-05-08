import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../styles/tokens.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "CLM Gestão",
  description: "Plataforma de gestão escolar",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
