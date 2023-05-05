export function getCarouselWidth(
  firstCarousel: HTMLDivElement | null = null,
  secondCarousel: HTMLDivElement | null = null,
) {
  if (firstCarousel === null || secondCarousel === null) return 0;
  const firstCarouselWidth = firstCarousel.getBoundingClientRect().width;
  const secondCarouselWidth = secondCarousel.getBoundingClientRect().width;

  const distance = firstCarouselWidth + secondCarouselWidth;
  return distance;
}

export function getCarouselDistance(
  firstCarousel: HTMLDivElement | null = null,
  secondCarousel: HTMLDivElement | null = null,
) {
  if (firstCarousel === null || secondCarousel === null) return 0;
  const firstCarouselWidth = firstCarousel.getBoundingClientRect().left;
  const secondCarouselWidth = secondCarousel.getBoundingClientRect().left;

  const distance = Math.abs(firstCarouselWidth - secondCarouselWidth);
  return distance;
}
