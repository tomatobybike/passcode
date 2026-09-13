import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LanguageIcon from '@mui/icons-material/Language';
import TerminalIcon from '@mui/icons-material/Terminal';
import DevicesIcon from '@mui/icons-material/Devices';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import TypeMock from './TypeMock.jsx';
import { useI18n } from '../i18n/I18nProvider.jsx';

const TYPES = ['link', 'command', 'client', 'note'];

/** 缩略条图标：四个类型的图形区分度最高 */
const TYPE_ICONS = {
  link: LanguageIcon,
  command: TerminalIcon,
  client: DevicesIcon,
  note: StickyNote2OutlinedIcon,
};

/** 卡片宽度上限：容器比它宽时用左右内边距把卡片顶到中间，首尾卡才能居中 */
const CARD_MAX = 520;
/** 箭头距卡片边缘的间距：按钮宽 40 + 间隙 8 */
const ARROW_OFFSET = 48;
const ANIM_MS = 520;
const SETTLE_MS = 160;

/* 缩略条：定宽格子（放大时不挤压邻居，也就没有布局跳动）+ 参考站实测的 0.3s 标准缓动 */
const THUMB_W = { xs: 76, sm: 92 };
const THUMB_MS = 300;
const THUMB_EASE = 'cubic-bezier(0.4, 0, 0.2, 1)';
const THUMB_IDLE_SCALE = 0.86;
const THUMB_IDLE_OPACITY = 0.48;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const easeInOutCubic = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

// 只有箭头图形，不要任何按钮外观（无底色/描边/投影）
const arrowSx = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 2,
  // 窄屏箭头会叠在卡片上，缩小一档以免压到卡内文字（无背景后没有遮挡缓冲）
  width: { xs: 32, sm: 40 },
  height: { xs: 32, sm: 40 },
  bgcolor: 'transparent',
  border: 0,
  boxShadow: 'none',
  color: 'text.secondary',
  // MUI IconButton 的悬停底色由 CSS 变量提供，必须一并覆盖，否则 hover 时会浮出圆底
  '--IconButton-hoverBg': 'transparent',
  '&:hover': { bgcolor: 'transparent', color: 'text.primary', boxShadow: 'none' },
  '&.Mui-disabled': { bgcolor: 'transparent', color: 'text.disabled', boxShadow: 'none' },
};

/**
 * 条目类型轮播：原生滚动 + 自绘动效，不引入任何轮播依赖。
 * - 箭头位于卡片两侧（滚动容器之外，否则会被 overflow 裁掉），底部只留圆点；
 * - 切换用 rAF + easeInOutCubic 缓动（浏览器原生 smooth 时间与曲线不可控，且强制吸附会与程序滚动打架，所以不用 scroll-snap）；
 * - 用户自由滑动停止后做一次「静默吸附」，保留磁性手感；
 * - 非当前卡淡出并轻微缩小，形成焦点交接，避免硬切。
 */
export default function FeatureCarousel() {
  const { t } = useI18n();
  const scrollerRef = useRef(null);
  const rafRef = useRef(0);
  const settleRef = useRef(0);
  const animatingRef = useRef(false);
  const [index, setIndex] = useState(0);

  /** 每张卡居中时对应的 scrollLeft（视口即一张卡宽，首尾都能精确居中，无需夹取兜底） */
  const getSnapPositions = () => {
    const el = scrollerRef.current;
    if (!el || !el.children.length) return [];
    // 容器自身居中后，子节点的 offsetLeft 是「相对定位包裹层」的值，必须减掉视口原点
    const origin = el.offsetLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;
    return [...el.children].map((kid) => {
      const centered = kid.offsetLeft - origin - (el.clientWidth - kid.offsetWidth) / 2;
      return Math.max(0, Math.min(maxScroll, centered));
    });
  };

  /** 逐帧缓动滚动；开始前必须取消旧动画，否则连点箭头会互相抢 scrollLeft */
  const animateTo = (target) => {
    const el = scrollerRef.current;
    if (!el) return;
    cancelAnimationFrame(rafRef.current);
    if (prefersReducedMotion()) {
      el.scrollLeft = target;
      animatingRef.current = false;
      return;
    }
    const start = el.scrollLeft;
    const distance = target - start;
    if (!distance) {
      animatingRef.current = false;
      return;
    }
    const startedAt = performance.now();
    animatingRef.current = true;
    const step = (now) => {
      const progress = Math.min(1, (now - startedAt) / ANIM_MS);
      el.scrollLeft = start + distance * easeInOutCubic(progress);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        animatingRef.current = false;
      }
    };
    rafRef.current = requestAnimationFrame(step);
  };

  const scrollToIndex = (next) => {
    const snaps = getSnapPositions();
    if (!snaps.length) return;
    const clamped = Math.max(0, Math.min(TYPES.length - 1, next));
    animateTo(snaps[clamped]);
    setIndex(clamped);
  };

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const snaps = getSnapPositions();
    if (!snaps.length) return;
    let nearest = 0;
    let nearestDistance = Infinity;
    snaps.forEach((left, i) => {
      const distance = Math.abs(left - el.scrollLeft);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = i;
      }
    });
    setIndex(nearest);

    // 程序动画期间不介入；用户自由滑动停止后，平滑吸附到最近一张
    if (animatingRef.current) return;
    clearTimeout(settleRef.current);
    settleRef.current = setTimeout(() => {
      const current = getSnapPositions();
      if (!current.length) return;
      let target = 0;
      let best = Infinity;
      current.forEach((left) => {
        const distance = Math.abs(left - el.scrollLeft);
        if (distance < best) {
          best = distance;
          target = left;
        }
      });
      if (best > 1) animateTo(target);
    }, SETTLE_MS);
  };

  // 卸载时清掉 rAF 与静默吸附定时器，避免在已卸载组件上更新状态
  useEffect(
    () => () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(settleRef.current);
    },
    [],
  );

  const sideOffset = `max(4px, calc((100% - ${CARD_MAX}px) / 2 - ${ARROW_OFFSET}px))`;

  return (
    // 段② 外层是居中的标题排版，卡片内部需要回到左对齐（markdown 便签、命令块等）
    <Box sx={{ textAlign: 'left' }}>
      <Box sx={{ position: 'relative' }}>
        {/* 箭头必须是滚动容器的同级兄弟：放进去会被 overflow: auto 裁掉 */}
        <IconButton
          onClick={() => scrollToIndex(index - 1)}
          disabled={index === 0}
          aria-label={t('types.prev')}
          sx={{ ...arrowSx, left: sideOffset }}
        >
          <ChevronLeftIcon sx={{ fontSize: { xs: 22, sm: 28 } }} />
        </IconButton>

        <Box
          ref={scrollerRef}
          onScroll={handleScroll}
          role="region"
          aria-roledescription="carousel"
          aria-label={t('types.title')}
          sx={{
            // 视口 = 一张卡宽度并居中：静止时只显示当前卡，邻卡被容器裁掉
            width: '100%',
            maxWidth: CARD_MAX,
            mx: 'auto',
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            // 竖向留白给 hover 上浮与投影，同时避免出现纵向滚动条
            overflowY: 'hidden',
            py: 3,
            // 不用 scroll-snap：强制吸附会与 rAF 动效抢控制权，产生骤停/二次吸附
            scrollSnapType: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {TYPES.map((type, i) => (
            <Box
              key={type}
              role="group"
              aria-roledescription="slide"
              aria-label={t('types.dot', { n: i + 1 })}
              sx={{
                flex: '0 0 100%',
                minWidth: 0,
                // 焦点交接：当前卡满尺寸，其余卡淡出并轻微缩小
                opacity: i === index ? 1 : 0.55,
                transform: i === index ? 'scale(1)' : 'scale(0.94)',
                transition: 'opacity .45s ease, transform .45s ease',
                '@media (prefers-reduced-motion: reduce)': {
                  opacity: 1,
                  transform: 'none',
                  transition: 'none',
                },
              }}
            >
              <TypeMock type={type} />
            </Box>
          ))}
        </Box>

        <IconButton
          onClick={() => scrollToIndex(index + 1)}
          disabled={index === TYPES.length - 1}
          aria-label={t('types.next')}
          sx={{ ...arrowSx, right: sideOffset }}
        >
          <ChevronRightIcon sx={{ fontSize: { xs: 22, sm: 28 } }} />
        </IconButton>
      </Box>

      {/* 底部控制区：类型缩略条 —— 活动项放大高亮，其余缩小变淡（定宽格子，无布局跳动） */}
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        useFlexGap
        spacing={1}
      >
        {TYPES.map((type, i) => {
          const Icon = TYPE_ICONS[type];
          const active = i === index;
          return (
            <Box
              key={type}
              component="button"
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={t(`types.${type}.title`)}
              aria-current={active}
              sx={{
                width: THUMB_W,
                minHeight: 44,
                p: 0,
                border: 0,
                bgcolor: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Stack
                direction="row"
                spacing={0.75}
                alignItems="center"
                sx={{
                  color: active ? 'primary.main' : 'text.secondary',
                  fontWeight: active ? 700 : 600,
                  opacity: active ? 1 : THUMB_IDLE_OPACITY,
                  transform: active ? 'scale(1)' : `scale(${THUMB_IDLE_SCALE})`,
                  transition: `opacity ${THUMB_MS}ms ${THUMB_EASE}, transform ${THUMB_MS}ms ${THUMB_EASE}, color ${THUMB_MS}ms ${THUMB_EASE}`,
                  '@media (prefers-reduced-motion: reduce)': {
                    transition: 'none',
                    transform: 'none',
                  },
                }}
              >
                <Icon sx={{ fontSize: 18, flexShrink: 0 }} />
                <Typography variant="body2" sx={{ fontSize: 13, fontWeight: 'inherit', whiteSpace: 'nowrap' }}>
                  {t(`types.${type}.title`)}
                </Typography>
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
