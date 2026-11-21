const STEPS: [string, string][] = [
  ['마이크 입력', 'AVAudioEngine · 프레임 단위 버퍼'],
  ['1단계 에너지 게이트', '1/4 서브샘플 RMS만 계산'],
  ['2단계 스펙트럴 분석', '자기상관 F0 · 스펙트럴 플럭스'],
  ['히스테리시스 판정', '적응형 베이스라인 · 상태머신'],
  ['프리롤 저장', 'file protection · 앱 잠금'],
  ['전사 · 쟁점 요약', '온디바이스 STT · 45초 분할 · 격양 타임라인'],
];

export function VoiceDiagram() {
  return (
    <div className="vd" role="img" aria-label="보이스가드 2단계 VAD와 온디바이스 전사 처리 흐름 도식">
      <div className="vd__head">
        <span>VoiceGuardCore / 2-Stage VAD</span>
        <span className="vd__chip">ON-DEVICE</span>
      </div>

      <ol className="vd__flow">
        {STEPS.map(([title, sub], i) => (
          <li className="vd__step" key={title}>
            <span className="vd__no">{String(i + 1).padStart(2, '0')}</span>
            <span className="vd__label">
              {title}
              <em>{sub}</em>
            </span>
          </li>
        ))}
      </ol>

      <div className="vd__meters">
        <div>
          <b>5.1%</b>
          <span>2단계 분석 비율 (야간 1시간)</span>
        </div>
        <div>
          <b>93.3%</b>
          <span>배터리 절약 추정</span>
        </div>
      </div>
    </div>
  );
}
