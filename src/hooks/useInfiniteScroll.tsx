import { useState, useEffect, useRef } from 'react';

interface InfiniteScrollOptions {
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number;
}

const useInfiniteScroll = (
  callback: () => void,
  options: InfiniteScrollOptions
) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    };

    observer.current = new IntersectionObserver(handleObserver, options);

    if (element) {
      observer.current.observe(element);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [callback, element, options]);

  return setElement;
};

export default useInfiniteScroll;
