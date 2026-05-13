import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Tabs } from "./index";

const meta = {
  title: "Components/UI/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="rounded-xl bg-[var(--background-primary)] p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("students");
    return (
      <Tabs
        ariaLabel="Navegação por abas"
        items={[
          { id: "students", label: "Alunos" },
          { id: "classes", label: "Turmas" },
          { id: "modules", label: "Módulos" },
        ]}
        onValueChange={setValue}
        value={value}
      />
    );
  },
};
