import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Checkbox, CheckboxField } from "./index";

const meta = {
  title: "Components/UI/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="rounded-xl bg-[var(--background-primary)] p-6">
        <Story />
      </div>
    ),
  ],
  args: {
    variant: "default",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Success: Story = {
  args: { variant: "success", defaultChecked: true },
};

export const Large: Story = {
  args: { size: "lg", variant: "success", defaultChecked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true, variant: "default" },
};

export const Disabled: Story = {
  args: { defaultChecked: true, disabled: true },
};

export const WithLabel: StoryObj<typeof CheckboxField> = {
  render: (args) => <CheckboxField {...args} />,
  args: {
    defaultChecked: true,
    description: "Receber notificações por e-mail",
    label: "Notificações",
    variant: "success",
  },
};
