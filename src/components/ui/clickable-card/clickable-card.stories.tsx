import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ClickableCard } from "./index";

const meta = {
  title: "Components/UI/ClickableCard",
  component: ClickableCard,
  parameters: { layout: "centered" },
  args: {
    title: "Matriculas",
    subtitle: "Cadastre e acompanhe alunos",
  },
} satisfies Meta<typeof ClickableCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
