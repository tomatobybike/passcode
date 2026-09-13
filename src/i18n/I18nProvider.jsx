import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { createTranslator, detectLang, storeLang } from './core.js';

/** 下发语言与翻译函数，供所有组件取词，避免各处各建一份 translator */
const I18nContext = createContext(null);

/** 读取 i18n 上下文（只能在 I18nProvider 内部使用） */
export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n 必须在 I18nProvider 内使用');
  return value;
}

/**
 * 全站唯一的语言下发点。
 * 初始语言同步确定（首帧即正确，不闪烁）；切换时写 localStorage，并只在语言变化时重建 translator。
 */
export default function I18nProvider({ children }) {
  const [lang, setLangState] = useState(detectLang);

  const setLang = useCallback((next) => {
    setLangState(next);
    storeLang(next);
  }, []);

  const value = useMemo(() => ({ lang, setLang, t: createTranslator(lang) }), [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
