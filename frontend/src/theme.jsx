import { createTheme, alpha } from "@mui/material/styles";

// --- Bảng màu cho Light Mode (Tông màu Slate dịu) ---
const lightPalette = {
  primary: "#D97706",
  secondary: "#0E7490",
  warning: "#F59E0B",
  background: "#F8FAFC",
  paper: "#FFFFFF",
  textPrimary: "#1E293B",
  textSecondary: "#64748B",
};

// --- Bảng màu cho Dark Mode (Tông màu Slate xanh đậm, chuyên nghiệp) ---
const darkPalette = {
  primary: "#A78BFA",
  secondary: "#2DD4BF",
  warning: "#FBBF24",
  background: "#0F172A",
  paper: "#1E293B",
  textPrimary: "#F1F5F9",
  textSecondary: "#94A3B8",
};

const typographyConfig = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: { fontSize: "3rem", fontWeight: 700, letterSpacing: "-0.5px" },
  h2: { fontSize: "2.25rem", fontWeight: 700 },
  h3: { fontSize: "1.75rem", fontWeight: 600 },
  h4: { fontSize: "1.25rem", fontWeight: 600 },
  h5: { fontSize: "1.1rem", fontWeight: 600 },
  h6: { fontSize: "1rem", fontWeight: 600 },
  button: { textTransform: "none", fontWeight: 600, letterSpacing: "0.5px" },
};

const shadows = [
  "none",
  "0px 1px 2px 0px rgba(0, 0, 0, 0.05)",
  "0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)",
  "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)",
  "0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)",
  "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 8px 10px -6px rgba(0, 0, 0, 0.1)",
  "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
  "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
  "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
  "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
  "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
  "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
  "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
  "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
  "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
  "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
  "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
  "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
  "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
  "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
  "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
  "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
  "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
  "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
  "inset 0 2px 4px 0 rgba(0,0,0,0.05)",
];

export const createAppTheme = (mode) => {
  const isDark = mode === "dark";

  const paletteConfig = {
    mode,
    primary: {
      main: isDark ? darkPalette.primary : lightPalette.primary,
      contrastText: isDark ? darkPalette.textPrimary : "#FFFFFF",
    },
    secondary: {
      main: isDark ? darkPalette.secondary : lightPalette.secondary,
      contrastText: isDark ? darkPalette.textPrimary : "#FFFFFF",
    },
    success: { main: "#10B981", contrastText: "#FFFFFF" },
    warning: {
      main: isDark ? darkPalette.warning : lightPalette.warning,
      contrastText: lightPalette.textPrimary,
    },
    error: { main: "#F43F5E", contrastText: "#FFFFFF" },
    info: {
      main: isDark ? "#2DD4BF" : "#06B6D4",
      contrastText: isDark ? darkPalette.background : "#FFFFFF",
    },
    background: {
      default: isDark ? darkPalette.background : lightPalette.background,
      paper: isDark ? darkPalette.paper : lightPalette.paper,
    },
    text: {
      primary: isDark ? darkPalette.textPrimary : lightPalette.textPrimary,
      secondary: isDark
        ? darkPalette.textSecondary
        : lightPalette.textSecondary,
    },
    divider: isDark ? alpha("#FFFFFF", 0.12) : alpha("#000000", 0.12),
  };

  const componentOverrides = {
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 16,
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          border: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
          boxShadow: "none",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: theme.shadows[4],
          },
        }),
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 8, padding: "10px 22px" },
        containedPrimary: {
          "&:hover": {
            backgroundColor: alpha(paletteConfig.primary.main, 0.9),
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ theme }) => ({
          backgroundColor: alpha(
            isDark ? darkPalette.paper : lightPalette.textPrimary,
            0.9
          ),
          color: isDark ? darkPalette.textPrimary : lightPalette.paper,
          backdropFilter: "blur(5px)",
          borderRadius: 8,
          fontSize: "0.875rem",
          padding: "8px 14px",
          border: `1px solid ${theme.palette.divider}`,
        }),
        arrow: ({ theme }) => ({
          color: alpha(
            isDark ? darkPalette.paper : lightPalette.textPrimary,
            0.9
          ),
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 6, fontWeight: 600 },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: ({ theme }) => ({ color: theme.palette.text.primary }),
      },
    },
  };

  return createTheme({
    palette: paletteConfig,
    typography: typographyConfig,
    components: componentOverrides,
    shadows: shadows,
  });
};
