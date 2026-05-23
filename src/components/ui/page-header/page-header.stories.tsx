import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageHeader } from "./index";

const meta = {
  title: "Components/UI/PageHeader",
  component: PageHeader,
  parameters: { layout: "padded" },
  args: {
    title: "Alunos",
    subtitle: "Gestao e acompanhamento",
    ctaLabel: "Novo aluno",
  },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutCTA: Story = {
  args: {
    ctaLabel: undefined,
  },
};
