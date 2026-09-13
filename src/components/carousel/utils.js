/* ------------------------------- 工具 ------------------------------- */

/** 拼接类名（替代参考站用的 minimal-shared/mergeClasses） */
export function mergeClasses(classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * 把 slidesToShow 换算成 flex 简写（与参考站一致）：
 * - 数字 n → `0 0 ${100 / n}%`（一次显示 n 张）
 * - 'auto' / 'xx%' / 'xxpx' → `0 0 <原值>`
 * - 不传 → `0 0 100%`（一次一屏）
 */
export function getSlideSize(slidesToShow) {
  if (slidesToShow && typeof slidesToShow === 'object') {
    return Object.keys(slidesToShow).reduce((acc, key) => {
      acc[key] = getValue(slidesToShow[key]);
      return acc;
    }, {});
  }

  return getValue(slidesToShow);
}

function getValue(value = 1) {
  if (typeof value === 'string') {
    const isSupported = value === 'auto' || value.endsWith('%') || value.endsWith('px');
    if (!isSupported) throw new Error('Only accepts values: auto, px, %, or number.');
    return `0 0 ${value}`;
  }

  if (typeof value === 'number') return `0 0 ${100 / value}%`;

  throw new Error('Invalid value type. Only accepts values: auto, px, %, or number.');
}
