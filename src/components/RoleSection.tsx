import { useState } from 'react';
import { ROLES } from '../content';
import { IconChevron, ROLE_ICONS } from './Icons';
import { Reveal } from './Reveal';

export function RoleSection() {
  const [activeId, setActiveId] = useState(ROLES[0].id);
  const active = ROLES.find((r) => r.id === activeId) ?? ROLES[0];
  const ActiveIcon = ROLE_ICONS[active.icon as keyof typeof ROLE_ICONS];

  return (
    <section className="section section--surface" id="role" aria-labelledby="role-title">
      <div className="container">
        <Reveal className="section__head section__head--center">
          <div>
            <p className="kicker kicker--center">1분 역량 진단</p>
            <h2 className="h2" id="role-title">
              어떤 자리로 보고 계신가요?
            </h2>
            <p className="h2__sub">
              포지션을 고르면, 그 자리에서 먼저 확인하실 근거만 모아 보여드립니다.
            </p>
          </div>
        </Reveal>

        <div className="roles__body">
          <Reveal className="roles__list" delay={60}>
            {ROLES.map((role) => {
              const Icon = ROLE_ICONS[role.icon as keyof typeof ROLE_ICONS];
              return (
                <button
                  type="button"
                  key={role.id}
                  className="role"
                  aria-pressed={role.id === activeId}
                  onClick={() => setActiveId(role.id)}
                >
                  <span className="role__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="role__text">
                    <span className="role__title">{role.title}</span>
                    <span className="role__sub">{role.sub}</span>
                  </span>
                  <span className="role__chev" aria-hidden="true">
                    <IconChevron size={13} />
                  </span>
                </button>
              );
            })}
          </Reveal>

          <Reveal className="roles__panel" delay={140}>
            <div key={active.id} className="fade-swap" aria-live="polite">
              <span className="roles__panel-tag">
                <ActiveIcon size={14} />
                {active.title}
              </span>
              <h3 className="roles__panel-title">{active.headline}</h3>
              <ul className="roles__points">
                {active.points.map((p) => (
                  <li className="roles__point" key={p}>
                    <span aria-hidden="true">+</span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="roles__projects">
                <span className="chip chip--accent">관련 프로젝트</span>
                {active.projects.map((p) => (
                  <span className="chip" key={p}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
