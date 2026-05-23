import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { Button } from "../button";
import { PopUp } from "./index";

const meta = {
  title: "Components/UI/PopUp",
  component: PopUp,
  parameters: { layout: "centered" },
  args: {
    title: "Excluir aluno",
    subtitle: "Tem certeza que deseja excluir este aluno?",
    icon: AlertTriangle,
    isOpen: true,
    onClose: () => undefined,
    onConfirm: () => undefined,
  },
} satisfies Meta<typeof PopUp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {};

export const Playground: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setIsOpen(true)} variant="primary">
          Abrir PopUp
        </Button>
        <PopUp
          {...args}
          isOpen={isOpen}
          onCancel={() => setIsOpen(false)}
          onClose={() => setIsOpen(false)}
          onConfirm={() => setIsOpen(false)}
        />
      </div>
    );
  },
};
