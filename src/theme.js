import { createTheme } from '@mui/material/styles';

export const brand = {
  teal: '#0EA5A4',
  tealDark: '#0F766E',
  blue: '#2563EB',
  ink: '#0F172A',
  slate: '#475569',
};

export const heroGradient = 'linear-gradient(135deg, #0F766E 0%, #0EA5A4 45%, #2563EB 100%)';

// 先建基础主题，再用它的 breakpoints 写响应式字号（小屏收敛、大屏保持原观感）。
const base = createTheme({
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
    h3: { fontWeight: 600, fontSize: '1.25rem' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
});

export const theme = createTheme(base, {
  typography: {
    h1: {
      fontWeight: 700,
      lineHeight: 1.15,
      fontSize: '1.9rem',
      [base.breakpoints.up('sm')]: { fontSize: '2.3rem' },
      [base.breakpoints.up('md')]: { fontSize: '2.6rem' },
    },
    h2: {
      fontWeight: 700,
      fontSize: '1.6rem',
      [base.breakpoints.up('md')]: { fontSize: '1.9rem' },
    },
  },
});
