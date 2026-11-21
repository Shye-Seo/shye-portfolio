let observer: IntersectionObserver | null = null;
const pending = new WeakMap<Element, () => void>();

function ensureObserver(): IntersectionObserver {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const cb = pending.get(entry.target);
        if (cb) {
          cb();
          pending.delete(entry.target);
        }
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  return observer;
}

/** 요소가 화면에 들어오는 순간 한 번만 콜백을 실행하고 관찰을 해제합니다. */
export function observeOnce(el: Element, cb: () => void): () => void {
  if (typeof IntersectionObserver === 'undefined') {
    cb();
    return () => {};
  }
  const io = ensureObserver();
  pending.set(el, cb);
  io.observe(el);
  return () => {
    pending.delete(el);
    io.unobserve(el);
  };
}
