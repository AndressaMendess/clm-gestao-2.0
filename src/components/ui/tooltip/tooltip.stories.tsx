import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tooltip } from "./index";

const meta = {
  title: "Components/UI/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
  args: {
    content: "Texto de apoio",
    children: (
      <span className="inline-flex rounded-md border border-[var(--border-primary)] px-3 py-1 text-sm">
        Passe o mouse
      </span>
    ),
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
