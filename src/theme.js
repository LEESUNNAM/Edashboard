import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7AAEC8',
      light: '#A9CADB',
      dark: '#3D5F73',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#5C8099',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#EEF5F9',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2B4A5E',
      secondary: '#3D5F73',
      disabled: '#7AAEC8',
    },
    info: {
      main: '#C4D9EA',
      contrastText: '#2B4A5E',
    },
  },
  typography: {
    fontFamily: 'system-ui, "Segoe UI", Roboto, sans-serif',
    h1: { fontSize: '28px', fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: '20px', fontWeight: 700, lineHeight: 1.2 },
    body1: { fontSize: '14px', lineHeight: 1.5 },
    body2: { fontSize: '13px', lineHeight: 1.6 },
    caption: { fontSize: '12px', lineHeight: 1.5, fontWeight: 400 },
  },
  shape: { borderRadius: 8 },
  spacing: 4,
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          textTransform: 'none',
          fontWeight: 600,
          minHeight: '44px',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
  },
});

export default theme;
