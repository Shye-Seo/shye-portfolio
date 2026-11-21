import { useEffect, useRef, useState } from 'react';
import { CONTACT, CONTACT_EMAIL, FOLIO } from '../content';
import { Accent } from './Accent';
import { IconArrowUpRight, IconCheck, IconCheckCircle } from './Icons';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
    } catch {
      const field = document.createElement('textarea');
      field.value = CONTACT_EMAIL;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      try {
        document.execCommand('copy');
      } catch {
        /* 클립보드를 쓸 수 없는 환경에서는 주소를 그대로 보여 줍니다. */
      }
      document.body.removeChild(field);
    }
    setCopied(true);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <p className="contact__label">
          <span>{CONTACT.no}</span>
          <span className="shead__rule" aria-hidden="true" />
          <span>{CONTACT.label}</span>
        </p>

        <div className="contact__intro">
          <h2 className="contact__title" id="contact-title">
            {CONTACT.title[0]}
            <br />
            <Accent text={CONTACT.title[1]} accent={CONTACT.accent} />
          </h2>
          <p className="contact__body">{CONTACT.body}</p>
        </div>

        <div className="mailrow">
          <a className="mailrow__address" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          <div className="mailrow__actions">
            <button type="button" className="btn btn--solid" onClick={copyAddress}>
              {copied ? <IconCheck size={14} /> : null}
              {copied ? CONTACT.copiedLabel : CONTACT.copyLabel}
            </button>
            <a className="btn btn--line" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT.mailLabel}
              <IconArrowUpRight size={13} />
            </a>
          </div>
          <span className="sr-only" role="status">
            {copied ? '메일 주소를 복사했습니다.' : ''}
          </span>
        </div>

        <div className="contact__foot">
          <p className="contact__status">
            <IconCheckCircle size={13} />
            인터뷰·협업 제안 환영 · 부산
          </p>
          <nav className="contact__links" aria-label="바로가기">
            {CONTACT.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                {...(link.href.startsWith('#') ? {} : { target: '_blank', rel: 'noreferrer' })}
              >
                {link.label}
                <IconArrowUpRight size={12} />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__row">
        <p>
          © 2026 {FOLIO.name} · {FOLIO.place}
        </p>
        <p>Vite · React · TypeScript · 직접 작성한 CSS</p>
        <a href="#top">맨 위로 ↑</a>
      </div>
    </footer>
  );
}
