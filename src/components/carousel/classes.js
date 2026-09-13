/*
 * 轮播内部选择器锚点（对应参考站的 carouselClasses）。
 * 只在我们自己的 styled 组件之间用 `& .${...}` 互相引用，因此直接写字面量即可，
 * 不需要参考站那套 createClasses / themeConfig.classesPrefix 依赖。
 */
const prefix = 'pc-carousel';

export const carouselClasses = {
  root: `${prefix}__root`,
  container: `${prefix}__container`,
  arrows: {
    prev: `${prefix}__arrow__prev`,
    next: `${prefix}__arrow__next`,
    svg: `${prefix}__arrow__svg`,
  },
  slide: {
    root: `${prefix}__slide__root`,
    content: `${prefix}__slide__content`,
  },
  thumbs: {
    root: `${prefix}__thumbs__root`,
    container: `${prefix}__thumbs__container`,
  },
};
