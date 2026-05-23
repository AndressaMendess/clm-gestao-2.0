import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { House } from "lucide-react";
import { NavItem } from "./index";

const meta = {
  title: "Components/UI/NavItem",
  component: NavItem,
  parameters: { layout: "centered" },
  args: {
    label: "Visao geral",
    icon: House,
    state: "inactive",
    variant: "simple",
  },
} satisfies Meta<typeof NavItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Active: Story = {
  args: {
    state: "active",
  },
};

export const Collapsed: Story = {
  args: {
    variant: "simple-collapsed",
  },
};

export const Composite: Story = {
  args: {
    variant: "composite",
    showChevron: true,
    ariaExpanded: true,
    children: <NavItem label="Subitem" variant="subitem" />,
  },
};
