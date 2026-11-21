import { PROJECTS, type Project } from '../content';
import { IconArrowRight, IconArrowUpRight, IconCheck, IconGithub } from './Icons';
import { Reveal } from './Reveal';
import { VoiceDiagram } from './VoiceDiagram';

function titleWithAccent(lines: string[], accent: string) {
  return lines.map((line, idx) => {
    const i = line.lastIndexOf(accent);
    if (i < 0)
      return (
        <span className="work__line" key={idx}>
          {line}
        </span>
      );
    return (
      <span className="work__line" key={idx}>
        {line.slice(0, i)}
        <span className="accent">{accent}</span>
        {line.slice(i + accent.length)}
      </span>
    );
  });
}

function BrowserFrame({ project }: { project: Project }) {
  return (
    <div className="browser">
      <div className="browser__bar">
        <span className="browser__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="browser__url">{project.shotLabel}</span>
      </div>
      <img src={project.shot} alt={project.shotAlt} loading="lazy" width={1440} height={900} />
    </div>
  );
}

export function WorkSection() {
  return (
    <section className="section section--surface" id="work" aria-labelledby="work-title">
      <div className="container">
        <Reveal className="section__head">
          <div>
            <p className="kicker">프로젝트</p>
            <h2 className="h2" id="work-title">
              설치하면 어떻게 바뀌는지가 아니라,
              <br />
              <span className="accent">어떻게 만들었는지</span>를 봐 주세요
            </h2>
            <p className="h2__sub">
              네 개 모두 공개 저장소이고, 세 개는 브라우저에서 바로 눌러볼 수 있는 라이브 데모입니다.
            </p>
          </div>
        </Reveal>

        <div className="work__list">
          {PROJECTS.map((project, i) => (
            <Reveal
              as="article"
              className={`work__row ${i % 2 === 1 ? 'work__row--flip' : ''}`}
              key={project.id}
              aria-labelledby={`work-${project.id}`}
            >
              <div className="work__body">
                <p className="work__tag">
                  <span className="work__no">{project.no}</span>
                  {project.kicker}
                </p>
                <h3 className="work__title" id={`work-${project.id}`}>
                  {titleWithAccent(project.title, project.titleAccent)}
                </h3>
                <p className="work__name">{project.name}</p>
                <p className="work__summary">{project.summary}</p>

                <ul className="work__points">
                  {project.points.map((p) => (
                    <li className="work__point" key={p}>
                      <IconCheck size={13} />
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="work__stack">
                  {project.stack.map((s) => (
                    <span className="chip" key={s}>
                      {s}
                    </span>
                  ))}
                </div>

                <div className="work__actions">
                  {project.demo && (
                    <a className="btn btn--primary btn--sm" href={project.demo} target="_blank" rel="noreferrer">
                      라이브 데모
                      <IconArrowUpRight size={14} />
                    </a>
                  )}
                  <a className="btn btn--ghost btn--sm" href={project.code} target="_blank" rel="noreferrer">
                    <IconGithub size={15} />
                    코드 보기
                  </a>
                  <span className="work__tests">
                    <span className="work__tests-dot" aria-hidden="true" />
                    {project.tests}
                  </span>
                </div>

                <p className="work__scope">
                  <b>검증 범위</b> — {project.scope}
                </p>
              </div>

              <div className="work__media">
                {project.shot ? <BrowserFrame project={project} /> : <VoiceDiagram />}
                <span className={`work__badge ${i % 2 === 1 ? 'work__badge--left' : ''}`}>
                  <span aria-hidden="true">{project.demo ? '●' : '◇'}</span>
                  {project.demo ? '라이브 데모 운영 중' : '저장소 공개'}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="work__more" delay={80}>
          <p>README와 코드를 직접 보시는 게 가장 빠릅니다.</p>
          <a className="link-arrow" href="https://github.com/Shye-Seo?tab=repositories" target="_blank" rel="noreferrer">
            저장소 전체 보기
            <IconArrowRight size={15} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
