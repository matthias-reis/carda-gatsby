import { useEffect } from 'react';

export const useKeyboard = (handler: (ev: KeyboardEvent) => void) => {
  useEffect(() => {
    globalThis.addEventListener('keydown', handler);
    return () => {
      globalThis.removeEventListener('keydown', handler);
    };
  }, [handler]);
};
