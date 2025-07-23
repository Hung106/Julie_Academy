import { createTheme, alpha } from '@mui/material/styles';

/**
 * Tạo một theme tùy chỉnh cho ứng dụng, hỗ trợ cả Light Mode và Dark Mode.
 * @param {'light' | 'dark'} mode - Chế độ giao diện hiện tại.
 * @returns {import('@mui/material/styles').Theme} 
 */
const theme = (mode) => {
  const isDark = mode === 'dark';

  const baseColors = {
    primary: '#007AFF',
    secondary: '#E91E63',
    success: '#0ABF53',
    warning: '#FFB400',
    error: '#FF453A',
    info: '#00B8D9',
  };

  const subjectColors = {
    math: baseColors.secondary,
    physics: baseColors.primary,
    english: baseColors.success,
    chemistry: '#AF52DE',
    literature: '#FF9500',
    default: '#8E8E93',
  };

  return createTheme({
    palette: {
      mode,
      primary: {
        main: baseColors.primary,
        contrastText: '#ffffff',
      },
      secondary: {
        main: baseColors.secondary,
        contrastText: '#ffffff',
      },
      success: { main: baseColors.success, contrastText: '#ffffff' },
      warning: { main: baseColors.warning, contrastText: '#ffffff' },
      error: { main: baseColors.error, contrastText: '#ffffff' },
      info: { main: baseColors.info, contrastText: '#ffffff' },
      background: {
        default: isDark ? '#1C2536' : '#F7F9FC',
        paper: isDark ? '#2A3447' : '#FFFFFF',
      },
      text: {
        primary: isDark ? '#F0F6FC' : '#1A2027',
        secondary: isDark ? '#A0AEC0' : '#4A5568',
      },
      divider: isDark ? alpha('#FFFFFF', 0.12) : alpha('#000000', 0.12),
      subjects: subjectColors,
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeightRegular: 400,
      fontWeightMedium: 600,
      fontWeightBold: 700,
      h1: { fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.5px' },
      h2: { fontSize: '2.25rem', fontWeight: 700 },
      h3: { fontSize: '1.75rem', fontWeight: 600 },
      h4: { fontSize: '1.25rem', fontWeight: 600 },
      h5: { fontSize: '1.1rem', fontWeight: 600 },
      h6: { fontSize: '1rem', fontWeight: 600 },
      button: { textTransform: 'none', fontWeight: 600, letterSpacing: '0.5px' },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: 16,
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            border: `1px solid ${theme.palette.divider}`,
            background: isDark
              ? `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${theme.palette.background.paper})`
              : theme.palette.background.paper,
            boxShadow: 'none',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: isDark
                ? `0 0 24px 0 ${alpha(baseColors.primary, 0.35)}`
                : `0 12px 24px 0 ${alpha('#9DA8B7', 0.15)}`,
            },
          }),
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '10px 22px',
          },
          containedPrimary: {
            '&:hover': {
              boxShadow: `0 0 15px 0 ${alpha(baseColors.primary, 0.6)}`,
            },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: ({ theme }) => ({
            backgroundColor: alpha(theme.palette.background.default, 0.85),
            backdropFilter: 'blur(5px)',
            borderRadius: 8,
            fontSize: '0.875rem',
            padding: '8px 14px',
            border: `1px solid ${theme.palette.divider}`,
          }),
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            fontWeight: 600,
          },
        },
      },
    },
  });
};

export default theme;