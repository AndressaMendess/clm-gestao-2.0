const primitives = {
  orange: { 100: "#FFF1EB", 200: "#FFD9C9", 300: "#FFB79C", 400: "#FF8A5F", 500: "#F1672C", 600: "#D95522", 700: "#B8471C", 800: "#913716", 900: "#6B2910" },
  blue: { 100: "#E6EEF2", 200: "#C0D3DC", 300: "#8FAFBE", 400: "#5B879F", 500: "#113A52", 600: "#0E3247", 700: "#0B2A3B", 800: "#081F2C", 900: "#05151E" },
  gray: { 50: "#FAFAFA", 100: "#F0F1F2", 200: "#D9DBDD", 300: "#C2C5C8", 400: "#A3A7AB", 500: "#7F8489", 600: "#61666B", 700: "#44484D", 800: "#2C2F33", 900: "#1B1B1B" },
  yellow: { 100: "#FFF4E5", 200: "#FFE2BF", 300: "#FFC980", 400: "#FFAE40", 500: "#F79009", 600: "#D97E08", 700: "#B36807", 800: "#8C5105", 900: "#663A04" },
  green: { 100: "#E6F6EC", 200: "#BFE8CF", 300: "#80D1A5", 400: "#40BA7A", 500: "#00A63E", 600: "#009236", 700: "#007A2E", 800: "#005F24", 900: "#00441A" },
  purple: { 100: "#F4E7FF", 200: "#E3C7FF", 300: "#C78FFF", 400: "#A94BFF", 500: "#9810FA", 600: "#860EE0", 700: "#700CC0", 800: "#59099A", 900: "#420774" },
  iblue: { 100: "#E8EEFF", 200: "#C7D6FF", 300: "#8FAEFF", 400: "#4B7FFF", 500: "#155DFC", 600: "#124FE0", 700: "#0F42BF", 800: "#0B3399", 900: "#082473" },
  pink: { 100: "#FFE6F1", 200: "#FFC2DC", 300: "#FF85B8", 400: "#FF4794", 500: "#FF0074", 600: "#E00066", 700: "#BF0056", 800: "#990044", 900: "#730033" },
  red: { 100: "#FDECEC", 200: "#F9D2CF", 300: "#F5A8A3", 400: "#EE6F67", 500: "#F04438", 600: "#D93B31", 700: "#B73129", 800: "#8F2721", 900: "#661B17" },
} as const;

export const tokens = {
  colors: {
    primitives,
    semantic: {
      brandPrimary: {
        subtle: { light: primitives.orange[100], dark: primitives.orange[900] },
        muted: { light: primitives.orange[200], dark: primitives.orange[700] },
        soft: { light: primitives.orange[300], dark: primitives.orange[600] },
        main: { light: primitives.orange[500], dark: primitives.orange[400] },
        strong: { light: primitives.orange[600], dark: primitives.orange[300] },
        bold: { light: primitives.orange[700], dark: primitives.orange[200] },
        intense: { light: primitives.orange[900], dark: primitives.orange[100] },
      },
      brandSecondary: {
        subtle: { light: primitives.blue[100], dark: primitives.blue[900] },
        muted: { light: primitives.blue[200], dark: primitives.blue[700] },
        soft: { light: primitives.blue[300], dark: primitives.blue[600] },
        main: { light: primitives.blue[500], dark: primitives.blue[400] },
        strong: { light: primitives.blue[600], dark: primitives.blue[300] },
        bold: { light: primitives.blue[700], dark: primitives.blue[200] },
        intense: { light: primitives.blue[900], dark: primitives.blue[100] },
      },
      background: {
        primary: { light: primitives.gray[50], dark: primitives.gray[900] },
        secondary: { light: primitives.gray[100], dark: primitives.gray[800] },
        tertiary: { light: primitives.gray[200], dark: primitives.gray[700] },
      },
      content: {
        primary: { light: primitives.gray[900], dark: primitives.gray[100] },
        secondary: { light: primitives.gray[800], dark: primitives.gray[200] },
        tertiary: { light: primitives.gray[700], dark: primitives.gray[300] },
        inverse: { light: primitives.gray[100], dark: primitives.gray[900] },
      },
      border: {
        primary: { light: primitives.gray[100], dark: primitives.gray[800] },
        secondary: { light: primitives.gray[200], dark: primitives.gray[700] },
        tertiary: { light: primitives.gray[300], dark: primitives.gray[600] },
      },
      feedback: {
        error: { content: { light: primitives.red[600], dark: primitives.red[100] }, background: { light: primitives.red[100], dark: primitives.red[900] }, border: { light: primitives.red[300], dark: primitives.red[600] } },
        success: { content: { light: primitives.green[600], dark: primitives.green[200] }, background: { light: primitives.green[100], dark: primitives.green[900] }, border: { light: primitives.green[300], dark: primitives.green[600] } },
        warning: { content: { light: primitives.yellow[800], dark: primitives.yellow[200] }, background: { light: primitives.yellow[100], dark: primitives.yellow[900] }, border: { light: primitives.yellow[300], dark: primitives.yellow[600] } },
        info: { content: { light: primitives.iblue[700], dark: primitives.iblue[200] }, background: { light: primitives.iblue[100], dark: primitives.iblue[900] }, border: { light: primitives.iblue[300], dark: primitives.iblue[600] } },
      },
      accent: {
        pink: {
          content: { light: primitives.pink[600], dark: primitives.pink[100] },
          background: { light: primitives.pink[100], dark: primitives.pink[900] },
        },
        purple: {
          content: { light: primitives.purple[600], dark: primitives.purple[100] },
          background: { light: primitives.purple[100], dark: primitives.purple[900] },
        },
        blue: {
          content: { light: primitives.iblue[700], dark: primitives.iblue[200] },
          background: { light: primitives.iblue[100], dark: primitives.iblue[900] },
        },
        green: {
          content: { light: primitives.green[600], dark: primitives.green[200] },
          background: { light: primitives.green[100], dark: primitives.green[900] },
        },
        yellow: {
          content: { light: primitives.yellow[800], dark: primitives.yellow[200] },
          background: { light: primitives.yellow[100], dark: primitives.yellow[900] },
        },
      },
      button: {
        focusRing: { light: primitives.blue[300], dark: primitives.blue[300] },
        primary: {
          background: {
            enabled: { light: primitives.orange[500], dark: primitives.orange[400] },
            hover: { light: primitives.orange[600], dark: primitives.orange[300] },
            pressed: { light: primitives.orange[700], dark: primitives.orange[200] },
            disabled: { light: primitives.gray[300], dark: primitives.gray[800] },
          },
          shadow: {
            enabled: { light: `inset 0 4px 12px 0 ${primitives.orange[400]}`, dark: `inset 0 4px 12px 0 ${primitives.orange[300]}` },
          },
          content: {
            enabled: { light: primitives.gray[50], dark: primitives.gray[50] },
            hover: { light: primitives.gray[50], dark: primitives.gray[50] },
            pressed: { light: primitives.gray[50], dark: primitives.gray[50] },
            disabled: { light: primitives.gray[700], dark: primitives.gray[500] },
          },
        },
        secondary: {
          background: {
            enabled: { light: "transparent", dark: "transparent" },
            hover: { light: primitives.gray[50], dark: primitives.gray[800] },
            pressed: { light: primitives.gray[100], dark: primitives.gray[700] },
            disabled: { light: "transparent", dark: "transparent" },
          },
          content: {
            enabled: { light: primitives.blue[500], dark: primitives.blue[400] },
            hover: { light: primitives.blue[600], dark: primitives.blue[300] },
            pressed: { light: primitives.blue[700], dark: primitives.blue[200] },
            disabled: { light: primitives.gray[500], dark: primitives.gray[500] },
          },
          border: {
            width: { light: "1px", dark: "1px" },
            enabled: { light: primitives.gray[200], dark: primitives.gray[700] },
            hover: { light: primitives.gray[300], dark: primitives.gray[600] },
            pressed: { light: primitives.gray[400], dark: primitives.gray[500] },
            disabled: { light: primitives.gray[300], dark: primitives.gray[800] },
            focus: { light: primitives.blue[300], dark: primitives.blue[300] },
          },
        },
        ghost: {
          background: {
            enabled: { light: "transparent", dark: "transparent" },
            hover: { light: primitives.gray[100], dark: primitives.gray[800] },
            pressed: { light: primitives.gray[200], dark: primitives.gray[700] },
            disabled: { light: "transparent", dark: "transparent" },
          },
          content: {
            enabled: { light: primitives.orange[500], dark: primitives.orange[400] },
            hover: { light: primitives.blue[600], dark: primitives.blue[300] },
            pressed: { light: primitives.blue[700], dark: primitives.blue[200] },
            disabled: { light: primitives.gray[500], dark: primitives.gray[500] },
          },
        },
      },
    },
  },
  typography: {
    fontFamily: { sans: '"Instrument Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif' },
    scale: {
      "display-s": { fontSize: "64px", lineHeight: "120%", fontWeight: 600, letterSpacing: "-0.02em" },
      "heading-h1": { fontSize: "56px", lineHeight: "120%", fontWeight: 600, letterSpacing: "-0.04em" },
      "heading-h2": { fontSize: "48px", lineHeight: "120%", fontWeight: 600, letterSpacing: "-0.04em" },
      "heading-h3": { fontSize: "40px", lineHeight: "120%", fontWeight: 600, letterSpacing: "-0.04em" },
      "heading-h4": { fontSize: "32px", lineHeight: "120%", fontWeight: 600, letterSpacing: "-0.04em" },
      "heading-h5": { fontSize: "24px", lineHeight: "120%", fontWeight: 600, letterSpacing: "-0.04em" },
      "heading-h6": { fontSize: "20px", lineHeight: "140%", fontWeight: 600, letterSpacing: "-0.04em" },
      "body-x-large-bold": { fontSize: "18px", lineHeight: "140%", fontWeight: 700, letterSpacing: "-0.04em" },
      "body-x-large-semibold": { fontSize: "18px", lineHeight: "140%", fontWeight: 600, letterSpacing: "-0.04em" },
      "body-x-large-medium": { fontSize: "18px", lineHeight: "140%", fontWeight: 500, letterSpacing: "-0.04em" },
      "body-x-large-regular": { fontSize: "18px", lineHeight: "140%", fontWeight: 400, letterSpacing: "-0.04em" },
      "body-large-bold": { fontSize: "16px", lineHeight: "150%", fontWeight: 700, letterSpacing: "-0.04em" },
      "body-large-semibold": { fontSize: "16px", lineHeight: "150%", fontWeight: 600, letterSpacing: "-0.04em" },
      "body-large-medium": { fontSize: "16px", lineHeight: "150%", fontWeight: 500, letterSpacing: "-0.04em" },
      "body-large-regular": { fontSize: "16px", lineHeight: "150%", fontWeight: 400, letterSpacing: "-0.04em" },
      "body-medium-bold": { fontSize: "14px", lineHeight: "150%", fontWeight: 700, letterSpacing: "-0.04em" },
      "body-medium-semibold": { fontSize: "14px", lineHeight: "150%", fontWeight: 600, letterSpacing: "-0.04em" },
      "body-medium-medium": { fontSize: "14px", lineHeight: "150%", fontWeight: 500, letterSpacing: "-0.04em" },
      "body-medium-regular": { fontSize: "14px", lineHeight: "150%", fontWeight: 400, letterSpacing: "-0.04em" },
      "body-small-bold": { fontSize: "12px", lineHeight: "150%", fontWeight: 700, letterSpacing: "-0.04em" },
      "body-small-semibold": { fontSize: "12px", lineHeight: "150%", fontWeight: 600, letterSpacing: "-0.04em" },
      "body-small-medium": { fontSize: "12px", lineHeight: "150%", fontWeight: 500, letterSpacing: "-0.04em" },
      "body-small-regular": { fontSize: "12px", lineHeight: "150%", fontWeight: 400, letterSpacing: "-0.04em" },
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
