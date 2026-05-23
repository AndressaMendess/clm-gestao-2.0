import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "./index";

const meta = {
  title: "Components/UI/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  args: {
    name: "Ana Costa",
    initials: "AC",
    size: "md",
    variant: "without-image",
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const WithImage: Story = {
  args: {
    variant: "with-image",
    src: "/images/clm-logo.svg",
    alt: "Avatar com imagem",
  },
};
