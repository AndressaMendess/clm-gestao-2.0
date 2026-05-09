import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "./index";

const meta = {
  title: "Components/UI/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  globals: {
    backgrounds: { value: "primary" },
  },
  decorators: [
    (Story) => (
      <div className="rounded-xl bg-[var(--background-primary)] p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    children: "Badge",
    variant: "default",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    appearance: "default",
    children: "Badge",
    variant: "default",
  },
};

export const Success: Story = {
  args: { variant: "success", children: "Aprovado" },
};

export const Error: Story = {
  args: { variant: "error", children: "Rejeitado" },
};

export const Warning: Story = {
  args: { variant: "warning", children: "Atenção" },
};

export const Dot: Story = {
  args: { appearance: "dot", variant: "blue", children: "Online" },
};

export const WithIcon: Story = {
  args: {
    appearance: "icon",
    variant: "success",
    icon: <CheckCircle2 size={14} />,
    children: "Concluído",
  },
};

export const Subtle: Story = {
  args: { variant: "subtle", children: "Rascunho" },
  globals: {
    backgrounds: { value: "primary" },
  },
};
