import { GITHUB, HERO } from '../content';
import { IconArrowRight, IconCheckCircle, IconGithub } from './Icons';

function withAccent(text: string, accent: string) {
  const i = text.lastIndexOf(accent);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <span className="accent mark">{accent}</span>
      {text.slice(i + accent.length)}
    </>
  );
}

export function Hero() {
  const [line1, line2] = HERO.titleLines;

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__grid-bg" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />

      <div className="container hero__inner">
        <div>
          <p className="hero__eyebrow">
            <span className="hero__eyebrow-dot" aria-hidden="true">
              ★
            </span>
            {HERO.badge}
          </p>

          <h1 className="hero__title" id="hero-title">
            <span className="hero__title-line">{line1}</span>
            <span className="hero__title-line">{withAccent(line2, HERO.titleAccent)}</span>
          </h1>

          <p className="hero__lead">{HERO.lead}</p>

          <div className="hero__actions">
            <a className="btn btn--primary" href="#work">
              프로젝트 보기
              <IconArrowRight size={16} />
            </a>
            <a className="btn btn--ghost" href={GITHUB} target="_blank" rel="noreferrer">
              <IconGithub size={16} />
              GitHub에서 코드 보기
            </a>
          </div>

          <p className="hero__note">
            <IconCheckCircle size={14} />
            {HERO.note}
          </p>
        </div>

        <aside className="hero__card" aria-label="요약 지표">
          {HERO.stats.map((s) => (
            <div className="hero__stat" key={s.label}>
              <p className="hero__stat-value">
                {s.value}
                {s.unit && <small>{s.unit}</small>}
              </p>
              <p className="hero__stat-label">{s.label}</p>
            </div>
          ))}
          <p className="hero__card-foot">
            <IconCheckCircle size={13} />
            {HERO.statsFoot}
          </p>
        </aside>
      </div>
    </section>
  );
}
