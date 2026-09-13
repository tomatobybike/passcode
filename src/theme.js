import { createTheme } from '@mui/material/styles';
import { keyframes } from '@emotion/react';

/* ------------------------------- 设计令牌 ------------------------------- */

/** 品牌色：主色取自参考站 wukong-deploy 的 rgb(22,179,100) */
export const brand = {
  green: '#16B364',
  greenDark: '#129151',
  greenLight: '#2EDE8C',
  greenTint: 'rgba(22,179,100,0.10)',
};

/** 圆角：整体收敛 —— 卡片 6px、按钮与标签 4px */
export const radius = {
  card: 6,
  button: 4,
  chip: 4,
};

/** 首屏并排控件的统一高度：让下载按钮与 AES 标签等高 */
export const controlHeight = 42;

/** 柔和投影：浅色 / 深色两套 */
export const shadows = {
  light: {
    rest: '0 4px 16px rgba(15,23,42,0.06)',
    hover: '0 10px 24px rgba(15,23,42,0.10)',
  },
  dark: {
    rest: '0 4px 16px rgba(0,0,0,0.45)',
    hover: '0 10px 24px rgba(0,0,0,0.55)',
  },
};

/** 极淡描边：卡片静止态的边界几乎不可见，只保留一点分离感（hover 仍走绿色反馈） */
export const hairline = {
  light: 'rgba(17,17,17,0.06)',
  dark: 'rgba(255,255,255,0.06)',
};

/**
 * 更新日志时间线的轮换配色：绿 → 青 → 蓝 → 琥珀，与首屏青蓝渐变呼应。
 * 深色模式取更亮一档，保证 12px 日期小字在深底上的对比度（蓝色尤其需要提亮）。
 */
export const timelineAccents = [
  { light: brand.green, dark: brand.greenLight },
  { light: '#0EA5A4', dark: '#2DD4BF' },
  { light: '#2563EB', dark: '#60A5FA' },
  { light: '#F59E0B', dark: '#FBBF24' },
];

/**
 * 首屏背景：青蓝渐变。Hero 与全站绿色主色并存，作为独立色块存在。
 */
export const heroGradient = 'linear-gradient(135deg, #0F766E 0%, #0EA5A4 45%, #2563EB 100%)';

/** 首屏背景（暗黑模式）：同色相压深版，与深色页面自然衔接，不成为「亮岛」 */
export const heroGradientDark =
  'linear-gradient(135deg, #062E2C 0%, #0B5F5E 45%, #16307A 100%)';

/**
 * 首屏强调色：白色主按钮上的文字色。
 * #0F766E 在白底上对比度约 5.6:1，满足 WCAG AA。
 */
export const heroAccent = '#0F766E';

/* ------------------------------- 动画关键帧 ------------------------------ */

/** 上浮淡入：区块与卡片入场 */
export const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

/** 上下浮动：首屏 Logo */
export const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

/**
 * 入场动画预设，延迟递增用于「依次出现」。
 * 尊重 prefers-reduced-motion：系统关闭动效时直接不播。
 */
export const enterSx = (delay = 0) => ({
  // fill-mode 用 backwards 而非 both：延迟期间保持「起点」不闪，播完后交还常规样式，
  // 否则动画终帧会一直压制 hover 的 transform（卡片上浮会失效）。
  animation: `${fadeInUp} .5s ease backwards`,
  animationDelay: `${delay}s`,
  '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
});

/** 通用卡片观感：极淡描边 + 柔和投影 + hover 上浮（hover 描边转绿），深浅两套自动适配 */
export const surfaceCard = (theme) => {
  const tone = theme.palette.mode === 'dark' ? shadows.dark : shadows.light;
  return {
    height: '100%',
    bgcolor: 'background.paper',
    border: '1px solid',
    borderColor: theme.palette.mode === 'dark' ? hairline.dark : hairline.light,
    borderRadius: `${radius.card}px`,
    boxShadow: tone.rest,
    transition: 'transform .2s ease, box-shadow .2s ease, border-color .2s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: tone.hover,
      borderColor: brand.green,
    },
  };
};

/**
 * 无底色、无线框的卡片：与页面底色融为一体，只保留 hover 时的上浮与柔和投影。
 * 用于靠留白而非卡片边界来组织的网格（如「为什么选它」）。
 */
export const ghostCard = (theme) => {
  const tone = theme.palette.mode === 'dark' ? shadows.dark : shadows.light;
  return {
    height: '100%',
    bgcolor: 'transparent',
    backgroundImage: 'none',
    border: 'none',
    borderRadius: `${radius.card}px`,
    boxShadow: 'none',
    transition: 'transform .2s ease, box-shadow .2s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: tone.hover,
    },
  };
};

/* ------------------------------- 主题工厂 ------------------------------- */

const FONT_FAMILY = 'Roboto, "PingFang SC", "Microsoft YaHei", system-ui, sans-serif';

/** 先建基础主题，再用它的 breakpoints 写响应式字号（小屏收敛、大屏保持原观感） */
function createBaseTheme(mode) {
  const isDark = mode === 'dark';
  return createTheme({
    palette: {
      mode,
      primary: {
        main: brand.green,
        light: brand.greenLight,
        dark: brand.greenDark,
        contrastText: '#FFFFFF',
      },
      secondary: { main: isDark ? brand.greenLight : brand.greenDark },
      success: { main: '#16A34A' },
      warning: { main: '#F59E0B' },
      error: { main: '#DC2626' },
      // 大区块底色两档：default = 灰底档、paper = 白底档。
      // 页面各大区块按「灰 → 白 → 灰 → 白 → 灰」交替区分边界（顺序见各区块组件），不加分隔线。
      background: isDark
        ? { default: '#111111', paper: '#1A1A1A' }
        : { default: '#F5F5F5', paper: '#FFFFFF' },
      text: isDark
        ? { primary: '#F5F5F5', secondary: '#A3A3A3' }
        : { primary: '#111111', secondary: '#666666' },
      divider: isDark ? 'rgba(255,255,255,0.10)' : '#E5E5E5',
    },
    shape: { borderRadius: radius.card },
    typography: {
      fontFamily: FONT_FAMILY,
      h3: { fontWeight: 600, fontSize: '1.0625rem', lineHeight: 1.5 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
  });
}

/** 按明暗模式生成主题（组件里用 useMemo 缓存，避免重复构建） */
export function getTheme(mode = 'light') {
  const base = createBaseTheme(mode);
  return createTheme(base, {
    typography: {
      h1: {
        fontWeight: 700,
        lineHeight: 1.15,
        letterSpacing: '-0.02em',
        fontSize: '2rem',
        [base.breakpoints.up('sm')]: { fontSize: '2.4rem' },
        [base.breakpoints.up('md')]: { fontSize: '2.75rem' },
      },
      h2: {
        fontWeight: 700,
        letterSpacing: '-0.01em',
        fontSize: '1.5rem',
        [base.breakpoints.up('md')]: { fontSize: '1.8rem' },
      },
    },
    components: {
      MuiButton: {
        styleOverrides: { root: { borderRadius: radius.button } },
      },
      MuiChip: {
        styleOverrides: { root: { borderRadius: radius.chip } },
      },
      MuiToggleButton: {
        styleOverrides: { root: { borderRadius: radius.button } },
      },
      MuiAccordion: {
        styleOverrides: {
          root: { borderRadius: radius.card, backgroundImage: 'none' },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: { root: { borderRadius: radius.card } },
      },
    },
  });
}
