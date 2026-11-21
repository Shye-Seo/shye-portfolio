import { CONTACT, CONTACT_EMAIL, GITHUB } from '../content';
import { IconArrowUpRight, IconGithub } from './Icons';
import { Reveal } from './Reveal';

export function ContactSection() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <Reveal className="contact__card">
          <div className="contact__inner">
            <p className="kicker contact__kicker">{CONTACT.kicker}</p>
            <h2 className="contact__title" id="contact-title">
              {CONTACT.title[0]}
              <br />
              <span className="accent">{CONTACT.titleAccent}</span>
            </h2>
            <p className="contact__body">{CONTACT.body}</p>
            <div className="contact__links">
              {CONTACT.links.map((l) => (
                <a className="contact__link" key={l.label} href={l.href} target="_blank" rel="noreferrer">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div className="contact__actions">
            <a className="btn btn--yellow" href={GITHUB} target="_blank" rel="noreferrer">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <IconGithub size={17} />
                GitHub 둘러보기
              </span>
              <IconArrowUpRight size={15} />
            </a>
            {CONTACT_EMAIL && (
              <a className="btn btn--outline-light" href={`mailto:${CONTACT_EMAIL}`}>
                <span>{CONTACT_EMAIL}</span>
                <IconArrowUpRight size={15} />
              </a>
            )}
            <a className="btn btn--outline-light" href="#work">
              <span>프로젝트 다시 보기</span>
              <IconArrowUpRight size={15} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p className="brand footer__brand">
            shye<span className="brand__dot">.</span>
          </p>
          <p className="footer__meta">
            <b>서승혜</b> · 풀사이클 웹 개발자 · 부산
            <br />
            커머스 SaaS 실무 4년 · 공개 프로젝트 4종
          </p>
        </div>

        <nav className="footer__links" aria-label="바로가기">
          <a href={GITHUB} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://shye-seo.github.io/quoguri-blog/" target="_blank" rel="noreferrer">
            블로그
          </a>
          <a href="#work">프로젝트</a>
          <a href="#faq">FAQ</a>
          <a href="#top">맨 위로</a>
        </nav>
      </div>

      <div className="container footer__bottom">
        <span>© 2026 서승혜. All rights reserved.</span>
        <span>디자인 레퍼런스 — chatis.kr</span>
      </div>
    </footer>
  );
}
