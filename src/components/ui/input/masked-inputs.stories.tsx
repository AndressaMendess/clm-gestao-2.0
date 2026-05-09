import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CpfInput, PhoneInput, RgInput } from "./index";

const meta = {
  title: "Components/UI/Input/Masked",
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="grid w-[360px] grid-cols-1 gap-4 rounded-xl bg-[var(--background-primary)] p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const CPF: Story = {
  render: () => <CpfInput label="CPF" placeholder="000.000.000-00" />,
};

export const RG: Story = {
  render: () => <RgInput label="RG" placeholder="00.000.000-0" />,
};

export const Phone: Story = {
  render: () => <PhoneInput label="Telefone" placeholder="(00) 00000-0000" />,
};
