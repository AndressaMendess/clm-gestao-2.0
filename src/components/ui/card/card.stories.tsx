import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card } from "./index";

const meta = {
  title: "Components/UI/Card",
  component: Card,
  parameters: { layout: "centered" },
  args: {
    title: "Dados do aluno",
    fields: [
      { id: "name", label: "Nome", value: "Ana Costa" },
      { id: "module", label: "Modulo", value: "Modulo I" },
      { id: "classroom", label: "Turma", value: "Classe 2" },
      { id: "status", label: "Status", value: "Ativo" },
    ],
    columns: 1,
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TwoColumns: Story = {
  args: {
    columns: 2,
  },
};
