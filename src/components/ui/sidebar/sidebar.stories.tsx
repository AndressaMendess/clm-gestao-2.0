import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Sidebar } from "./index";

const meta = {
  title: "Components/UI/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    activeItem: "overview",
    isCollapsed: false,
    isOpen: true,
    onNavigate: () => undefined,
  },
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {},
  render: (args) => {
    const [activeItem, setActiveItem] = useState(args.activeItem);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div className="min-h-screen bg-[var(--background-primary)] p-4">
        <Sidebar
          {...args}
          activeItem={activeItem}
          isCollapsed={isCollapsed}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onNavigate={(itemId) => setActiveItem(itemId)}
          onToggleCollapse={() => setIsCollapsed((current) => !current)}
        />
      </div>
    );
  },
};
