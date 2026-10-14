"use client";

import { useEffect, useState, RefObject } from "react";

interface ObserverOptions {
  rootMargin?: string;
  threshold?: number | number[];
}

export function useIntersectionObserver(
  elementRef: RefObject<Element | null>,
  options: ObserverOptions = {}
): boolean {
  const [isVisible, setIsVisible] = useState(false);
  const { rootMargin, threshold } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, rootMargin, threshold]);

  return isVisible;
}
