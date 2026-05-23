import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ListCollapsible } from "./index";

const meta = {
  title: "Components/UI/ListCollapsible",
  component: ListCollapsible,
  parameters: { layout: "centered" },
  args: {
    title: "Pendencias",
    subtitle: "Itens para revisar",
    items: [
      { id: "1", text: "Documento RG", secondaryText: "Enviado em 20/05", badgeLabel: "Pendente", badgeVariant: "warning" },
      { id: "2", text: "Comprovante", secondaryText: "Enviado em 19/05", badgeLabel: "Aprovado", badgeVariant: "success" },
    ],
  },
} satisfies Meta<typeof ListCollapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    items: [],
  },
};

export const Collapsed: Story = {
  args: {
    defaultExpanded: false,
  },
};
