import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./index";

const meta = {
  title: "Components/UI/Input",
  component: Input,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-[360px] rounded-xl bg-[var(--background-primary)] p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    label: "Nome",
    placeholder: "Digite seu nome",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelper: Story = {
  args: {
    helperText: "Use seu nome completo.",
  },
};

export const Error: Story = {
  args: {
    helperText: "Campo obrigatório.",
    tone: "error",
    value: "",
  },
};

export const Success: Story = {
  args: {
    defaultValue: "Andressa",
    helperText: "Nome válido.",
    tone: "success",
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: "Campo bloqueado",
    disabled: true,
  },
};
