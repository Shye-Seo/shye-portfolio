import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

type SectionHeadProps = {
  no: string;
  label: string;
  title: ReactNode;
  desc: ReactNode;
};

/** 섹션 머리 — 위쪽 헤어라인, 왼쪽 모노 라벨, 큰 제목, 오른쪽 설명. */
export function SectionHead({ no, label, title, desc }: SectionHeadProps) {
  return (
    <Reveal className="shead">
      <p className="shead__label">
        <span>{no}</span>
        <span className="shead__rule" aria-hidden="true" />
        <span>{label}</span>
      </p>
      <div className="shead__grid">
        <h2 className="shead__title">{title}</h2>
        <p className="shead__desc">{desc}</p>
      </div>
    </Reveal>
  );
}
