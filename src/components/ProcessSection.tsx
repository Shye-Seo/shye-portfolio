import { PROCESS } from '../content';
import { Reveal } from './Reveal';

export function ProcessSection() {
  return (
    <section className="section section--plain" id="process" aria-labelledby="process-title">
      <div className="container">
        <Reveal className="section__head">
          <div>
            <p className="kicker">일하는 방식</p>
            <h2 className="h2" id="process-title">
              기획 · 설계 · 구현 · 운영을
              <br />
              <span className="accent">한 사람이 이어서</span> 합니다
            </h2>
          </div>
          <p className="h2__sub" style={{ maxWidth: '30ch', marginTop: 0 }}>
            커머스 SaaS에서 앱 하나를 설치부터 해제까지 혼자 맡았던 방식 그대로입니다.
          </p>
        </Reveal>

        <div className="process">
          {PROCESS.map((step, i) => (
            <Reveal className="process__item" key={step.step} delay={i * 90}>
              <span className="process__num">{step.step}</span>
              <h3 className="process__title">{step.title}</h3>
              <p className="process__body">{step.body}</p>
              <div className="process__tags">
                {step.tags.map((t) => (
                  <span className="chip" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
