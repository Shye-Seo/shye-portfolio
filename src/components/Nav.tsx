import { useEffect, useState } from 'react';
import { GITHUB, NAV } from '../content';
import { IconGithub } from './Icons';

export function Nav() {
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState<string>('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setStuck(window.scrollY > 12);

      const line = window.scrollY + window.innerHeight * 0.34;
      let current = '';
      for (const item of NAV) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= line) current = item.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={`nav ${stuck || open ? 'is-stuck' : ''}`}>
      <div className="container nav__inner">
        <a className="brand" href="#top" aria-label="서승혜 포트폴리오 — 맨 위로">
          shye<span className="brand__dot">.</span>
        </a>

        <nav className="nav__links" aria-label="주요 섹션">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav__link ${active === item.id ? 'is-active' : ''}`}
              aria-current={active === item.id ? 'true' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a className="btn btn--yellow btn--sm nav__cta" href={GITHUB} target="_blank" rel="noreferrer">
          <IconGithub size={15} />
          GitHub
        </a>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
        </button>
      </div>

      {open && (
        <div className="nav__sheet" id="mobile-menu">
          {NAV.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)}>
              {item.label}
              <span aria-hidden="true">→</span>
            </a>
          ))}
          <a className="btn btn--yellow" href={GITHUB} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
            <IconGithub size={16} />
            GitHub에서 코드 보기
          </a>
        </div>
      )}
    </header>
  );
}
