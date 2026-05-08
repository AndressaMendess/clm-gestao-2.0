export const tokens = {
  colors: {
    primitives: {
      orange: { 100: "#FFF1EB", 200: "#FFD9C9", 300: "#FFB79C", 400: "#FF8A5F", 500: "#F1672C", 600: "#D95522", 700: "#B8471C", 800: "#913716", 900: "#6B2910" },
      blue: { 100: "#E6EEF2", 200: "#C0D3DC", 300: "#8FAFBE", 400: "#5B879F", 500: "#113A52", 600: "#0E3247", 700: "#0B2A3B", 800: "#081F2C", 900: "#05151E" },
      gray: { 50: "#FAFAFA", 100: "#F0F1F2", 200: "#D9DBDD", 300: "#C2C5C8", 400: "#A3A7AB", 500: "#7F8489", 600: "#61666B", 700: "#44484D", 800: "#2C2F33", 900: "#1B1B1B" },
      yellow: { 100: "#FFF4E5", 200: "#FFE2BF", 300: "#FFC980", 400: "#FFAE40", 500: "#F79009", 600: "#D97E08", 700: "#B36807", 800: "#8C5105", 900: "#663A04" },
      green: { 100: "#E6F6EC", 200: "#BFE8CF", 300: "#80D1A5", 400: "#40BA7A", 500: "#00A63E", 600: "#009236", 700: "#007A2E", 800: "#005F24", 900: "#00441A" },
      purple: { 100: "#F4E7FF", 200: "#E3C7FF", 300: "#C78FFF", 400: "#A94BFF", 500: "#9810FA", 600: "#860EE0", 700: "#700CC0", 800: "#59099A", 900: "#420774" },
      iblue: { 100: "#E8EEFF", 200: "#C7D6FF", 300: "#8FAEFF", 400: "#4B7FFF", 500: "#155DFC", 600: "#124FE0", 700: "#0F42BF", 800: "#0B3399", 900: "#082473" },
      pink: { 100: "#FFE6F1", 200: "#FFC2DC", 300: "#FF85B8", 400: "#FF4794", 500: "#FF0074", 600: "#E00066", 700: "#BF0056", 800: "#990044", 900: "#730033" },
      red: { 100: "#FDECEC", 200: "#F9D2CF", 300: "#F5A8A3", 400: "#EE6F67", 500: "#F04438", 600: "#D93B31", 700: "#B73129", 800: "#8F2721", 900: "#661B17" },
    },
    semantic: {
      brandPrimary: {
        subtle: { light: "#FFF1EB", dark: "#6B2910" },
        muted: { light: "#FFD9C9", dark: "#B8471C" },
        soft: { light: "#FFB79C", dark: "#D95522" },
        main: { light: "#F1672C", dark: "#FF8A5F" },
        strong: { light: "#D95522", dark: "#FFB79C" },
        bold: { light: "#B8471C", dark: "#FFD9C9" },
        intense: { light: "#6B2910", dark: "#FFF1EB" },
      },
      brandSecondary: {
        subtle: { light: "#E6EEF2", dark: "#05151E" },
        muted: { light: "#C0D3DC", dark: "#0B2A3B" },
        soft: { light: "#8FAFBE", dark: "#0E3247" },
        main: { light: "#113A52", dark: "#5B879F" },
        strong: { light: "#0E3247", dark: "#8FAFBE" },
        bold: { light: "#0B2A3B", dark: "#C0D3DC" },
        intense: { light: "#05151E", dark: "#E6EEF2" },
      },
      background: {
        primary: { light: "#FAFAFA", dark: "#1B1B1B" },
        secondary: { light: "#F0F1F2", dark: "#2C2F33" },
        tertiary: { light: "#D9DBDD", dark: "#44484D" },
      },
      content: {
        primary: { light: "#1B1B1B", dark: "#F0F1F2" },
        secondary: { light: "#2C2F33", dark: "#D9DBDD" },
        tertiary: { light: "#44484D", dark: "#C2C5C8" },
        inverse: { light: "#FAFAFA", dark: "#1B1B1B" },
      },
      border: {
        primary: { light: "#D9DBDD", dark: "#2C2F33" },
        secondary: { light: "#C2C5C8", dark: "#44484D" },
        tertiary: { light: "#A3A7AB", dark: "#61666B" },
      },
      feedback: {
        error: { content: { light: "#D93B31", dark: "#FDECEC" }, background: { light: "#FDECEC", dark: "#661B17" }, border: { light: "#F5A8A3", dark: "#D93B31" } },
        success: { content: { light: "#009236", dark: "#BFE8CF" }, background: { light: "#E6F6EC", dark: "#00441A" }, border: { light: "#80D1A5", dark: "#009236" } },
        warning: { content: { light: "#8C5105", dark: "#FFE2BF" }, background: { light: "#FFF4E5", dark: "#663A04" }, border: { light: "#FFC980", dark: "#D97E08" } },
        info: { content: { light: "#0F42BF", dark: "#C7D6FF" }, background: { light: "#E8EEFF", dark: "#082473" }, border: { light: "#8FAEFF", dark: "#124FE0" } },
      },
    },
  },
  typography: {
    fontFamily: { sans: '"Instrument Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif' },
    scale: {
      "heading-h1": { fontSize: "56px", lineHeight: "120%", fontWeight: 500, letterSpacing: "-0.04em" },
      "heading-h2": { fontSize: "48px", lineHeight: "120%", fontWeight: 500, letterSpacing: "-0.04em" },
      "heading-h3": { fontSize: "40px", lineHeight: "120%", fontWeight: 600, letterSpacing: "-0.04em" },
      "body-large": { fontSize: "16px", lineHeight: "150%", fontWeight: 400, letterSpacing: "-0.02em" },
      "body-medium": { fontSize: "14px", lineHeight: "150%", fontWeight: 400, letterSpacing: "-0.02em" },
      "body-small": { fontSize: "12px", lineHeight: "150%", fontWeight: 400, letterSpacing: "-0.02em" },
    },
  },
  spacing: {
    0: "0px",
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    8: "32px",
    10: "40px",
    12: "48px",
    16: "64px",
  },
} as const;

export type DesignTokens = typeof tokens;
