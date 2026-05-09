import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DatePicker } from "./index";

const meta = {
  title: "Components/UI/Input/DatePicker",
  component: DatePicker,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-[360px] rounded-xl bg-[var(--background-primary)] p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    label: "Data de nascimento",
    placeholder: "dd/mm/aaaa",
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    defaultValue: "1995-04-22",
  },
};

export const Error: Story = {
  args: {
    helperText: "Data inválida.",
    tone: "error",
  },
};
