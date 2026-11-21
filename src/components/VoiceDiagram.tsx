export function VoiceDiagram() {
  const steps = [
    ['마이크 입력', 'AVAudioEngine · 프레임 단위 버퍼'],
    ['1단계 에너지 게이트', '1/4 서브샘플 RMS만 계산'],
    ['2단계 스펙트럴 분석', '자기상관 F0 · 스펙트럴 플럭스'],
    ['히스테리시스 판정', '적응형 베이스라인 · 상태머신'],
    ['프리롤 저장', 'file protection · 앱 잠금'],
  ];

  return (
    <div className="diagram" role="img" aria-label="보이스가드 2단계 VAD 처리 흐름 도식">
      <div className="diagram__head">
        <p className="diagram__title">VoiceGuardCore · 2-Stage VAD</p>
        <span className="diagram__chip">ON-DEVICE</span>
      </div>

      <div className="diagram__flow">
        {steps.map(([title, sub], i) => (
          <div className="diagram__step" key={title}>
            <span className="diagram__step-idx">{i + 1}</span>
            <span className="diagram__step-text">
              <span className="diagram__step-title">{title}</span>
              <span className="diagram__step-sub">{sub}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="diagram__meters">
        <div className="diagram__meter">
          <p className="diagram__meter-value">5.1%</p>
          <p className="diagram__meter-label">2단계 분석 비율 (야간 1시간)</p>
        </div>
        <div className="diagram__meter">
          <p className="diagram__meter-value">93.3%</p>
          <p className="diagram__meter-label">배터리 절약 추정</p>
        </div>
      </div>

      <p className="diagram__note">화면 목업이 아닌 파이프라인 도식입니다 · Xcode 실기기 빌드 미검증</p>
    </div>
  );
}
