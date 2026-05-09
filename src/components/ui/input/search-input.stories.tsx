import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SearchInput } from "./index";

const meta = {
  title: "Components/UI/Input/Search",
  component: SearchInput,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-[360px] rounded-xl bg-[var(--background-primary)] p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    placeholder: "Buscar aluno, turma, matrícula...",
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    defaultValue: "João",
  },
};

export const Error: Story = {
  args: {
    helperText: "Digite ao menos 3 caracteres.",
    tone: "error",
  },
};
