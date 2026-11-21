import { SIDE, STACK } from '../content';
import { IconArrowUpRight, IconCheck, IconGithub } from './Icons';
import { Reveal } from './Reveal';

export function StackSection() {
  return (
    <section className="section section--surface" id="stack" aria-labelledby="stack-title">
      <div className="container">
        <Reveal className="section__head">
          <div>
            <p className="kicker">기술</p>
            <h2 className="h2" id="stack-title">
              실무에서 쓰던 도구를
              <br />
              <span className="accent">그대로</span> 이어서 씁니다
            </h2>
          </div>
          <p className="h2__sub" style={{ maxWidth: '30ch', marginTop: 0 }}>
            새로 배운 것과 4년간 손에 익은 것을 구분해 적었습니다.
          </p>
        </Reveal>

        <div className="stack">
          {STACK.map((group, i) => (
            <Reveal className="stack__group" key={group.group} delay={i * 60}>
              <div className="stack__group-head">
                <p className="stack__group-name">{group.group}</p>
                <span className="stack__group-count">{String(group.items.length).padStart(2, '0')}</span>
              </div>
              <div className="stack__items">
                {group.items.map((item) => (
                  <span className="chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="side" delay={80} as="article">
          <div>
            <p className="kicker">{SIDE.kicker}</p>
            <h3 className="side__title">
              {SIDE.title[0]}
              <br />
              <span className="accent">{SIDE.titleAccent}</span>
            </h3>
            <p className="side__body">
              <b>{SIDE.name}</b> — {SIDE.body}
            </p>
            <ul className="side__points">
              {SIDE.points.map((p) => (
                <li className="side__point" key={p}>
                  <IconCheck size={13} />
                  {p}
                </li>
              ))}
            </ul>
            <div className="side__actions">
              <a className="btn btn--primary btn--sm" href={SIDE.demo} target="_blank" rel="noreferrer">
                블로그 보기
                <IconArrowUpRight size={14} />
              </a>
              <a className="btn btn--ghost btn--sm" href={SIDE.code} target="_blank" rel="noreferrer">
                <IconGithub size={15} />
                코드 보기
              </a>
            </div>
          </div>
          <div className="side__media">
            <div className="browser">
              <div className="browser__bar">
                <span className="browser__dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="browser__url">{SIDE.shotLabel}</span>
              </div>
              <img src={SIDE.shot} alt={SIDE.shotAlt} loading="lazy" width={1440} height={900} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
