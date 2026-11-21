import { APPROACH } from '../content';
import { Accent } from './Accent';
import { SectionHead } from './SectionHead';
import { Reveal } from './Reveal';
import { IconArrowUpRight } from './Icons';
import { useCountUp } from '../lib/useCountUp';

type MetricItem = (typeof APPROACH.metrics)[number];

function MetricCell({ item, cellClass }: { item: MetricItem; cellClass: string }) {
  const isStatic = 'static' in item && item.static;
  const { ref, text } = useCountUp(item.value, item.decimals);

  return (
    <article className={`bcell metric ${cellClass}`}>
      <p className="bcell__label">{item.label}</p>
      <p className="metric__num">
        {isStatic ? <span>0</span> : <span ref={ref}>{text}</span>}
        <small>{item.unit}</small>
      </p>
      <p className="metric__title">{item.title}</p>
      <p className="metric__note">{item.note}</p>
    </article>
  );
}

export function Bento() {
  const tests = APPROACH.tests;
  const { ref, text } = useCountUp(tests.value);
  const max = Math.max(...tests.rows.map((r) => r.count));

  return (
    <section className="approach" id="approach" aria-labelledby="approach-title">
      <div className="container">
        <SectionHead
          no={APPROACH.no}
          label={APPROACH.label}
          title={
            <span id="approach-title">
              {APPROACH.title[0]}
              <br />
              <Accent text={APPROACH.title[1]} accent={APPROACH.accent} />
            </span>
          }
          desc={APPROACH.desc}
        />

        <div className="bento">
          <Reveal as="article" className="bcell bcell--loop">
            <p className="bcell__label bcell__label--tint">Method / full cycle</p>
            <h3 className="loop__title">{APPROACH.loop.title}</h3>
            <p className="loop__body">{APPROACH.loop.body}</p>

            <div className="loop">
              <p className="sr-only">
                기획에서 설계, 구현, 운영으로 이어지고 다시 기획으로 돌아오는 순환 구조입니다.
              </p>
              <div className="loop__step loop__step--plan">
                <span>01</span>
                <b>기획</b>
                <em>{APPROACH.loop.steps[0].body}</em>
              </div>
              <div className="loop__step loop__step--design">
                <span>02</span>
                <b>설계</b>
                <em>{APPROACH.loop.steps[1].body}</em>
              </div>
              <div className="loop__step loop__step--build">
                <span>03</span>
                <b>구현</b>
                <em>{APPROACH.loop.steps[2].body}</em>
              </div>
              <div className="loop__step loop__step--run">
                <span>04</span>
                <b>운영</b>
                <em>{APPROACH.loop.steps[3].body}</em>
              </div>

              <span className="loop__arrow loop__arrow--top" aria-hidden="true" />
              <span className="loop__arrow loop__arrow--right" aria-hidden="true" />
              <span className="loop__arrow loop__arrow--bottom" aria-hidden="true" />
              <span className="loop__arrow loop__arrow--left" aria-hidden="true" />

              <div className="loop__core" aria-hidden="true">
                <b>
                  FULL
                  <br />
                  CYCLE
                </b>
                <span aria-hidden="true">↻</span>
              </div>
            </div>

            <p className="loop__foot">
              운영에서 나온 로그가 다시 다음 기획의 근거가 됩니다. 그래서 네 단계를 따로 맡기보다 한 사람이
              이어서 보는 편이 빨랐습니다.
            </p>
          </Reveal>

          <Reveal as="article" className="bcell bcell--tests" delay={60}>
            <p className="bcell__label">{tests.label}</p>
            <p className="metric__num">
              <span ref={ref}>{text}</span>
              <small>{tests.unit}</small>
            </p>
            <p className="metric__title">{tests.title}</p>
            <ul className="breakdown">
              {tests.rows.map((row) => (
                <li className="breakdown__row" key={row.name}>
                  <span className="breakdown__name">{row.name}</span>
                  <span className="breakdown__count">{row.count}</span>
                  <span className="breakdown__bar" aria-hidden="true">
                    <i style={{ width: `${Math.round((row.count / max) * 100)}%` }} />
                  </span>
                </li>
              ))}
            </ul>
            <p className="metric__note">{tests.note}</p>
          </Reveal>

          {APPROACH.metrics.map((item, i) => (
            <MetricCell
              key={item.title}
              item={item}
              cellClass={['bcell--ms', 'bcell--zero', 'bcell--vad'][i] ?? ''}
            />
          ))}

          <Reveal as="article" className="bcell bcell--stack" delay={40}>
            <p className="bcell__label">Toolbox / stack</p>
            <h3 className="bcell__title">실무에서 쓰던 도구를 그대로 이어서 씁니다</h3>
            <div className="stackgrid">
              {APPROACH.stack.map((group) => (
                <div className="stackgrid__group" key={group.group}>
                  <h4>{group.group}</h4>
                  <p>{group.items.join(' · ')}</p>
                </div>
              ))}
            </div>
            <p className="stack__principle">
              도구를 고를 때 먼저 보는 것은 세 가지입니다 — 브라우저에서 끝낼 수 있는 계산인지, 돈이 걸린
              값인지, 자격 증명 없이 어디까지 검증할 수 있는지.
            </p>
            <p className="stack__note">
              어떤 도구를 왜 골랐는지는 각 저장소 문서에 적어 두었습니다. 새로 배운 것과 4년간 손에 익은 것을
              구분해 적었습니다.
            </p>
          </Reveal>

          <Reveal as="article" className="bcell bcell--side" delay={80}>
            <figure className="side__shot">
              <img
                src={APPROACH.side.shot}
                alt={APPROACH.side.shotAlt}
                loading="lazy"
                width={1440}
                height={900}
              />
            </figure>
            <div className="side__copy">
              <p className="bcell__label">{APPROACH.side.label}</p>
              <h3 className="side__name">{APPROACH.side.name}</h3>
              <p className="side__desc">{APPROACH.side.body}</p>
              <p className="side__meta">{APPROACH.side.meta.join(' · ')}</p>
              <div className="side__links">
                <a href={APPROACH.side.demo} target="_blank" rel="noreferrer">
                  블로그 보기
                  <IconArrowUpRight size={12} />
                </a>
                <a href={APPROACH.side.code} target="_blank" rel="noreferrer">
                  코드 보기
                  <IconArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal as="article" className="bcell bcell--boundary">
            <p className="bcell__label bcell__label--warn">{APPROACH.boundary.label}</p>
            <div className="boundary">
              <h3 className="boundary__title">{APPROACH.boundary.title}</h3>
              <ul className="boundary__list">
                {APPROACH.boundary.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="boundary__note">{APPROACH.boundary.note}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
