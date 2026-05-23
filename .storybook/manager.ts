import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

const modernLightTheme = create({
  base: "light",
  brandTitle: "CLM Design System",
  brandTarget: "_self",
  appBg: "#F3F6FB",
  appContentBg: "#FFFFFF",
  appPreviewBg: "#FFFFFF",
  appBorderColor: "#D9E1EC",
  appBorderRadius: 12,
  colorPrimary: "#1F6FEB",
  colorSecondary: "#0EA5E9",
  textColor: "#1B2A40",
  textInverseColor: "#FFFFFF",
  barTextColor: "#42526B",
  barSelectedColor: "#1F6FEB",
  barBg: "#FFFFFF",
  inputBg: "#FFFFFF",
  inputBorder: "#CBD5E1",
  inputTextColor: "#1E293B",
  inputBorderRadius: 10,
});

addons.setConfig({
  theme: modernLightTheme,
  showNav: true,
  showPanel: false,
  panelPosition: "bottom",
  sidebar: {
    showRoots: true,
  },
});
