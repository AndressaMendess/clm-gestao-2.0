import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Button } from "../button";
import { Drawer } from "./index";

const meta = {
  title: "Components/UI/Drawer",
  component: Drawer,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: null,
    isOpen: false,
    onClose: () => undefined,
    statusLabel: "Ativo",
    studentName: "Thiago Fernandes Luz",
    tabs: [],
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [tabValue, setTabValue] = useState("overview");

    return (
      <div className="min-h-screen bg-[var(--background-secondary)] p-6">
        <Button onClick={() => setIsOpen(true)} variant="primary">
          Abrir drawer
        </Button>
        <Drawer
          avatarInitials="TL"
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onDeleteStudent={() => undefined}
          onEditStudent={() => undefined}
          onTabChange={setTabValue}
          statusLabel="Ativo"
          statusVariant="success"
          studentName="Thiago Fernandes Luz"
          tabValue={tabValue}
          tabs={[
            { id: "overview", label: "Resumo" },
            { id: "enrollment", label: "Matrícula" },
            { id: "history", label: "Histórico" },
          ]}
        >
          <div className="grid gap-2">
            <strong className="text-[var(--content-primary)]">Conteúdo dinâmico</strong>
            <p className="text-[var(--content-secondary)]">
              A estrutura permanece fixa em header, tabs e conteúdo.
            </p>
          </div>
        </Drawer>
      </div>
    );
  },
};
