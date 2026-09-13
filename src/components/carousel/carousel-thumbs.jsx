import { Children, forwardRef, isValidElement } from 'react';
import { styled } from '@mui/material/styles';
import { carouselClasses } from './classes.js';
import { mergeClasses } from './utils.js';
import { CarouselSlide } from './carousel.jsx';

/*
 * CarouselThumbs：缩略轨。结构与 Carousel 一致（root → container → slide），
 * 默认 slideSpacing 12px：格子靠 slide 的 paddingLeft 撑开、容器用等量负 margin 收回，
 * 因此放大缩小发生在定宽格子内部，不产生布局跳动。
 * 移植自参考站 vite-js/src/components/carousel/components/carousel-thumbs.jsx。
 */

export const CarouselThumbs = forwardRef((props, ref) => {
  const { children, slotProps, options, sx, className, ...other } = props;

  const axis = options?.axis ?? 'x';
  const slideSpacing = options?.slideSpacing ?? '12px';

  const renderChildren = () =>
    Children.map(children, (child) => {
      if (!isValidElement(child)) return null;

      return (
        <CarouselSlide
          key={child.key}
          options={{ ...options, slideSpacing }}
          sx={slotProps?.slide}
        >
          {child}
        </CarouselSlide>
      );
    });

  return (
    <ThumbsRoot
      ref={ref}
      axis={axis}
      enableMask={!slotProps?.disableMask}
      className={mergeClasses([carouselClasses.thumbs.root, className])}
      sx={sx}
      {...other}
    >
      <ThumbsContainer
        axis={axis}
        slideSpacing={slideSpacing}
        className={carouselClasses.thumbs.container}
        sx={slotProps?.container}
      >
        {renderChildren()}
      </ThumbsContainer>
    </ThumbsRoot>
  );
});

/* ------------------------------- 样式 ------------------------------- */

const ThumbsRoot = styled('div', {
  shouldForwardProp: (prop) => !['axis', 'enableMask', 'sx'].includes(prop),
})(({ enableMask, theme }) => {
  // 参考站用的是 theme.vars（需要 cssVariables 主题），这里改用普通 palette
  const maskBg = `${theme.palette.background.paper} 20%, transparent 100%)`;

  return {
    flexShrink: 0,
    margin: 'auto',
    maxWidth: '100%',
    overflow: 'hidden',
    position: 'relative',
    variants: [
      {
        props: { axis: 'x' },
        style: {
          maxWidth: '100%',
          padding: theme.spacing(0.5),
          ...(enableMask && {
            '&::before, &::after': {
              top: 0,
              zIndex: 9,
              width: 40,
              content: '""',
              height: '100%',
              position: 'absolute',
            },
            '&::before': {
              left: -8,
              background: `linear-gradient(to right, ${maskBg}`,
            },
            '&::after': {
              right: -8,
              background: `linear-gradient(to left, ${maskBg}`,
            },
          }),
        },
      },
      {
        props: { axis: 'y' },
        style: {
          height: '100%',
          maxHeight: '100%',
          padding: theme.spacing(0.5),
          ...(enableMask && {
            '&::before, &::after': {
              left: 0,
              zIndex: 9,
              height: 40,
              content: '""',
              width: '100%',
              position: 'absolute',
            },
            '&::before': {
              top: -8,
              background: `linear-gradient(to bottom, ${maskBg}`,
            },
            '&::after': {
              bottom: -8,
              background: `linear-gradient(to top, ${maskBg}`,
            },
          }),
        },
      },
    ],
  };
});

const ThumbsContainer = styled('ul', {
  shouldForwardProp: (prop) => !['axis', 'slideSpacing', 'sx'].includes(prop),
})(({ slideSpacing }) => ({
  // 与 CarouselContainer 同理：显式清零 ul 默认样式（项目没有全局列表 reset）
  margin: 0,
  padding: 0,
  listStyle: 'none',
  display: 'flex',
  backfaceVisibility: 'hidden',
  variants: [
    {
      props: { axis: 'x' },
      style: {
        touchAction: 'pan-y pinch-zoom',
        marginLeft: `calc(${slideSpacing} * -1)`,
      },
    },
    {
      props: { axis: 'y' },
      style: {
        height: '100%',
        flexDirection: 'column',
        touchAction: 'pan-x pinch-zoom',
        marginTop: `calc(${slideSpacing} * -1)`,
      },
    },
  ],
}));
