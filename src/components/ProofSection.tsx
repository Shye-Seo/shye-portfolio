import { PROOF } from '../content';
import { IconInfo } from './Icons';
import { Reveal } from './Reveal';
import { useCountUp } from '../lib/useCountUp';

function ProofCard({ item, index }: { item: (typeof PROOF)[number]; index: number }) {
  const decimals = 'decimals' in item && item.decimals ? item.decimals : 0;
  const { ref, text } = useCountUp(item.value, decimals);

  return (
    <Reveal className="proof__card" delay={index * 70}>
      <p className="proof__value">
        <span ref={ref}>{text}</span>
        {item.suffix && (
          <span className="proof__suffix" aria-hidden="true">
            {item.suffix}
          </span>
        )}
      </p>
      <p className="proof__label">{item.label}</p>
      <p className="proof__note">{item.note}</p>
    </Reveal>
  );
}

export function ProofSection() {
  return (
    <section className="section section--plain" id="proof" aria-labelledby="proof-title">
      <div className="container">
        <Reveal className="section__head">
          <div>
            <p className="kicker">검증</p>
            <h2 className="h2" id="proof-title">
              말로 하지 않고
              <br />
              <span className="accent">숫자와 테스트</span>로 남겼습니다
            </h2>
          </div>
          <p className="h2__sub" style={{ maxWidth: '32ch', marginTop: 0 }}>
            저장소를 클론해 같은 명령으로 다시 실행할 수 있는 수치만 적었습니다.
          </p>
        </Reveal>

        <div className="proof">
          {PROOF.map((item, i) => (
            <ProofCard item={item} index={i} key={item.label} />
          ))}
        </div>

        <Reveal className="proof__foot" delay={120}>
          <IconInfo size={15} />
          <p>
            수치는 각 저장소 README에 기록된 최종 검증 결과이고, 측정·시뮬레이션 조건도 문서에 함께 적어 두었습니다.
            실서비스 연동이 아닌 부분(마켓 API 실호출, SENS 실발송, Redis 실서버, iOS 실기기 빌드)은 프로젝트별
            ‘검증 범위’에 미검증으로 표시했습니다.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
