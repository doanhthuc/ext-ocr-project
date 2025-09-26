import type { UIEvent as ReactUIEvent } from 'react';

export function onScrollToEnd(
  event: ReactUIEvent<HTMLElement>,
  handler?: () => void
) {
  const {
    scrollHeight,
    scrollTop,
    clientHeight,
    scrollWidth,
    scrollLeft,
    clientWidth,
  } = event.currentTarget;

  const isScrolledToBottom =
    Math.abs(scrollHeight - clientHeight - scrollTop) < 1;
  const isScrolledToRight =
    Math.abs(scrollWidth - clientWidth - scrollLeft) < 1;

  isScrolledToBottom && isScrolledToRight && handler?.();
}
