import { useState, useEffect } from "react";

export default function useDebounce(value: string, delay: number) {
  //state debouncedValue
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    //setDebouncedValue after {delay} milliseconds
    const myTimeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    //unmount component
    return () => {
      clearTimeout(myTimeout);
    };
  }, [value, delay]);

  return debouncedValue;
}
