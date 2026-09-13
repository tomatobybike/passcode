import { Children, isValidElement } from 'react';
import { styled } from '@mui/material/styles';
import { carouselClasses } from './classes.js';
import { getSlideSize, mergeClasses } from './utils.js';

/*
 * Carousel：主轮播。DOM 三层是 embla 的硬性要求 ——
 *   root（overflow: hidden，ref 挂在它上面）→ container（ul，transform 由 embla 逐帧写入）→ slide（li）。
 * 移植自参考站 vite-js/src/components/carousel/carousel.jsx。
 */

export function Carousel({ sx, carousel, children, slotProps, className, ...other }) {
  const { mainRef, options } = carousel;

  const axis = options?.axis ?? 'x';
  const slideSpacing = options?.slideSpacing ?? '0px';

  const renderChildren = () =>
    Children.map(children, (child) => {
      if (!isValidElement(child)) return null;

      return (
        <CarouselSlide key={child.key} options={carousel.options} sx={slotProps?.slide}>
          {child}
        </CarouselSlide>
      );
    });

  return (
    <CarouselRoot
      sx={sx}
      ref={mainRef}
      axis={axis}
      className={mergeClasses([carouselClasses.root, className])}
      {...other}
    >
      <CarouselContainer
        axis={axis}
        slideSpacing={slideSpacing}
        className={carouselClasses.container}
        sx={slotProps?.container}
      >
        {renderChildren()}
      </CarouselContainer>
    </CarouselRoot>
  );
}

/* ------------------------------- 单张幻灯片 ------------------------------- */

export function CarouselSlide({ sx, options, children, className, ...other }) {
  const slideSize = getSlideSize(options?.slidesToShow);

  return (
    <CarouselSlideRoot
      axis={options?.axis ?? 'x'}
      slideSpacing={options?.slideSpacing}
      className={mergeClasses([carouselClasses.slide.root, className])}
      sx={[{ flex: slideSize }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    >
      {children}
    </CarouselSlideRoot>
  );
}

/* ------------------------------- 样式 ------------------------------- */

const CarouselRoot = styled('div', {
  shouldForwardProp: (prop) => !['axis', 'sx'].includes(prop),
})(() => ({
  margin: 'auto',
  maxWidth: '100%',
  overflow: 'hidden',
  position: 'relative',
  variants: [{ props: { axis: 'y' }, style: { height: '100%' } }],
}));

const CarouselContainer = styled('ul', {
  shouldForwardProp: (prop) => !['axis', 'slideSpacing', 'sx'].includes(prop),
})(({ slideSpacing }) => ({
  // 参考站靠 Minimal 的全局 reset 抹平 ul 默认样式（padding-left 40px / 上下 margin），
  // 我们项目只有 CssBaseline（不清列表），所以在容器与幻灯片上显式清零。
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

const CarouselSlideRoot = styled('li', {
  shouldForwardProp: (prop) => !['axis', 'slideSpacing', 'sx'].includes(prop),
})(({ slideSpacing }) => ({
  display: 'block',
  listStyle: 'none',
  position: 'relative',
  [`& .${carouselClasses.slide.content}`]: {
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 'inherit',
  },
  variants: [
    { props: { axis: 'x' }, style: { minWidth: 0, paddingLeft: slideSpacing } },
    { props: { axis: 'y' }, style: { minHeight: 0, paddingTop: slideSpacing } },
  ],
}));
