import { RefObject, useEffect } from 'react';

const useOnClickOutside = (ref: RefObject<HTMLElement>, callback: (e: Event) => void) => {
  useEffect(() => {
    const listener = (e: Event) => {
      if (!ref.current || ref.current?.contains(e.target as Node)) {
        return;
      }
      callback(e);
    }
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
}

export default useOnClickOutside;