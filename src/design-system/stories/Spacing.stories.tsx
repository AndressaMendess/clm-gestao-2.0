import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { tokens } from "../../../design-system/tokens";

const meta = {
  title: "Design Tokens/Spacing",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 12, maxWidth: 720 }}>
      {Object.entries(tokens.spacing).map(([name, value]) => (
        <div key={name} style={{ display: "grid", gridTemplateColumns: "120px 1fr", alignItems: "center", gap: 12 }}>
          <code>{`spacing.${name}`}</code>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ height: 12, width: value, background: tokens.colors.semantic.brandPrimary.main.light, borderRadius: 999 }} />
            <span>{value}</span>
          </div>
        </div>
      ))}
    </div>
  ),
};
