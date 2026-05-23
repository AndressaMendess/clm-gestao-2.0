import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Plus } from "lucide-react";
import type { ReactNode } from "react";
import { tokens } from "../../../../design-system/tokens";
import { Button, IconButton } from "./index";

function ButtonStoryLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f4f7ff 0%, #eefbf4 100%)",
        border: "1px solid var(--border-primary)",
        borderRadius: "16px",
        display: "grid",
        gap: "16px",
        justifyItems: "center",
        minWidth: "320px",
        padding: "32px",
      }}
    >
      <p
        style={{
          color: "var(--content-secondary)",
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          margin: 0,
          textTransform: "uppercase",
        }}
      >
        Preview do componente
      </p>
      {children}
    </div>
  );
}

function SpecRow({
  code,
  description,
  preview,
  size,
}: {
  code: string;
  description: string;
  preview: ReactNode;
  size: string;
}) {
  return (
    <div
      style={{
        alignItems: "center",
        border: "1px solid var(--border-primary)",
        borderRadius: "12px",
        display: "grid",
        gap: "12px",
        gridTemplateColumns: "minmax(180px, 220px) minmax(120px, 140px) minmax(260px, 1fr) minmax(220px, 1fr)",
        padding: "14px",
      }}
    >
      <div style={{ display: "grid", gap: "6px" }}>
        <span style={{ color: "var(--content-tertiary)", fontSize: "11px", textTransform: "uppercase" }}>Codigo</span>
        <code style={{ color: "var(--content-primary)", fontSize: "12px" }}>{code}</code>
      </div>
      <div style={{ display: "grid", gap: "6px" }}>
        <span style={{ color: "var(--content-tertiary)", fontSize: "11px", textTransform: "uppercase" }}>Tamanho</span>
        <span style={{ color: "var(--content-primary)", fontSize: "12px" }}>{size}</span>
      </div>
      <p style={{ color: "var(--content-secondary)", fontSize: "13px", margin: 0 }}>{description}</p>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>{preview}</div>
    </div>
  );
}

const meta = {
  title: "Components/UI/Button",
  component: Button,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <ButtonStoryLayout>
        <Story />
      </ButtonStoryLayout>
    ),
  ],
  args: {
    children: "Salvar",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary" },
  parameters: {
    backgrounds: {
      options: {
        base: {
          name: "Base",
          value: tokens.colors.semantic.background.primary.light,
        },
      },
    },
  },
};

export const Secondary: Story = {
  args: { variant: "secondary" },
  parameters: {
    backgrounds: {
      options: {
        base: {
          name: "Base",
          value: tokens.colors.semantic.background.primary.light,
        },
      },
    },
  },
};

export const Ghost: Story = {
  args: { variant: "ghost" },
};

export const Danger: Story = {
  args: { variant: "danger", children: "Excluir" },
};

export const Small: Story = {
  args: { size: "sm", children: "Salvar" },
};

export const WithIcon: Story = {
  args: {
    children: "Buscar",
    icon: Plus,
  },
};

export const IconOnly: StoryObj<typeof IconButton> = {
  render: (args) => <IconButton {...args} />,
  args: {
    label: "Adicionar",
    icon: Plus,
  },
};

export const SpecSheet: Story = {
  render: () => (
    <div
      style={{
        background: "linear-gradient(180deg, #f8fafe 0%, #f1f8f1 100%)",
        border: "1px solid var(--border-primary)",
        borderRadius: "20px",
        display: "grid",
        gap: "20px",
        margin: "0 auto",
        maxWidth: "1060px",
        padding: "24px",
        width: "100%",
      }}
    >
      <header style={{ display: "grid", gap: "8px" }}>
        <h2 style={{ color: "var(--content-primary)", fontSize: "24px", margin: 0 }}>Button Spec Sheet</h2>
        <p style={{ color: "var(--content-secondary)", margin: 0 }}>
          Visao detalhada com variantes, tamanhos, e exemplos de codigo para implementacao.
        </p>
      </header>

      <section style={{ display: "grid", gap: "10px" }}>
        <h3 style={{ color: "var(--content-primary)", margin: 0 }}>Variantes principais</h3>
        <SpecRow
          code={'<Button variant="primary">Salvar</Button>'}
          description="Acao principal da tela. Maior contraste e prioridade visual."
          preview={<Button variant="primary">Salvar</Button>}
          size="md"
        />
        <SpecRow
          code={'<Button variant="secondary">Voltar</Button>'}
          description="Acao secundaria de apoio, sem competir com o CTA principal."
          preview={<Button variant="secondary">Voltar</Button>}
          size="md"
        />
        <SpecRow
          code={'<Button variant="ghost">Cancelar</Button>'}
          description="Acao neutra para contextos de baixa enfase visual."
          preview={<Button variant="ghost">Cancelar</Button>}
          size="md"
        />
        <SpecRow
          code={'<Button variant="danger">Excluir</Button>'}
          description="Acao destrutiva. Usar em fluxos de remocao ou risco."
          preview={<Button variant="danger">Excluir</Button>}
          size="md"
        />
      </section>

      <section style={{ display: "grid", gap: "10px" }}>
        <h3 style={{ color: "var(--content-primary)", margin: 0 }}>Tamanhos e icones</h3>
        <SpecRow
          code={'<Button size="sm">Salvar</Button>'}
          description="Versao compacta para barras de acao e espacos reduzidos."
          preview={<Button size="sm">Salvar</Button>}
          size="sm"
        />
        <SpecRow
          code={'<Button icon={Plus}>Novo</Button>'}
          description="Botao com icone para melhorar escaneabilidade da acao."
          preview={<Button icon={Plus}>Novo</Button>}
          size="md"
        />
        <SpecRow
          code={'<IconButton icon={Plus} label="Adicionar" />'}
          description="Acao iconica isolada. Sempre manter label acessivel."
          preview={<IconButton icon={Plus} label="Adicionar" />}
          size="icon"
        />
      </section>

      <section
        style={{
          background: "rgba(255,255,255,0.75)",
          border: "1px dashed var(--border-primary)",
          borderRadius: "14px",
          display: "grid",
          gap: "8px",
          padding: "16px",
        }}
      >
        <h3 style={{ color: "var(--content-primary)", margin: 0 }}>Guia rapido</h3>
        <p style={{ color: "var(--content-secondary)", margin: 0 }}>
          Use `primary` para CTA principal, `secondary` para acao de suporte, `ghost` para acoes neutras e `danger`
          para operacoes irreversiveis. Prefira `size="sm"` em areas densas e mantenha labels objetivas.
        </p>
      </section>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
