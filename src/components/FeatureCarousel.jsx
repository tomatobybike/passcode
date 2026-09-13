import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import LanguageIcon from '@mui/icons-material/Language';
import TerminalIcon from '@mui/icons-material/Terminal';
import DevicesIcon from '@mui/icons-material/Devices';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import KeyIcon from '@mui/icons-material/Key';
import TypeMock from './TypeMock.jsx';
import {
  Carousel,
  CarouselThumbs,
  CarouselArrowFloatButtons,
  useCarousel,
} from './carousel/index.js';
import { useI18n } from '../i18n/I18nProvider.jsx';

// 账号排第 1 位：产品本身就是「账号、链接、客户端、命令、便签」五类
const TYPES = ['account', 'link', 'command', 'client', 'note'];

/** 缩略条图标：五个类型的图形区分度最高 */
const TYPE_ICONS = {
  account: KeyIcon,
  link: LanguageIcon,
  command: TerminalIcon,
  client: DevicesIcon,
  note: StickyNote2OutlinedIcon,
};

/** 卡片宽度上限：与参考站的幻灯片一屏一张对应 */
const CARD_MAX = 520;
/** 箭头距卡片边缘的间距：按钮宽 40 + 间隙 8 */
const ARROW_OFFSET = 48;
/** 缩略格子与格内徽标：选中时徽标从半尺寸放大到占满格子 */
const THUMB_CELL = { xs: 64, sm: 96 };
const THUMB_DOT = { xs: 32, sm: 48 };
const THUMB_IDLE_OPACITY = 0.48;

/*
 * 缩略轨共三份槽位。参考站有 8 张缩略图（864px）才有足够行程让 embla 把当前项居中；
 * 我们只有 5 类（5×108 = 540px，仅比 480px 视口宽 60px），不补行程时活动项会偏离中心近 190px。
 * 第一份（序号 0~4）参与点击与读屏 —— 因为 embla 的 `scrollTo(i)` 正是居中第 i 个槽位，
 * 后两份只是把行程撑够、保证每个序号都能被送到视口正中。
 */
const THUMB_SLOTS = Array.from({ length: TYPES.length * 3 }, (_, i) => i);

/**
 * 条目类型轮播：直接移植参考站 `_elearning/elearning-testimonial.jsx` 的写法 ——
 * `useCarousel` 建主实例 + 缩略实例，`Carousel` / `CarouselThumbs` 只负责 embla 要求的三层 DOM，
 * 位移全部由 embla 逐帧写入 translate3d（因此没有 CSS transition，也就没有 reduce-motion 分支）。
 *
 * 与参考的两处有意偏差：
 * 1. 浮动箭头位置：参考贴容器边缘（会压在内容上），我们的幻灯片是白底窗口卡片，故放在卡片外侧；
 * 2. 不抄 `startIndex: 1`（那只是参考用来演示循环），我们从「账号」开始。
 */
export default function FeatureCarousel() {
  const { t } = useI18n();

  const carousel = useCarousel({
    loop: true,
    thumbs: { loop: true, slidesToShow: 'auto' },
  });

  const sideOffset = `max(4px, calc((100% - ${CARD_MAX}px) / 2 - ${ARROW_OFFSET}px))`;

  return (
    <Box sx={{ textAlign: 'left' }}>
      <Box sx={{ position: 'relative' }}>
        <CarouselArrowFloatButtons
          {...carousel.arrows}
          options={carousel.options}
          slotProps={{ prevBtn: { sx: { left: sideOffset } }, nextBtn: { sx: { right: sideOffset } } }}
          sx={{
            borderRadius: '50%',
            color: 'text.primary',
            bgcolor: 'transparent',
            display: { xs: 'none', md: 'flex' },
          }}
        />

        <Carousel
          carousel={carousel}
          role="region"
          aria-roledescription="carousel"
          aria-label={t('types.title')}
          // li 默认是 block：改成伸缩列，幻灯片内容才能拿到确定高度、5 张卡等高
          slotProps={{ slide: { display: 'flex', flexDirection: 'column' } }}
          sx={{
            maxWidth: CARD_MAX,
            // 竖向留白给卡片投影，否则会被 root 的 overflow: hidden 裁掉
            py: 3,
            cursor: 'grab',
            '&:active': { cursor: 'grabbing' },
          }}
        >
          {TYPES.map((type, i) => (
            <Box
              key={type}
              role="group"
              aria-roledescription="slide"
              aria-label={t('types.dot', { n: i + 1, total: TYPES.length })}
              // flex: 1 拿到 li 的确定高度，再交给 TypeMock 撑满
              sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}
            >
              <TypeMock type={type} />
            </Box>
          ))}
        </Carousel>
      </Box>

      <CarouselThumbs
        ref={carousel.thumbs.thumbsRef}
        options={carousel.options?.thumbs}
        slotProps={{ disableMask: true }}
        sx={{ width: { xs: 1, sm: 480 }, mx: 'auto' }}
      >
        {THUMB_SLOTS.map((slot) => {
          const typeIndex = slot % TYPES.length;
          const type = TYPES[typeIndex];
          const Icon = TYPE_ICONS[type];
          const active = typeIndex === carousel.thumbs.selectedIndex;
          // 后两份副本只负责撑行程，不参与读屏，避免同一类型被重复朗读
          const isReal = slot < TYPES.length;

          const thumb = (
            <Box
              component="button"
              type="button"
              onClick={() => carousel.thumbs.onClickThumb(typeIndex)}
              aria-label={t(`types.${type}.title`)}
              aria-current={isReal ? active : undefined}
              aria-hidden={isReal ? undefined : true}
              tabIndex={isReal ? undefined : -1}
              sx={{
                width: THUMB_CELL,
                height: THUMB_CELL,
                p: 0,
                border: 0,
                bgcolor: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{
                  width: active ? '100%' : THUMB_DOT,
                  height: active ? '100%' : THUMB_DOT,
                  opacity: active ? 1 : THUMB_IDLE_OPACITY,
                  borderRadius: '50%',
                  // 中性圆底：区块本身就是 #F5F5F5 灰底，action.hover 会几乎看不见，
                  // 故用背景纸白；选中与未选中同一个底，只靠图标色与不透明度区分。
                  bgcolor: 'background.paper',
                  color: active ? 'text.primary' : 'text.secondary',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: (theme) =>
                    theme.transitions.create(['width', 'height', 'opacity', 'background-color']),
                }}
              >
                <Icon
                  sx={{
                    fontSize: 20,
                    transform: active ? 'scale(2)' : 'scale(1)',
                    transition: (theme) => theme.transitions.create(['transform']),
                  }}
                />
              </Box>
            </Box>
          );

          return (
            <Box key={slot}>
              {isReal ? <Tooltip title={t(`types.${type}.title`)}>{thumb}</Tooltip> : thumb}
            </Box>
          );
        })}
      </CarouselThumbs>
    </Box>
  );
}
