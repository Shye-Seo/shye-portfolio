import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import { observeOnce } from '../lib/observe';

type RevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
};

/** 스크롤로 화면에 들어올 때 아래에서 위로 떠오르며 나타납니다. */
export function Reveal({ as: Tag = 'div', children, className = '', delay = 0, id }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observeOnce(el, () => el.classList.add('is-in'));
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal ${className}`.trim()}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as Record<string, string>) : undefined}
    >
      {children}
    </Tag>
  );
}
