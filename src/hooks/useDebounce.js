// Lightweight debounce hook.
// Responsibilities:
// - Delay fast-changing values
// - Useful for search and filter inputs
// - Keep hook reusable across components

import { useEffect, useState } from 'react';

export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
