import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { tokens } from "../../../design-system/tokens";

const meta = {
  title: "Design Tokens/Colors",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function PaletteSection({ name, scale }: { name: string; scale: Record<string, string> }) {
  return (
    <section style={{ marginBottom: 24 }}>
      <h3 style={{ marginBottom: 12, fontFamily: tokens.typography.fontFamily.sans }}>{name}</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
        {Object.entries(scale).map(([key, value]) => (
          <div key={`${name}-${key}`} style={{ border: "1px solid #ddd", borderRadius: 8, overflow: "hidden" }}>
            <div style={{ height: 56, background: value }} />
            <div style={{ padding: 8, fontSize: 12, fontFamily: tokens.typography.fontFamily.sans }}>
              <div>{`${name}/${key}`}</div>
              <code>{value}</code>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export const Primitives: Story = {
  render: () => (
    <div style={{ padding: 24 }}>
      {Object.entries(tokens.colors.primitives).map(([name, scale]) => (
        <PaletteSection key={name} name={name} scale={scale} />
      ))}
    </div>
  ),
};
