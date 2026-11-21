import { useState } from 'react';
import { FAQ, GITHUB } from '../content';
import { IconChevronDown } from './Icons';
import { Reveal } from './Reveal';

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section section--plain" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <Reveal className="section__head section__head--center">
          <div>
            <p className="kicker kicker--center">자주 받는 질문</p>
            <h2 className="h2" id="faq-title">
              면접에서 먼저 나올 질문부터
            </h2>
            <p className="h2__sub">답을 미리 적어 두었습니다. 더 궁금한 점은 저장소 이슈로 남겨 주세요.</p>
          </div>
        </Reveal>

        <div className="faq">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal className={`faq__item ${isOpen ? 'is-open' : ''}`} key={item.q} delay={i * 40}>
                <h3>
                  <button
                    type="button"
                    className="faq__q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {item.q}
                    <span className="faq__icon" aria-hidden="true">
                      <IconChevronDown size={13} />
                    </span>
                  </button>
                </h3>
                <div className="faq__a" id={`faq-panel-${i}`} aria-hidden={!isOpen}>
                  <div className="faq__a-inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="faq__foot" delay={100}>
          <a className="link-arrow" href={`${GITHUB}?tab=repositories`} target="_blank" rel="noreferrer">
            GitHub에서 코드로 확인하기 →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
