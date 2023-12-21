import * as React from 'react';
import { useMediaQuery } from 'react-responsive';

// via: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export const useInterval = (callback: () => unknown, delay: number): void => {
  const savedCallback = React.useRef<() => unknown>();

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      savedCallback?.current?.();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

// https://usehooks-ts.com/react-hook/use-timeout
export const useTimeout = (callback: () => void, delay: number | null): void => {
  const savedCallback = React.useRef(callback);

  // Remember the latest callback if it changes.
  React.useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout.
  React.useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return;
    }

    const id = setTimeout(() => savedCallback.current(), delay);

    return () => clearTimeout(id);
  }, [delay]);
};

export const useDetectOutsideClick = (
  ref: React.RefObject<HTMLElement>,
  initialState: boolean
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isActive, setIsActive] = React.useState(initialState);

  React.useEffect(() => {
    const pageClickEvent = (event: Event) => {
      // If the active element exists and is clicked outside of
      if (ref.current !== null && !ref.current.contains(event.target as Node)) {
        setIsActive(!isActive);
      }
    };

    // If the item is active (ie open) then listen for clicks
    if (isActive) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isActive, ref]);

  return [isActive, setIsActive];
};

export const useOnClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: (event: Event) => unknown
): void => {
  React.useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export const useSelectorSimpleEquality = (prev: unknown, next: unknown): boolean => {
  return JSON.stringify(prev) === JSON.stringify(next);
};

export const useHasChanged = (value: unknown): boolean => {
  const prevVal = usePrevious(value);
  return prevVal !== value;
};

export const usePrevious = (value: unknown): unknown => {
  const ref = React.useRef<unknown>();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export const useWindowSize = (): { width: number; height: number } => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = React.useState({
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
};

export const useEventListener = (
  eventName: string,
  handler: (event?: Event) => void,
  element: EventTarget = window
): void => {
  // Create a ref that stores handler
  const savedHandler = React.useRef<(event?: Event) => void>();
  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  React.useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;
      // Create event listener that calls handler function stored in ref
      const eventListener = (event: Event) => savedHandler?.current?.(event);
      // Add event listener
      element.addEventListener(eventName, eventListener);
      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
};

export const useRect = (
  ref: React.RefObject<HTMLElement>
): {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
} => {
  const [rect, setRect] = React.useState(getRect(ref ? ref.current : null));

  const handleResize = React.useCallback(() => {
    if (!ref.current) {
      return;
    }

    // Update client rect
    setRect(getRect(ref.current));
  }, [ref]);

  useEventListener('resize', handleResize);

  return rect;
};

export const getRect = (element: HTMLElement | null | undefined): DOMRect => {
  if (!element) {
    return {
      bottom: 0,
      height: 0,
      left: 0,
      right: 0,
      top: 0,
      width: 0,
    } as DOMRect;
  }

  return element.getBoundingClientRect();
};


export function useColorScheme(forceLight = false): [boolean, (value: boolean) => void] {
  const systemPrefersDark = useMediaQuery(
    {
      query: '(prefers-color-scheme: dark)',
    },
    undefined
  );

  const [isDark, setIsDark] = React.useState(systemPrefersDark && !forceLight);

  const value = React.useMemo(
    () => (isDark === undefined ? systemPrefersDark : isDark),
    [isDark, systemPrefersDark]
  );

  React.useEffect(() => {
    if (value) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [value]);

  return [
    value,
    setIsDark,
 ];
}
