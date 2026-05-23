import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Topbar } from "./index";

const meta = {
  title: "Components/UI/Topbar",
  component: Topbar,
  parameters: { layout: "fullscreen" },
  args: {
    showMenuButton: true,
  },
} satisfies Meta<typeof Topbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutMenuButton: Story = {
  args: {
    showMenuButton: false,
  },
};
