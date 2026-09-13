import SvgIcon from '@mui/material/SvgIcon';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import { carouselClasses } from './classes.js';
import { mergeClasses } from './utils.js';

/*
 * 箭头：无底色无描边的纯 chevron 按钮（ArrowButton）+ 左右浮动态（CarouselArrowFloatButtons）。
 * 移植自参考站 vite-js/src/components/carousel/components/arrow-button.jsx 与 carousel-arrow-buttons.jsx。
 */

const prevSvgPath = (
  <path
    fill="currentColor"
    fillRule="evenodd"
    d="M15.488 4.43a.75.75 0 0 1 .081 1.058L9.988 12l5.581 6.512a.75.75 0 1 1-1.138.976l-6-7a.75.75 0 0 1 0-.976l6-7a.75.75 0 0 1 1.057-.081"
    clipRule="evenodd"
  />
);

const nextSvgPath = (
  <path
    fill="currentColor"
    fillRule="evenodd"
    d="M8.512 4.43a.75.75 0 0 1 1.057.082l6 7a.75.75 0 0 1 0 .976l-6 7a.75.75 0 0 1-1.138-.976L14.012 12L8.431 5.488a.75.75 0 0 1 .08-1.057"
    clipRule="evenodd"
  />
);

export function ArrowButton({ sx, svgIcon, options, variant, className, svgSize = 20, ...other }) {
  const isPrev = variant === 'prev';

  const svgContent = svgIcon || (isPrev ? prevSvgPath : nextSvgPath);

  return (
    <ArrowButtonRoot
      axis={options?.axis}
      direction={options?.direction}
      aria-label={isPrev ? 'Prev button' : 'Next button'}
      className={mergeClasses([carouselClasses.arrows[isPrev ? 'prev' : 'next'], className])}
      sx={sx}
      {...other}
    >
      <SvgIcon className={carouselClasses.arrows.svg} sx={{ width: svgSize, height: svgSize }}>
        {svgContent}
      </SvgIcon>
    </ArrowButtonRoot>
  );
}

/* ---------------------------- 左右浮动态 ---------------------------- */

export function CarouselArrowFloatButtons({
  sx,
  options,
  slotProps,
  onClickPrev,
  onClickNext,
  disablePrev,
  disableNext,
}) {
  const baseStyles = (theme) => ({
    zIndex: 9,
    top: '50%',
    borderRadius: 1.5,
    position: 'absolute',
    color: 'common.white',
    bgcolor: 'text.primary',
    '&:hover': { opacity: 0.8 },
    // 参考站用的是 theme.applyStyles('dark', ...)，我们的暗色走 palette.mode，故改成条件判断
    ...(theme.palette.mode === 'dark' && { color: theme.palette.grey[800] }),
  });

  return (
    <>
      <ArrowButton
        variant="prev"
        options={options}
        disabled={disablePrev}
        onClick={onClickPrev}
        svgIcon={slotProps?.prevBtn?.svgIcon}
        svgSize={slotProps?.prevBtn?.svgSize}
        sx={[
          (theme) => ({
            ...baseStyles(theme),
            left: 0,
            transform: 'translate(-50%, -50%)',
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
          ...(Array.isArray(slotProps?.prevBtn?.sx)
            ? (slotProps?.prevBtn?.sx ?? [])
            : [slotProps?.prevBtn?.sx]),
        ]}
      />

      <ArrowButton
        variant="next"
        options={options}
        disabled={disableNext}
        onClick={onClickNext}
        svgIcon={slotProps?.nextBtn?.svgIcon}
        svgSize={slotProps?.nextBtn?.svgSize}
        sx={[
          (theme) => ({
            ...baseStyles(theme),
            right: 0,
            transform: 'translate(50%, -50%)',
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
          ...(Array.isArray(slotProps?.nextBtn?.sx)
            ? (slotProps?.nextBtn?.sx ?? [])
            : [slotProps?.nextBtn?.sx]),
        ]}
      />
    </>
  );
}

/* ------------------------------- 样式 ------------------------------- */

const ArrowButtonRoot = styled(ButtonBase, {
  shouldForwardProp: (prop) => !['axis', 'direction', 'sx'].includes(prop),
})(({ theme }) => ({
  borderRadius: '50%',
  boxSizing: 'content-box',
  padding: theme.spacing(1),
  transition: theme.transitions.create(['all'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.short,
  }),
  variants: [
    { props: { disabled: true }, style: { opacity: 0.4 } },
    {
      props: { axis: 'y' },
      style: { [`& .${carouselClasses.arrows.svg}`]: { transform: 'rotate(90deg)' } },
    },
    {
      props: { direction: 'rtl' },
      style: { [`& .${carouselClasses.arrows.svg}`]: { transform: 'scaleX(-1)' } },
    },
  ],
}));
