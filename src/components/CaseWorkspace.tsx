import { useState, type KeyboardEvent } from 'react';
import { PROJECTS, WORK, type Project } from '../content';
import { Accent } from './Accent';
import { SectionHead } from './SectionHead';
import { Reveal } from './Reveal';
import { VoiceDiagram } from './VoiceDiagram';
import { IconArrowUpRight, IconChevronDown, IconGithub } from './Icons';

const TABS = [
  { id: 'overview', label: '개요' },
  { id: 'structure', label: '구조' },
  { id: 'trouble', label: '문제 해결' },
] as const;

type TabId = (typeof TABS)[number]['id'];

function CaseRow({
  project,
  open,
  onToggle,
}: {
  project: Project;
  open: boolean;
  onToggle: () => void;
}) {
  const [tab, setTab] = useState<TabId>('overview');

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (e.key === 'ArrowRight') next = (index + 1) % TABS.length;
    else if (e.key === 'ArrowLeft') next = (index - 1 + TABS.length) % TABS.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = TABS.length - 1;
    else return;
    e.preventDefault();
    setTab(TABS[next].id);
    const buttons = e.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    buttons?.[next]?.focus();
  };

  return (
    <article className={`case ${open ? 'is-open' : ''}`} id={`case-${project.id}`}>
      <h3 className="case__head">
        <button
          type="button"
          className="case__btn"
          id={`case-btn-${project.id}`}
          aria-expanded={open}
          aria-controls={`case-panel-${project.id}`}
          onClick={onToggle}
        >
          <span className="case__no">{project.no}</span>
          <span className="case__name">{project.name}</span>
          <span className="case__kicker">{project.kicker}</span>
          <span className="case__tests">{project.testCount} tests</span>
          <span className="case__toggle" aria-hidden="true">
            <IconChevronDown size={16} />
          </span>
        </button>
      </h3>

      <div
        className="casepanel"
        id={`case-panel-${project.id}`}
        role="region"
        aria-labelledby={`case-btn-${project.id}`}
        hidden={!open}
      >
        <div className="casepanel__grid">
          <div className="casepanel__copy">
            <p className="casepanel__meta">
              case {project.no} — {project.roles.join(' / ')}
            </p>
            <h4 className="casepanel__title">
              {project.title[0]}
              <br />
              <Accent text={project.title[1]} accent={project.accent} />
            </h4>
            <p className="casepanel__summary">{project.summary}</p>

            <div className="tabs" role="tablist" aria-label={`${project.name} 상세`}>
              {TABS.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  id={`tab-${project.id}-${t.id}`}
                  aria-selected={tab === t.id}
                  aria-controls={`tabpanel-${project.id}`}
                  tabIndex={tab === t.id ? 0 : -1}
                  className="tab"
                  onClick={() => setTab(t.id)}
                  onKeyDown={(e) => onTabKey(e, i)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div
              className="tabpanel"
              role="tabpanel"
              id={`tabpanel-${project.id}`}
              aria-labelledby={`tab-${project.id}-${tab}`}
            >
              {tab === 'overview' && (
                <div className="tabpanel__inner">
                  <ol className="points">
                    {project.points.map((point, i) => (
                      <li className="points__item" key={point}>
                        <span className="points__no" aria-hidden="true">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <p>{point}</p>
                      </li>
                    ))}
                  </ol>
                  <p className="scopenote">
                    <b>검증 범위</b>
                    {project.scope}
                  </p>
                </div>
              )}

              {tab === 'structure' && (
                <div className="tabpanel__inner">
                  <ol className="arch">
                    {project.architecture.map((step, i) => (
                      <li className="arch__step" key={step.title}>
                        <span className="arch__no" aria-hidden="true">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="arch__title">{step.title}</span>
                        <span className="arch__body">{step.body}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {tab === 'trouble' && (
                <div className="tabpanel__inner">
                  <ul className="troubles">
                    {project.troubles.map((t) => (
                      <li className="trouble" key={t.problem}>
                        <p className="trouble__q">
                          <span>문제</span>
                          {t.problem}
                        </p>
                        <p className="trouble__a">
                          <span>조치</span>
                          {t.fix}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <aside className="casepanel__aside">
            <figure className="plate">
              {project.shot ? (
                <img
                  src={project.shot}
                  alt={project.shotAlt}
                  loading="eager"
                  width={1440}
                  height={900}
                />
              ) : (
                <VoiceDiagram />
              )}
              <figcaption>
                <span>도판 {project.no}</span>
                <span>{project.plate}</span>
              </figcaption>
            </figure>

            <dl className="spec">
              <div className="spec__row">
                <dt>stack</dt>
                <dd>{project.stack.join(' · ')}</dd>
              </div>
              <div className="spec__row">
                <dt>tests</dt>
                <dd>{project.tests}</dd>
              </div>
            </dl>

            <div className="casepanel__actions">
              {project.demo && (
                <a className="btn btn--solid" href={project.demo} target="_blank" rel="noreferrer">
                  라이브 데모
                  <IconArrowUpRight size={13} />
                </a>
              )}
              <a className="btn btn--line" href={project.code} target="_blank" rel="noreferrer">
                <IconGithub size={14} />
                코드 보기
              </a>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

export function CaseWorkspace({
  activeId,
  onChange,
}: {
  activeId: string | null;
  onChange: (id: string | null) => void;
}) {
  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <div className="container">
        <SectionHead
          no={WORK.no}
          label={WORK.label}
          title={
            <span id="work-title">
              {WORK.title[0]}
              <br />
              <Accent text={WORK.title[1]} accent={WORK.accent} />
            </span>
          }
          desc={WORK.desc}
        />

        <Reveal className="cases">
          {PROJECTS.map((project) => (
            <CaseRow
              key={project.id}
              project={project}
              open={activeId === project.id}
              onToggle={() => onChange(activeId === project.id ? null : project.id)}
            />
          ))}
        </Reveal>

        <p className="work__foot">{WORK.foot}</p>
      </div>
    </section>
  );
}
