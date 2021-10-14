import { useState, useEffect, useRef, MutableRefObject } from 'react';

// via: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export const useInterval = (callback: () => unknown, delay: number | null) => {
  const savedCallback = useRef<() => unknown>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if(typeof savedCallback.current !== 'undefined') {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};


export const useDetectOutsideClick = (el: MutableRefObject<HTMLElement>, initialState: boolean) => {
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const pageClickEvent = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // If the active element exists and is clicked outside of
      if (el.current !== null && !el.current.contains(target)) {
        setIsActive(!isActive);
      }
    };

    // If the item is active (ie open) then listen for clicks
    if (isActive) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    }

  }, [isActive, el]);

  return [isActive, setIsActive];
}

export const useSelectorSimpleEquality = (prev: any, next: any): boolean => {
  return JSON.stringify(prev) === JSON.stringify(next);
};
