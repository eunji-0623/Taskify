import { useState, useEffect, useRef } from 'react';

/*  무한스크롤을 위한 hook입니다
    intersectionObserver를 사용했습니다
    사용 예시는 Invited.tsx와 Table.tsx를 참고해주세요 */

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
