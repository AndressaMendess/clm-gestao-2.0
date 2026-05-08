import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { tokens } from "../../../design-system/tokens";

const meta = {
  title: "Design Tokens/Typography",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 16, fontFamily: tokens.typography.fontFamily.sans }}>
      {Object.entries(tokens.typography.scale).map(([name, style]) => (
        <div key={name} style={{ borderBottom: "1px solid #ddd", paddingBottom: 12 }}>
          <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>{name}</div>
          <div
            style={{
              fontSize: style.fontSize,
              lineHeight: style.lineHeight,
              fontWeight: style.fontWeight,
              letterSpacing: style.letterSpacing,
            }}
          >
            Aa Bb Cc 0123456789
          </div>
        </div>
      ))}
    </div>
  ),
};
