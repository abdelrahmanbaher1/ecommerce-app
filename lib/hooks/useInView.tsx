import { useEffect, useRef, useState } from "react";

const THRESHOLD = 0.75;

const useIsInViewport = (ref: React.RefObject<Element>) => {
  const [isInView, setIsInView] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return; // Check if running in a browser

    observer.current = new IntersectionObserver(
      ([entry]) => {
        setIsInView(
          entry.isIntersecting && entry.intersectionRatio >= THRESHOLD
        );
      },
      { threshold: THRESHOLD }
    );

    const currentRef = ref.current;
    observer.current.observe(currentRef);

    return () => {
      if (observer.current) {
        observer.current.disconnect(); // Disconnect the observer on cleanup
      }
    };
  }, [ref]);

  return isInView;
};

export default useIsInViewport;
