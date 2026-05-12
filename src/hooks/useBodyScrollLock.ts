import { useEffect } from 'react';

/**
 * Locks page scroll while `active` is true. The app shell uses
 * `body { overflow: hidden }` with the real scroller mounted as
 * `<main id="main-content">`, so locking `body.overflow` alone has
 * no effect. This hook locks both: the `<main>` scroller AND `body`
 * (the fallback for any route that doesn't use the app shell).
 * Restores prior overflow on unmount.
 */
export function useBodyScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    const main = document.getElementById('main-content');
    const prevBody = document.body.style.overflow;
    const prevMain = main?.style.overflow ?? '';
    document.body.style.overflow = 'hidden';
    if (main) main.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevBody;
      if (main) main.style.overflow = prevMain;
    };
  }, [active]);
}
