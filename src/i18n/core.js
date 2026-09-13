// 零依赖 i18n 核心：语言探测 + 字典查表 + {name} 插值。
// 与插件仓库（chrome-passcode/src/shared/i18n.js）同构，两个仓库的 i18n 范式保持一致，
// 日后加第三种语言只需新增字典文件并登记进 LANGS / DICTS。
import { en } from './en.js';
import { zh } from './zh.js';

/** 已支持的语言；顺序即切换控件的展示顺序 */
export const LANGS = ['zh', 'en'];

/** localStorage 键：记住用户的手动选择 */
export const LANG_STORAGE_KEY = 'passcode-site-lang';

/** 已登记的语言字典；新增语言时在此登记，并同步 LANGS */
const DICTS = { zh, en };

/** 读取用户上次的选择；无有效值或存储不可用（隐私模式）时返回 null */
export function readStoredLang() {
  try {
    const value = window.localStorage.getItem(LANG_STORAGE_KEY);
    return LANGS.includes(value) ? value : null;
  } catch {
    return null;
  }
}

/** 持久化语言选择；存储不可用（隐私模式）时静默忽略，不影响本次切换 */
export function storeLang(lang) {
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    /* 忽略：切换本身仍然生效 */
  }
}

/**
 * 初始语言：优先用户上次的选择，否则看浏览器语言 —— 以 zh 开头取中文，其余一律英文。
 * 在 useState 初始化函数里同步调用，保证首帧就是正确语言、不出现中途换语言的闪烁。
 */
export function detectLang() {
  const stored = readStoredLang();
  if (stored) return stored;
  const nav = typeof navigator !== 'undefined' ? navigator.language || '' : '';
  return /^zh/i.test(nav) ? 'zh' : 'en';
}

/** 取某语言的字典；未知语言回落中文（个别 key 再缺由 t() 兜底到 key 本身） */
export function getMessages(lang) {
  return DICTS[lang] || DICTS.zh;
}

/** 把 {name} 占位替换为 params.name；缺参数时保留原占位，便于暴露漏传 */
function interpolate(text, params) {
  if (typeof text !== 'string' || !params) return text;
  return text.replace(/\{(\w+)\}/g, (match, key) => (key in params ? String(params[key]) : match));
}

/**
 * 生成 t(key, params)。查表顺序：当前语言 → 中文 → key 本身。
 * 回落中文而非 key，是为了「英文漏翻」时至少显示可读的中文，而不是一串点号。
 */
export function createTranslator(lang) {
  const dict = getMessages(lang);
  return function t(key, params) {
    const text = dict[key] ?? zh[key] ?? key;
    return interpolate(text, params);
  };
}

// 开发期兜底：两份字典 key 不一致时告警。落地页没有测试框架，这是成本最低的防漏翻手段。
if (import.meta.env.DEV) {
  const zhKeys = Object.keys(zh);
  const enKeys = Object.keys(en);
  const missingInEn = zhKeys.filter((key) => !(key in en));
  const missingInZh = enKeys.filter((key) => !(key in zh));
  if (missingInEn.length || missingInZh.length) {
    console.warn('[i18n] zh / en 字典 key 不一致', { missingInEn, missingInZh });
  }
}
