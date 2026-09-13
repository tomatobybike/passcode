import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/** localStorage 键：记住用户的明暗选择（index.html 的首帧脚本使用同一个键名） */
export const COLOR_MODE_STORAGE_KEY = 'passcode-site-theme';

/** 浅色模式对应的 theme-color（与主色一致），深色模式改用深底 */
const THEME_COLOR = { light: '#16B364', dark: '#111111' };

const ColorModeContext = createContext({
  mode: 'light',
  setMode: () => {},
  toggleMode: () => {},
});

/** 读取用户上次的选择；非法值或存储不可用（隐私模式）时返回 null */
function readStoredMode() {
  try {
    const value = window.localStorage.getItem(COLOR_MODE_STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

/**
 * 初始模式：优先用户上次的选择，否则跟随系统 prefers-color-scheme。
 * 在 useState 初始化函数里同步调用，保证首帧就是正确主题、不出现闪白。
 */
function detectMode() {
  const stored = readStoredMode();
  if (stored) return stored;
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

export function ColorModeProvider({ children }) {
  const [mode, setModeState] = useState(detectMode);

  // 同步到 <html data-theme> 与浏览器地址栏 theme-color，便于 CSS 兜底与移动端配色
  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', THEME_COLOR[mode]);
  }, [mode]);

  /** 显式切换才写入本地存储，避免首次访问就把系统偏好固化下来 */
  const setMode = useCallback((next) => {
    setModeState(next);
    try {
      window.localStorage.setItem(COLOR_MODE_STORAGE_KEY, next);
    } catch {
      /* 忽略：切换本身仍然生效 */
    }
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  }, [mode, setMode]);

  const value = useMemo(() => ({ mode, setMode, toggleMode }), [mode, setMode, toggleMode]);

  return <ColorModeContext.Provider value={value}>{children}</ColorModeContext.Provider>;
}

export function useColorMode() {
  return useContext(ColorModeContext);
}
