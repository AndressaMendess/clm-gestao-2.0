import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import tokenModule from "../design-system/tokens.ts";

const { tokens } = tokenModule as any;

const root = resolve(process.cwd());
const cssPath = resolve(root, "src/styles/tokens.css");

const lines: string[] = [];
const lightSemanticLines: string[] = [];
const darkSemanticLines: string[] = [];

function toKebabCase(value: string): string {
  return value.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function walkSemantic(
  obj: Record<string, unknown>,
  path: string[] = [],
): void {
  for (const [key, value] of Object.entries(obj)) {
    const tokenPath = [...path, toKebabCase(key)];

    if (
      value &&
      typeof value === "object" &&
      "light" in (value as Record<string, unknown>) &&
      "dark" in (value as Record<string, unknown>)
    ) {
      const tokenValue = value as { light: string; dark: string };
      const cssVar = `--${tokenPath.join("-")}`;
      lightSemanticLines.push(`  ${cssVar}: ${tokenValue.light.toLowerCase()};`);
      darkSemanticLines.push(`  ${cssVar}: ${tokenValue.dark.toLowerCase()};`);
      continue;
    }

    if (value && typeof value === "object") {
      walkSemantic(value as Record<string, unknown>, tokenPath);
    }
  }
}

lines.push(":root {");
lines.push("  color-scheme: light;");
lines.push(`  --font-family-sans: ${tokens.typography.fontFamily.sans};`);

for (const [groupName, groupValues] of Object.entries(tokens.colors.primitives)) {
  for (const [scale, hex] of Object.entries(groupValues)) {
    lines.push(`  --color-${groupName}-${scale}: ${hex.toLowerCase()};`);
  }
}

walkSemantic(tokens.colors.semantic);
lines.push(...lightSemanticLines);
lines.push("}");

lines.push("");
lines.push(".dark {");
lines.push("  color-scheme: dark;");
lines.push(...darkSemanticLines);
lines.push("}");
lines.push("");

await writeFile(cssPath, `${lines.join("\n")}`, "utf8");
console.log(`Tokens synced to ${cssPath}`);
