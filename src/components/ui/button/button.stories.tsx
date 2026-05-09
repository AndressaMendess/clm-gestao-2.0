import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Plus } from "lucide-react";
import { tokens } from "../../../../design-system/tokens";
import { Button, IconButton } from "./index";

const meta = {
  title: "Components/UI/Button",
  component: Button,
  parameters: { layout: "centered" },
  args: {
    children: "Salvar",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary" },
  parameters: {
    backgrounds: {
      options: {
        base: {
          name: "Base",
          value: tokens.colors.semantic.background.primary.light,
        },
      },
    },
  },
};

export const Secondary: Story = {
  args: { variant: "secondary" },
  parameters: {
    backgrounds: {
      options: {
        base: {
          name: "Base",
          value: tokens.colors.semantic.background.primary.light,
        },
      },
    },
  },
};

export const Ghost: Story = {
  args: { variant: "ghost" },
};

export const Danger: Story = {
  args: { variant: "danger", children: "Excluir" },
};

export const Small: Story = {
  args: { size: "sm", children: "Salvar" },
};

export const WithIcon: Story = {
  args: {
    children: "Buscar",
    icon: Plus,
  },
};

export const IconOnly: StoryObj<typeof IconButton> = {
  render: (args) => <IconButton {...args} />,
  args: {
    label: "Adicionar",
    icon: Plus,
  },
};
