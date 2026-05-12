import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SelectField } from "./index";

const options = [
  { label: "Turma A", value: "a" },
  { label: "Turma B", value: "b" },
  { label: "Turma C", value: "c" },
];

const meta = {
  title: "Components/UI/SelectField",
  component: SelectField,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Para integração com formulários, use `onValueChange` ou `onChange` (ambos retornam `string`). A opção neutra sempre usa o texto do placeholder e retorna valor vazio (`\"\"`).",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[360px] rounded-xl bg-[var(--background-primary)] p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    label: "Turma",
    options,
    placeholder: "Selecione uma turma",
  },
} satisfies Meta<typeof SelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithLabel: Story = {};

export const Error: Story = {
  args: {
    helperText: "Selecione uma turma válida.",
    tone: "error",
  },
};

