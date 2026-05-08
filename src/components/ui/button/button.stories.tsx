import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { tokens } from "../../../../design-system/tokens";
import { Button } from "./index";

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
};

export const Ghost: Story = {
  args: { variant: "ghost" },
};
