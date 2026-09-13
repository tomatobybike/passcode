import React, { useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App.jsx';
import I18nProvider from './i18n/I18nProvider.jsx';
import { ColorModeProvider, useColorMode } from './colorMode.jsx';
import { getTheme } from './theme.js';

// 主题随明暗模式重建，useMemo 缓存避免每次渲染重复构建
function ThemedApp() {
  const { mode } = useColorMode();
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorModeProvider>
      <I18nProvider>
        <ThemedApp />
      </I18nProvider>
    </ColorModeProvider>
  </React.StrictMode>,
);
