import { CAREER } from '../content';
import { Accent } from './Accent';
import { SectionHead } from './SectionHead';
import { Reveal } from './Reveal';

/**
 * 경력 — 전 직장(채티스)에서 실제 고객사 쇼핑몰에 붙어 있던 기능 네 건과
 * 함께 맡았던 업무를 정리합니다. 케이스 아코디언과 겹치지 않도록
 * 접히지 않는 목록으로 두고, 왼쪽에 회사 정보를 고정해 둡니다.
 */
export function Career() {
  const employer = CAREER.employer;

  return (
    <section className="career" id="career" aria-labelledby="career-title">
      <div className="container">
        <SectionHead
          no={CAREER.no}
          label={CAREER.label}
          title={
            <span id="career-title">
              {CAREER.title[0]}
              <br />
              <Accent text={CAREER.title[1]} accent={CAREER.accent} />
            </span>
          }
          desc={CAREER.desc}
        />

        <div className="career__grid">
          <Reveal as="aside" className="employer">
            <p className="bcell__label">{employer.label}</p>
            <h3 className="employer__name">{employer.name}</h3>
            <p className="employer__alias">{employer.alias}</p>

            <dl className="employer__facts">
              <div className="employer__fact">
                <dt>역할</dt>
                <dd>{employer.role}</dd>
              </div>
              <div className="employer__fact">
                <dt>기간</dt>
                <dd>{employer.period}</dd>
              </div>
            </dl>

            <p className="employer__summary">{employer.summary}</p>

            <ul className="employer__stack" aria-label="사용한 기술">
              {employer.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p className="employer__note">{employer.periodNote}</p>
          </Reveal>

          <div className="career__list">
            {CAREER.items.map((item, i) => (
              <Reveal
                as="article"
                className="ct"
                id={`career-${item.id}`}
                key={item.id}
                delay={i * 40}
              >
                <header className="ct__head">
                  <span className="ct__no" aria-hidden="true">
                    {item.no}
                  </span>
                  <h3 className="ct__name">{item.name}</h3>
                  <span className="ct__kicker">{item.kicker}</span>
                </header>
                <p className="ct__role">{item.role}</p>
                <p className="ct__body">{item.body}</p>
                <ul className="ct__points">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="also">
          <p className="bcell__label">{CAREER.also.label}</p>
          <h3 className="also__title">{CAREER.also.title}</h3>
          <ul className="also__list">
            {CAREER.also.items.map((item) => (
              <li className="also__item" key={item}>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
