import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Users } from "lucide-react";
import { FeatureCard } from "./index";

const meta = {
  title: "Components/UI/FeatureCard",
  component: FeatureCard,
  parameters: { layout: "centered" },
  args: {
    title: "Alunos",
    subtitle: "Acesse o modulo de alunos",
    icon: Users,
  },
} satisfies Meta<typeof FeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AsLink: Story = {
  args: {
    href: "/students",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
