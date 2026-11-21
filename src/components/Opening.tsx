import { CONTACT_EMAIL, FOLIO, GITHUB, INDEX, OPENING } from '../content';
import { Accent } from './Accent';
import { IconArrowRight, IconArrowUpRight, IconGithub } from './Icons';

type OpeningProps = {
  onSelect: (id: string) => void;
};

export function Opening({ onSelect }: OpeningProps) {
  const [line1, line2] = OPENING.titleLines;

  return (
    <>
      <header className="folio" id="top">
        <div className="container folio__row">
          <a className="folio__name" href="#top" aria-label="서승혜 포트폴리오 — 맨 위로">
            {FOLIO.name}
            <span aria-hidden="true">/</span>
            <span className="folio__latin">{FOLIO.latin}</span>
          </a>
          <span className="folio__role">{FOLIO.role}</span>
          <span className="folio__place">{FOLIO.place}</span>
          <span className="folio__year">{FOLIO.year}</span>
        </div>
      </header>

      <section className="opening" aria-labelledby="opening-title">
        <div className="container opening__grid">
          <div className="opening__margin" aria-hidden="true">
            <span className="opening__vtext">portfolio — shye seo</span>
            <span className="opening__vrule" />
            <span className="opening__cross">+</span>
          </div>

          <div className="opening__main">
            <p className="opening__kicker">{OPENING.kicker}</p>
            <h1 className="opening__title" id="opening-title">
              <span className="opening__line">{line1}</span>
              <span className="opening__line">
                <Accent text={line2} accent={OPENING.accent} />
              </span>
            </h1>
          </div>

          <aside className="opening__aside">
            <p className="opening__lead">{OPENING.lead}</p>

            <nav className="index" aria-label="프로젝트 색인">
              <div className="index__head">
                <span>{INDEX.label}</span>
                <span>{INDEX.count}</span>
              </div>
              <ol className="index__list">
                {INDEX.items.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#case-${item.id}`}
                      onClick={() => onSelect(item.id)}
                      className="index__item"
                    >
                      <span className="index__no">{item.no}</span>
                      <span className="index__name">{item.name}</span>
                      <span className="index__meta">{item.meta}</span>
                      <IconArrowUpRight size={13} />
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <p className="opening__note">{OPENING.note}</p>
          </aside>
        </div>

        <div className="container opening__foot">
          <ul className="facts">
            {OPENING.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>

          <div className="opening__actions">
            <a className="opening__scroll" href="#work">
              프로젝트 펼쳐보기
              <IconArrowRight size={14} />
            </a>
            <a className="opening__github" href={GITHUB} target="_blank" rel="noreferrer">
              <IconGithub size={14} />
              GitHub
            </a>
            <a className="opening__mail" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
              <IconArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
