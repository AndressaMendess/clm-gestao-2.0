import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ContentShell } from "./index";

const meta = {
  title: "Components/UI/ContentShell",
  component: ContentShell,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    children: (
      <div className="grid gap-2">
        <h3 className="text-[var(--content-primary)] [font-size:var(--typography-body-large-font-size)] [line-height:var(--typography-body-large-line-height)] [font-weight:600]">
          Conteudo da pagina
        </h3>
        <p className="text-[var(--content-secondary)]">
          Componente base para renderizar todas as paginas internas do sistema.
        </p>
      </div>
    ),
  },
} satisfies Meta<typeof ContentShell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};