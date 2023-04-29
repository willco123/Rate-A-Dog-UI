export default function getCarouselDistance(
  firstCarousel: HTMLDivElement | null = null,
  secondCarousel: HTMLDivElement | null = null,
) {
  if (firstCarousel === null || secondCarousel === null) return 0;
  const firstCarouselWidth = firstCarousel.getBoundingClientRect().width;

  const secondCarouselWidth = secondCarousel.getBoundingClientRect().width;
  const distance = firstCarouselWidth + secondCarouselWidth;
  return distance;
}
