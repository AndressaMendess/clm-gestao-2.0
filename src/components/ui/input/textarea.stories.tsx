import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextArea } from "./index";

const meta = {
  title: "Components/UI/TextArea",
  component: TextArea,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-[420px] rounded-xl bg-[var(--background-primary)] p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    label: "Observações",
    placeholder: "Digite observações adicionais...",
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelper: Story = {
  args: {
    helperText: "Máximo recomendado de 500 caracteres.",
  },
};

export const Error: Story = {
  args: {
    helperText: "Preencha este campo.",
    tone: "error",
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: "Campo bloqueado.",
    disabled: true,
  },
};
