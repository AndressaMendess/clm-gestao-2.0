import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import tokenModule from "../design-system/tokens.ts";

const { tokens } = tokenModule as any;

const root = resolve(process.cwd());
const cssPath = resolve(root, "src/styles/tokens.css");

const lines: string[] = [];

lines.push(":root {");
lines.push("  color-scheme: light;");
lines.push(`  --font-family-sans: ${tokens.typography.fontFamily.sans};`);

for (const [groupName, groupValues] of Object.entries(tokens.colors.primitives)) {
  for (const [scale, hex] of Object.entries(groupValues)) {
    lines.push(`  --color-${groupName}-${scale}: ${hex.toLowerCase()};`);
  }
}

lines.push(`  --brand-primary-main: ${tokens.colors.semantic.brandPrimary.main.light.toLowerCase()};`);
lines.push(`  --brand-secondary-main: ${tokens.colors.semantic.brandSecondary.main.light.toLowerCase()};`);
lines.push(`  --background-primary: ${tokens.colors.semantic.background.primary.light.toLowerCase()};`);
lines.push(`  --background-secondary: ${tokens.colors.semantic.background.secondary.light.toLowerCase()};`);
lines.push(`  --background-tertiary: ${tokens.colors.semantic.background.tertiary.light.toLowerCase()};`);
lines.push(`  --content-primary: ${tokens.colors.semantic.content.primary.light.toLowerCase()};`);
lines.push(`  --content-secondary: ${tokens.colors.semantic.content.secondary.light.toLowerCase()};`);
lines.push(`  --content-tertiary: ${tokens.colors.semantic.content.tertiary.light.toLowerCase()};`);
lines.push(`  --content-inverse: ${tokens.colors.semantic.content.inverse.light.toLowerCase()};`);
lines.push(`  --border-primary: ${tokens.colors.semantic.border.primary.light.toLowerCase()};`);
lines.push(`  --border-secondary: ${tokens.colors.semantic.border.secondary.light.toLowerCase()};`);
lines.push(`  --border-tertiary: ${tokens.colors.semantic.border.tertiary.light.toLowerCase()};`);
lines.push("}");

lines.push("");
lines.push(".dark {");
lines.push("  color-scheme: dark;");
lines.push(`  --brand-primary-main: ${tokens.colors.semantic.brandPrimary.main.dark.toLowerCase()};`);
lines.push(`  --brand-secondary-main: ${tokens.colors.semantic.brandSecondary.main.dark.toLowerCase()};`);
lines.push(`  --background-primary: ${tokens.colors.semantic.background.primary.dark.toLowerCase()};`);
lines.push(`  --background-secondary: ${tokens.colors.semantic.background.secondary.dark.toLowerCase()};`);
lines.push(`  --background-tertiary: ${tokens.colors.semantic.background.tertiary.dark.toLowerCase()};`);
lines.push(`  --content-primary: ${tokens.colors.semantic.content.primary.dark.toLowerCase()};`);
lines.push(`  --content-secondary: ${tokens.colors.semantic.content.secondary.dark.toLowerCase()};`);
lines.push(`  --content-tertiary: ${tokens.colors.semantic.content.tertiary.dark.toLowerCase()};`);
lines.push(`  --content-inverse: ${tokens.colors.semantic.content.inverse.dark.toLowerCase()};`);
lines.push(`  --border-primary: ${tokens.colors.semantic.border.primary.dark.toLowerCase()};`);
lines.push(`  --border-secondary: ${tokens.colors.semantic.border.secondary.dark.toLowerCase()};`);
lines.push(`  --border-tertiary: ${tokens.colors.semantic.border.tertiary.dark.toLowerCase()};`);
lines.push("}");
lines.push("");

await writeFile(cssPath, `${lines.join("\n")}`, "utf8");
console.log(`Tokens synced to ${cssPath}`);
