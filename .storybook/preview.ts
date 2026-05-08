import type { Preview } from "@storybook/nextjs-vite";
import { tokens } from "../design-system/tokens";
import "../src/styles/tokens.css";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        primary: {
          name: "Background Primary",
          value: tokens.colors.semantic.background.primary.light,
        },
        secondary: {
          name: "Background Secondary",
          value: tokens.colors.semantic.background.secondary.light,
        },
        dark: {
          name: "Background Dark",
          value: tokens.colors.semantic.background.primary.dark,
        },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
  initialGlobals: {
    backgrounds: { value: "primary" },
  },
};

export default preview;
