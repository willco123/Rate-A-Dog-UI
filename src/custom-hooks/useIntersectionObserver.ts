import React, { useEffect } from "react";

const useIntersectionObserver = ({
  target,
  onIntersect,
  threshold = 0,
  rootMargin = "150px",
}: {
  target: React.RefObject<HTMLDivElement>;
  onIntersect: IntersectionObserverCallback;
  threshold?: number;
  rootMargin?: string;
}) => {
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      rootMargin,
      threshold,
    });

    const current = target.current;
    if (!current) return;
    observer.observe(current);
    return () => {
      observer.unobserve(current);
    };
  }); //if empty dependacy array enjoy images not getting re-observed if cached
};

export default useIntersectionObserver;
