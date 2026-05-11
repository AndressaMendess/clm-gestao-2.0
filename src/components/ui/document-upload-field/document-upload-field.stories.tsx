import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DocumentUploadField } from "./index";

const meta = {
  title: "Components/UI/DocumentUploadField",
  component: DocumentUploadField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "O `tone` e aplicado apenas no estado vazio. Quando existe erro de validacao, o estado `error` tem prioridade. Quando ha arquivo selecionado, o estado `success` e aplicado automaticamente. Para back-end, use `onFileChange` e `onFileStateChange`.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[420px] rounded-xl bg-[var(--background-primary)] p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    label: "Documento",
    maxSizeMb: 5,
  },
} satisfies Meta<typeof DocumentUploadField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithInitialTone: Story = {
  args: {
    tone: "success",
  },
};

export const ErrorToneWhenEmpty: Story = {
  args: {
    tone: "error",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
