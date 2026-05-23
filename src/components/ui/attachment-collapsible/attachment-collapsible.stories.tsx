import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AttachmentCollapsible } from "./index";

const meta = {
  title: "Components/UI/AttachmentCollapsible",
  component: AttachmentCollapsible,
  parameters: { layout: "centered" },
  args: {
    title: "Documentos pessoais",
    addButtonLabel: "Adicionar documento",
    initialItems: [
      { id: "1", name: "RG.pdf", sizeInBytes: 221000, url: "https://example.com/rg.pdf" },
      { id: "2", name: "Comprovante.jpg", sizeInBytes: 98000, url: "https://example.com/comprovante.jpg" },
    ],
  },
} satisfies Meta<typeof AttachmentCollapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    initialItems: [],
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
