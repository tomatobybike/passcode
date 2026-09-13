import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useTheme } from '@mui/material/styles';

/*
 * 轮播内核（移植自参考站 vite-js/src/components/carousel/hooks/）：
 * - useCarousel：主实例 + 箭头状态 + 缩略轨，并回传合并后的 options 供子组件读 axis / slideSpacing / thumbs；
 * - useThumbs：第二个 embla 实例驱动缩略轨（dragFree 自由拖动），主轨 select / reInit 时同步；
 * - useCarouselArrows：禁用态由 canScrollPrev / canScrollNext 驱动（loop 下恒为可点）。
 * 只保留本次用到的三条，未使用的 dots / autoplay / progress / parallax 等插件 hook 不移植。
 */

export function useCarousel(options) {
  const theme = useTheme();

  const [mainRef, mainApi] = useEmblaCarousel({ ...options, direction: theme.direction });

  const { disablePrev, disableNext, onClickPrev, onClickNext } = useCarouselArrows(mainApi);

  const thumbs = useThumbs(mainApi, options?.thumbs);

  // embla 会用默认值补全选项，这里合并后交给箭头与缩略轨读取
  const mergedOptions = { ...options, ...mainApi?.internalEngine().options };

  return {
    options: mergedOptions,
    mainRef,
    mainApi,
    arrows: { disablePrev, disableNext, onClickPrev, onClickNext },
    thumbs,
  };
}

/* ------------------------------- 箭头 ------------------------------- */

export function useCarouselArrows(mainApi) {
  const [disablePrev, setDisabledPrevBtn] = useState(true);
  const [disableNext, setDisabledNextBtn] = useState(true);

  const onClickPrev = useCallback(() => {
    if (!mainApi) return;
    mainApi.scrollPrev();
  }, [mainApi]);

  const onClickNext = useCallback(() => {
    if (!mainApi) return;
    mainApi.scrollNext();
  }, [mainApi]);

  const onSelect = useCallback((_mainApi) => {
    setDisabledPrevBtn(!_mainApi.canScrollPrev());
    setDisabledNextBtn(!_mainApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!mainApi) return undefined;

    onSelect(mainApi);
    mainApi.on('reInit', onSelect);
    mainApi.on('select', onSelect);

    return () => {
      mainApi.off('reInit', onSelect);
      mainApi.off('select', onSelect);
    };
  }, [mainApi, onSelect]);

  return { disablePrev, disableNext, onClickPrev, onClickNext };
}

/* ------------------------------- 缩略轨 ------------------------------- */

export function useThumbs(mainApi, options) {
  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    ...options,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const prevIndexRef = useRef(null);

  const onClickThumb = useCallback(
    (index) => {
      if (!mainApi || !thumbsApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi, thumbsApi]
  );

  /*
   * 主轨与缩略轨同步：按「沿 loop 的最短视觉路径」下发。
   * 直接 scrollTo 目标序号会让缩略轨走直连路径 —— 末张绕回首张时会整段回卷
   * （实测横跨 4 格 / 432px，观感像「突然回到第一个」），而参考站的行为是沿 loop 只滑一格（108px）。
   * 所以：±1 → scrollNext/scrollPrev；末张 ↔ 首张 → 同样单格且方向与主轨一致；
   * 只有跨多张（点击缩略项）才用 scrollTo 直连。
   */
  const onSelect = useCallback(() => {
    if (!mainApi || !thumbsApi) return;

    const next = mainApi.selectedScrollSnap();
    const prev = prevIndexRef.current;
    const count = mainApi.scrollSnapList().length;

    prevIndexRef.current = next;
    setSelectedIndex(next);

    if (prev === null || prev === next) {
      thumbsApi.scrollTo(next);
      return;
    }

    const delta = next - prev;
    if (delta === 1) thumbsApi.scrollNext();
    else if (delta === -1) thumbsApi.scrollPrev();
    else if (delta === -(count - 1)) thumbsApi.scrollNext();
    else if (delta === count - 1) thumbsApi.scrollPrev();
    else thumbsApi.scrollTo(next);
  }, [mainApi, thumbsApi]);

  useEffect(() => {
    if (!mainApi) return undefined;

    onSelect();
    mainApi.on('select', onSelect);
    mainApi.on('reInit', onSelect);

    return () => {
      mainApi.off('select', onSelect);
      mainApi.off('reInit', onSelect);
    };
  }, [mainApi, onSelect]);

  return { onClickThumb, thumbsRef, thumbsApi, selectedIndex };
}
