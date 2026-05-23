import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LinkText } from "./index";

const meta = {
  title: "Components/UI/LinkText",
  component: LinkText,
  parameters: { layout: "centered" },
  args: {
    href: "#",
    children: "Esqueci minha senha",
  },
} satisfies Meta<typeof LinkText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    "aria-disabled": true,
  },
};
