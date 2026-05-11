import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "../button";
import { ModalContainer } from "./index";

const meta = {
  title: "Components/UI/ModalContainer",
  component: ModalContainer,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    isOpen: true,
    onClose: () => undefined,
    title: "Adicionar aluno",
    subtitle: "Preencha os dados para continuar",
    children: (
      <div className="grid gap-2">
        <strong className="text-[var(--content-primary)]">Conteudo dinamico</strong>
        <p className="text-[var(--content-secondary)]">
          Esse espaco representa o miolo variavel de cada modal.
        </p>
      </div>
    ),
    footer: (
      <>
        <Button variant="ghost">Cancelar</Button>
        <Button variant="primary">Continuar</Button>
      </>
    ),
  },
  argTypes: {
    onClose: { action: "closed" },
  },
} satisfies Meta<typeof ModalContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    onClose: () => undefined,
  },
};

export const WithoutFooter: Story = {
  args: {
    onClose: () => undefined,
    footer: undefined,
  },
};

export const StaticBackdrop: Story = {
  args: {
    onClose: () => undefined,
    closeOnOverlayClick: false,
  },
};

export const Loading: Story = {
  args: {
    onClose: () => undefined,
    isLoading: true,
  },
};
