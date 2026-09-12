import { createTheme } from '@mui/material/styles';

export const brand = {
  teal: '#0EA5A4',
  tealDark: '#0F766E',
  blue: '#2563EB',
  ink: '#0F172A',
  slate: '#475569',
};

export const heroGradient = 'linear-gradient(135deg, #0F766E 0%, #0EA5A4 45%, #2563EB 100%)';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: brand.teal },
    secondary: { main: brand.blue },
    success: { main: '#16A34A' },
    warning: { main: '#F59E0B' },
    background: { default: '#F8FAFC', paper: '#FFFFFF' },
    text: { primary: brand.ink, secondary: brand.slate },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: 'Roboto, "PingFang SC", "Microsoft YaHei", system-ui, sans-serif',
    h1: { fontWeight: 700, fontSize: '2.6rem', lineHeight: 1.15 },
    h2: { fontWeight: 700, fontSize: '1.9rem' },
    h3: { fontWeight: 600, fontSize: '1.25rem' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
});
