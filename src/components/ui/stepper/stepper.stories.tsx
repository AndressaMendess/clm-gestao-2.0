import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Stepper } from "./index";

const defaultSteps = [
  { id: "student", label: "Aluno" },
  { id: "document", label: "Documentação" },
  { id: "review", label: "Revisão" },
  { id: "finish", label: "Finalizar" },
];

const meta = {
  title: "Components/UI/Stepper",
  component: Stepper,
  parameters: {
    layout: "padded",
  },
  args: {
    ariaLabel: "Progresso da matrícula",
    currentStep: 2,
    steps: defaultSteps,
  },
} satisfies Meta<typeof Stepper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FirstStep: Story = {
  args: {
    currentStep: 1,
  },
};

export const Completed: Story = {
  args: {
    currentStep: 4,
  },
};
