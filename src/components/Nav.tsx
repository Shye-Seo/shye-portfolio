import { useEffect, useState } from 'react';
import { CONTACT_EMAIL, FOLIO, GITHUB, NAV } from '../content';
import { IconGithub, IconMail } from './Icons';

/**
 * 페이지 위쪽 색인 바. 첫 화면(마스트헤드)에서는 숨고,
 * 스크롤이 시작되면 얇은 띠로 내려와 현재 위치와 진행률을 보여 줍니다.
 */
export function Nav() {
  const [shown, setShown] = useState(false);
  const [active, setActive] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setShown(y > 240);

      const line = y + 140;
      let current = '';
      for (const item of NAV) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= line) current = item.id;
      }
      // 짧은 마지막 섹션은 바닥에서도 기준선 위로 올라오지 않는다.
      // 문서 끝까지 내려갔으면 읽고 있는 곳은 마지막 섹션이다.
      const atBottom = y + window.innerHeight >= document.documentElement.scrollHeight - 4;
      setActive(atBottom ? NAV[NAV.length - 1].id : current);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
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

  return (
    <header className={`indexbar ${shown ? 'is-shown' : ''}`}>
      <div className="container indexbar__inner">
        <a className="indexbar__brand" href="#top" aria-label="서승혜 포트폴리오 — 맨 위로">
          {FOLIO.name}
          <span className="indexbar__slash" aria-hidden="true">
            /
          </span>
          <span className="indexbar__latin">{FOLIO.latin}</span>
        </a>

        <nav className="indexbar__nav" aria-label="섹션 색인">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={active === item.id ? 'is-active' : undefined}
              aria-current={active === item.id ? 'true' : undefined}
            >
              <span aria-hidden="true">{item.no}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="indexbar__actions">
          <a
            className="indexbar__mail"
            href={`mailto:${CONTACT_EMAIL}`}
            aria-label={`메일 보내기 — ${CONTACT_EMAIL}`}
          >
            <IconMail size={14} />
            <span>{CONTACT_EMAIL}</span>
          </a>
          <a
            className="indexbar__icon"
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub에서 코드 보기"
          >
            <IconGithub size={16} />
          </a>
        </div>
      </div>
      <span className="indexbar__progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
    </header>
  );
}
