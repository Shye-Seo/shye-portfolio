import { useEffect, useRef, useState } from 'react';
import { observeOnce } from '../lib/observe';

/** 화면에 들어오면 0에서 목표 값까지 올라가는 카운터 */
export function useCountUp(target: number, decimals = 0, duration = 1300) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setValue(target);
      return;
    }
    return observeOnce(el, () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(target * eased);
        if (p < 1) requestAnimationFrame(tick);
        else setValue(target);
      };
      requestAnimationFrame(tick);
    });
  }, [target, duration]);

  const text =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString('ko-KR');

  return { ref, text };
}
