/**
 * 이 페이지에 쓰이는 모든 사실 정보·문구·링크를 한 곳에 모아 둡니다.
 * 수치와 문장을 고칠 때는 이 파일만 수정하면 됩니다.
 *
 * 수치 출처: 각 저장소 README의 최종 검증 기록(2026-11-21 실전 디벨롭 반영)
 *  - commerce-seller-analytics : Vitest 481 · PHPUnit 135 · Playwright E2E 24 = 640
 *  - sns-shortform-automation  : Vitest 566 · PHPUnit 185 = 751 (커버리지 89.7%)
 *  - prop-data-hub             : 단위·통합 239 + Playwright E2E 16 = 255
 *  - voice-guard-ios           : Swift XCTest 45 · DSP 시나리오 11 = 56
 *  - 합계 = 1,702
 */

export const GITHUB = 'https://github.com/Shye-Seo';
export const BLOG = 'https://shye-seo.github.io/quoguri-blog/';

/** 컨택트 포인트 — CTA와 연락 섹션의 메일 주소 */
export const CONTACT_EMAIL = 'seounghye95@naver.com';

export const FOLIO = {
  name: '서승혜',
  latin: 'shye',
  role: '풀사이클 웹 개발자',
  place: '부산, 대한민국',
  year: '2026',
};

export const OPENING = {
  kicker: '기획 · 설계 · 구현 · 운영',
  titleLines: ['기획부터 운영까지,', '한 사람이 끝까지'],
  accent: '끝까지',
  lead:
    '커머스 SaaS 회사에서 프론트엔드, PHP 백엔드, MySQL 스키마 설계, 인스타그램·카카오 알림톡 연동까지 직접 만들고 운영했습니다. 그 방식을 4개의 공개 프로젝트로 코드와 라이브 데모에 담았습니다.',
  note: '아래 색인에서 프로젝트를 고르면 구조와 문제 해결까지 펼쳐집니다.',
  facts: ['커머스 SaaS 실무 4년', '공개 저장소 4개', '라이브 데모 3개 · 블로그 포함 4개', '자동화 테스트 1,702건'],
};

export const INDEX = {
  label: '색인',
  count: '04',
  items: [
    { id: 'seller', no: '01', name: '셀러스코프', meta: '640 tests' },
    { id: 'shortform', no: '02', name: '숏폼 엔진', meta: '751 tests' },
    { id: 'prop', no: '03', name: '부동산 데이터 허브', meta: '255 tests' },
    { id: 'voice', no: '04', name: '보이스가드', meta: '56 tests' },
  ],
};

export const WORK = {
  label: 'Selected work',
  no: '01',
  title: ['결과 화면보다', '만들어 온 과정을 봐 주세요'],
  accent: '만들어 온 과정',
  desc:
    '네 개 모두 공개 저장소이고, 세 개는 브라우저에서 바로 눌러볼 수 있는 라이브 데모입니다(블로그까지 세면 네 개). 항목을 고르면 요약·구조·문제 해결·검증 범위가 이 자리에서 펼쳐집니다.',
  foot: '수치는 각 저장소 README에 기록된 최종 검증 결과입니다. 다시 클론해 같은 명령으로 확인할 수 있습니다.',
};

export type ArchStep = { title: string; body: string };
export type Trouble = { problem: string; fix: string };

export type Project = {
  id: string;
  no: string;
  name: string;
  kicker: string;
  roles: string[];
  title: [string, string];
  accent: string;
  summary: string;
  points: string[];
  architecture: ArchStep[];
  troubles: Trouble[];
  scope: string;
  stack: string[];
  tests: string;
  testCount: string;
  demo?: string;
  code: string;
  shot: string;
  shotAlt: string;
  plate: string;
};

import sellerShot from './assets/shots/seller-scope.png';
import shortformShot from './assets/shots/shortform-engine.png';
import propShot from './assets/shots/prop-data-hub.png';
import blogShot from './assets/shots/quoguri-blog.png';

export const PROJECTS: Project[] = [
  {
    id: 'seller',
    no: '01',
    name: '셀러스코프 SellerScope',
    kicker: '이커머스 정산 · 마진 분석',
    roles: ['프론트엔드', '백엔드·DB', '데이터'],
    title: ['정산서와 판매 원장이', '어긋나는 지점을 찾습니다'],
    accent: '어긋나는 지점',
    summary:
      '“이번 달 매출은 늘었는데 통장에 들어온 돈은 왜 줄었지?” 셀러가 돈을 잃는 곳은 마진 계산이 아니라 정산서와 원장이 어긋나는 순간입니다. 마켓 정산서를 계약 조건으로 다시 계산해 수수료 초과 청구·반품비 중복 차감·설명되지 않는 부족분을 원인별 금액으로 증명합니다.',
    points: [
      '11종 이상 징후 판정 엔진 — 수수료 초과, 반품비 중복, 정산 누락을 원인별 금액으로 분해',
      'Web Worker 스트리밍 파서 — 10만 행(13MB) 정산서를 612ms에 처리하고 10만 행 테이블은 가상화 렌더링',
      '실시간 선착순 드롭 — 조건부 UPDATE·낙관적 락·멱등키 3중 방어, 최대 16워커 1,920회 경합에서 오버이슈 0건',
      '운영 콘솔 3종 — 실수령 순수익 계산기(정산금→통장 순수익·손익분기 ROAS), 정산 누락·지연 감지기(구매확정+N영업일), 품절 임박·발주량 계산기(발주서 CSV)',
      '쿠폰 원장 → 정산 대사 → 월별 재대사 → SENS 알림톡 시뮬레이터까지 한 흐름으로 연결',
    ],
    architecture: [
      { title: '수집', body: '정산서 CSV·Excel 업로드 또는 마켓 Open API 수집' },
      { title: '파싱', body: 'Web Worker 스트리밍 파서, 5,000행 단위 배치' },
      { title: '판정', body: '11종 이상 징후 엔진이 계약 조건으로 다시 계산' },
      { title: '대사', body: '원장과 정산 금액의 차액을 원인별로 분해, 월별 재대사' },
      { title: '알림', body: '알림톡 본문 미리보기, SENS 서명 검증' },
    ],
    troubles: [
      {
        problem: '10만 행(13MB) 정산서를 올리면 화면이 멈췄습니다.',
        fix: '파싱을 Web Worker로 옮기고 5,000행 단위로 흘려보냈습니다. 표는 보이는 행만 그리도록 가상화해, 같은 파일을 612ms에 처리합니다.',
      },
      {
        problem: '선착순 쿠폰이 재고보다 더 발급됐습니다.',
        fix: '조건부 UPDATE, 낙관적 락, 멱등키를 겹쳐 읽기와 쓰기 사이의 틈을 없앴습니다. 16워커 1,920회 경합에서 오버이슈 0건입니다.',
      },
    ],
    scope:
      '마켓 Open API 실호출은 자격 증명이 없어 미검증입니다. OAuth2·HMAC 서명 벡터와 샌드박스 응답까지 검증했고, 이 경계는 저장소 문서에 그대로 적어 두었습니다.',
    stack: ['Next.js 14', 'TypeScript', 'Tailwind', 'PHP 8.2', 'MySQL 8.0', 'Playwright'],
    tests: '640 tests — Vitest 481 · PHPUnit 135 · E2E 24',
    testCount: '640',
    demo: 'https://shye-seo.github.io/commerce-seller-analytics/',
    code: 'https://github.com/Shye-Seo/commerce-seller-analytics',
    shot: sellerShot,
    shotAlt: '셀러스코프 대시보드 — 마진 요약과 기간 비교 패널이 있는 다크 테마 화면',
    plate: '실제 배포 화면',
  },
  {
    id: 'shortform',
    no: '02',
    name: '숏폼 엔진 shortform-engine',
    kicker: '숏폼 제작 · 멀티 플랫폼 발행',
    roles: ['프론트엔드', '백엔드·DB', '데이터'],
    title: ['한 편 90분을', '3분으로 줄이는 파이프라인'],
    accent: '3분',
    summary:
      '대본 → 자막 싱크 → 오디오 더킹 → 9:16 인코딩 → 플랫폼 발행까지, 숏폼 한 편에 드는 90분 중 60분이 반복 작업입니다. 그 과정을 코드로 옮기고, 여러 고객사가 동시에 예약해도 무너지지 않는 렌더 큐와 쿼터 관리까지 붙였습니다.',
    points: [
      '12개 도메인 대본 엔진 — 장르를 먼저 판별해 일상·커리어·뷰티·레시피·재테크 등에 맞는 4비트(훅–문제–해결–CTA)를 조합하고, 30초 크로스채널 36건을 전수 검수',
      'Meta Graph·YouTube Data API 예약 발행 — 일일 쿼터(25건·1,600 unit)를 미리 계산해 초과 차단',
      'SKIP LOCKED 렌더 큐, 워커 장애 lease 복구, 실패 유형 분리(재시도 3회 후 DLQ 격리)',
      '댓글 → DM 쿠폰 5초 데드라인, 팔로워 전용 필터·발송 간격(슬로우 큐), 1,000건 폭주 시 어뷰징 41건 차단',
      '편집 패키지 내려받기 — 대본에서 .srt와 컷타임시트를 만들어 브라우저에서 ZIP으로 즉시 저장',
      '발행 전 규제·안전영역 점검 — 금칙어 13종과 9:16 자막 잘림을 검사해 차단 시 발행 버튼 비활성',
    ],
    architecture: [
      { title: '대본', body: '60초 4비트(훅–문제–해결–CTA) 타임버짓' },
      { title: '자막', body: '단어별 키네틱 자막, 오디오 더킹, 9:16 안전영역' },
      { title: '렌더', body: 'SKIP LOCKED 큐 · 워커 lease 복구 · DLQ' },
      { title: '발행', body: 'Meta Graph·YouTube 예약, 쿼터 사전 계산' },
      { title: '반응', body: '댓글→DM 쿠폰, 1회용 클레임 토큰, 어뷰징 차단' },
    ],
    troubles: [
      {
        problem: '렌더 워커가 죽으면 작업이 계속 ‘진행 중’으로 남았습니다.',
        fix: 'lease 만료를 감지해 다른 워커가 이어받게 하고, 실패 유형을 나눠 3회 재시도 뒤에는 DLQ로 격리합니다.',
      },
      {
        problem: '플랫폼 쿼터를 넘겨 예약 발행이 거부됐습니다.',
        fix: '발행 전에 일일 쿼터(25건·1,600 unit)를 계산해 넘는 예약을 미리 막고, 웹훅 서명은 HMAC으로 검증합니다.',
      },
    ],
    scope:
      'Meta·YouTube 실발행과 Redis 실서버는 자격 증명이 없어 미검증입니다. 팔로워 여부는 웹훅에 실려 오지 않아 동기화된 값이 없으면 보내지 않는 쪽으로 두었고, 규제 스캐너는 법률 검토가 아니라 규칙에 적힌 표현만 걸러 냅니다.',
    stack: ['Node.js 20', 'TypeScript', 'ffmpeg', 'PHP 8.2', 'MySQL 8.0', 'Redis'],
    tests: '751 tests — Vitest 566 · PHPUnit 185 · 커버리지 89.7%',
    testCount: '751',
    demo: 'https://shye-seo.github.io/sns-shortform-automation/',
    code: 'https://github.com/Shye-Seo/sns-shortform-automation',
    shot: shortformShot,
    shotAlt: '숏폼 엔진 웹 스튜디오 — 9:16 프리뷰와 대본·발행 큐 콘솔',
    plate: '실제 배포 화면',
  },
  {
    id: 'prop',
    no: '03',
    name: '부산 부동산 데이터 허브',
    kicker: '공공데이터 · 실거래 분석',
    roles: ['프론트엔드', '백엔드·DB', '데이터'],
    title: ['쌓이기만 하는 공공데이터를', '판단에 쓰이는 지표로'],
    accent: '판단에 쓰이는 지표',
    summary:
      '국토교통부 실거래·전월세와 한국은행 거시지표를 수집·정규화해 전세가율과 이상 거래 리스크를 계산합니다. 부산 6개 구의 350세대 이상 단지 중 최근 중위가보다 크게 낮은 매물만 모으는 급매 레이더, 전세 보증금 안전진단과 입주 필요 현금 계산, 전고점 대비 하락률 랭킹까지 같은 데이터로 계산합니다.',
    points: [
      'pnpm 모노레포 — web·api·collector·shared·infra를 한 저장소에서 실행',
      '수집 파이프라인 — 거래 해시 기반 멱등 업서트, 재시도, DLQ, 출처·기준일 메타데이터',
      '제품 화면 9종 — 시장 개요·실거래 탐색·단지 비교·구별 리스크·급매 레이더·금리 민감도 + 전세 안전진단·입주 현금 계산·전고점 하락률',
      '판단 도구 3종 — 전세가율·최우선변제·HUG 가입 가능성, 취득세·중개보수·DSR 대출 한도를 합산한 입주 자기자본, 전고점 대비 하락률 랭킹',
      '행동 이벤트 9종·5단계 퍼널 수집, OpenAPI 3.0 문서, 맞춤 알림 규칙 payload 미리보기',
    ],
    architecture: [
      { title: '수집', body: 'MOLIT 매매·전월세 XML, ECOS 지표, rate-limit' },
      { title: '정규화', body: '거래 해시 키, 멱등 업서트, 출처·기준일 메타' },
      { title: '적재', body: 'PostgreSQL 월 파티션, 재시도, DLQ' },
      { title: '지표', body: '전세가율·이상 거래 z-score·급매 레이더 배점' },
      { title: '화면', body: '제품 화면 9종, 행동 이벤트 9종·5단계 퍼널' },
    ],
    troubles: [
      {
        problem: '같은 실거래가 다시 들어와 지표가 부풀었습니다.',
        fix: '거래 해시를 키로 멱등 업서트하고, 재시도와 DLQ를 붙여 수집이 끊겨도 같은 결과가 나오게 했습니다.',
      },
      {
        problem: '표본이 적은 단지가 급매로 잘못 잡혔습니다.',
        fix: '표본 하한을 두고 점수를 할인율 45·전세가율 20·거래량 15·규모 20으로 나눠, 근거가 약한 매물은 빼도록 했습니다.',
      },
    ],
    scope:
      '공공데이터 인증키와 AWS 배포는 연결하지 않았습니다. 데모는 번들 표본 데이터로 동작하며, 표본의 범위와 한계는 저장소 문서에 적어 두었습니다.',
    stack: ['React 18', 'Fastify', 'TypeScript', 'PostgreSQL', 'Vite', 'Docker'],
    tests: '255 tests — 단위·통합 239 · Playwright E2E 16',
    testCount: '255',
    demo: 'https://shye-seo.github.io/prop-data-hub/',
    code: 'https://github.com/Shye-Seo/prop-data-hub',
    shot: propShot,
    shotAlt: '부동산 데이터 허브 — 시장 개요 지표와 구별 리스크 화면',
    plate: '실제 배포 화면',
  },
  {
    id: 'voice',
    no: '04',
    name: '보이스가드 VoiceGuard',
    kicker: 'iOS · 온디바이스 오디오',
    roles: ['iOS'],
    title: ['격양 직전 5초를', '기기 안에서 지킵니다'],
    accent: '기기 안에서',
    summary:
      '주변 대화의 감정 격양(성량 급등·피치 상승·에너지 급변)을 서버 없이 기기에서만 감지해, 격양 직전 프리롤부터 자동으로 녹음을 시작하는 iOS 앱입니다. 배터리를 아끼려고 1단계에서는 1/4 서브샘플 에너지 게이트만 돌리고, 녹음이 끝나면 온디바이스 전사와 핵심 쟁점 요약 리포트로 남깁니다.',
    points: [
      '2-Stage VAD — 야간 1시간 시뮬레이션에서 2단계 분석 비율 5.1%(절약 추정 93.3%)',
      '온디바이스 전사 — SFSpeechRecognizer를 기기 안에서만 돌리고, 45초를 넘는 녹음은 8조각으로 나눠 원래 시간축으로 되돌립니다',
      '핵심 쟁점 요약 — 격양 구간과 발화를 0.2초 기준으로 매핑해 핵심 발언·키워드·타임라인 마커 리포트 생성',
      '적응형 베이스라인과 히스테리시스 상태머신으로 주변 소음에 맞춰 임계값 조정',
      '전화·알람·에어팟 연결·미디어 서비스 리셋 시 자동 복구(디바운스, 최대 3회 재시도)',
      '모든 녹음에 completeUnlessOpen 파일 보호, Face ID·기기 암호 잠금, 백그라운드 자동 잠금',
    ],
    architecture: [
      { title: '입력', body: 'AVAudioEngine 프레임 단위 버퍼' },
      { title: '게이트', body: '1단계: 1/4 서브샘플 RMS 에너지 게이트' },
      { title: '분석', body: '2단계: 자기상관 F0·스펙트럴 플럭스' },
      { title: '판정', body: '적응형 베이스라인·히스테리시스 상태머신' },
      { title: '전사', body: '온디바이스 STT, 45초 초과 분할 인식·타임스탬프 복원' },
      { title: '저장', body: '프리롤 녹음, 격양 구간이 표시된 쟁점 요약 리포트' },
    ],
    troubles: [
      {
        problem: '전화가 오면 오디오가 끊긴 뒤 돌아오지 않았습니다.',
        fix: '인터럽션 알림을 관찰해 디바운스 후 다시 시작하고, 최대 3회까지 재시도합니다. 에어팟 연결·미디어 리셋도 같은 경로로 복구합니다.',
      },
      {
        problem: '감지만 하려는데 배터리를 너무 썼습니다.',
        fix: '1단계는 1/4 서브샘플 에너지 게이트만 돌리고, 통과한 구간만 2단계 스펙트럴 분석으로 넘깁니다. 야간 1시간 시뮬레이션에서 2단계 분석 비율 5.1%였습니다.',
      },
    ],
    scope:
      'Linux 환경에서 작성해 Xcode 실기기 빌드는 아직 검증하지 않았습니다. 코어 로직은 실제 컴파일해 XCTest 45건과 DSP 시나리오 11건을 통과했고, 앱 타깃은 구문 검증까지만 했습니다. 온디바이스 한국어 인식 모델과 45초 초과 분할 전사의 정확도는 실기기에서만 확인할 수 있습니다.',
    stack: ['Swift 6', 'SwiftUI', 'AVFoundation', 'XcodeGen', 'XCTest'],
    tests: '56건 — Swift XCTest 45 · DSP 시나리오 11',
    testCount: '56',
    code: 'https://github.com/Shye-Seo/voice-guard-ios',
    shot: '',
    shotAlt: '보이스가드 2단계 VAD 파이프라인 도식',
    plate: '파이프라인 도식 · 실기기 빌드 미검증',
  },
];

export const APPROACH = {
  label: 'How I work',
  no: '02',
  title: ['한 사람이 맡으면,', '끝까지 이어집니다'],
  accent: '끝까지 이어집니다',
  desc:
    '기획·설계·구현·운영을 한 사람이 이어서 해왔고, 그 결과를 같은 명령으로 다시 확인할 수 있게 남겼습니다. 아래 벤토 한 장에 그 방식과 근거를 모았습니다.',
  loop: {
    title: '한 사람이 끝까지',
    body: '앱 하나를 설치부터 해제까지 맡으면, 기획 문서가 설계의 입력이 되고 테스트가 운영의 근거가 됩니다.',
    steps: [
      { no: '01', title: '기획', body: '고객 화면과 운영자 화면을 함께 그립니다.' },
      { no: '02', title: '설계', body: 'ERD·인덱스·권한을 먼저 문서로 남깁니다.' },
      { no: '03', title: '구현', body: 'React·TS와 PHP·Node를 한 흐름으로 잇습니다.' },
      { no: '04', title: '운영', body: '설치·발송·쿼터·장애를 로그와 테스트로 확인합니다.' },
    ],
    core: 'FULL CYCLE',
    back: '다시 기획으로',
  },
  tests: {
    label: 'Proof / tests',
    value: 1702,
    unit: '건',
    title: '자동화 테스트',
    note: '각 저장소 README의 최종 검증 수치 합계입니다.',
    rows: [
      { name: '셀러스코프', count: 640 },
      { name: '숏폼 엔진', count: 751 },
      { name: '부동산 허브', count: 255 },
      { name: '보이스가드', count: 56 },
    ],
  },
  metrics: [
    {
      label: 'Parse / 100k rows',
      value: 612,
      unit: 'ms',
      decimals: 0,
      title: '10만 행 정산서 파싱',
      note: 'Web Worker · 13MB · 셀러스코프',
    },
    {
      label: 'Concurrency / 1,920',
      value: 0,
      unit: '건',
      decimals: 0,
      title: '동시 발급 오버이슈',
      note: '16워커 경합 · 3중 방어',
      static: true,
    },
    {
      label: 'VAD / night 1h',
      value: 93.3,
      unit: '%',
      decimals: 1,
      title: '2단계 VAD 절약 추정',
      note: '야간 1시간 시뮬레이션',
    },
  ],
  stack: [
    { group: 'Frontend', items: ['TypeScript', 'React 18', 'Next.js 14', 'Astro 7', 'Tailwind', 'Vite'] },
    { group: 'Backend · Data', items: ['PHP 8.2', 'Node.js 20', 'Fastify', 'MySQL 8.0', 'PostgreSQL', 'Redis'] },
    { group: 'Quality', items: ['Vitest', 'PHPUnit', 'Playwright', 'XCTest'] },
    { group: 'Integrations', items: ['인스타그램 API', '카카오 알림톡', 'Meta Graph', 'YouTube Data API', '공공데이터'] },
  ],
  side: {
    label: 'Side project',
    name: '쿼구리 quoguri',
    title: '직접 써보고 찍은 것만 글로 남깁니다',
    body: 'Astro 7 정적 블로그. GitHub Actions로 빌드·배포하고, 애드센스와 쿠팡 파트너스 자리를 처음부터 넣었습니다. 글은 브라우저의 /admin 화면에서 쓰고 커밋합니다.',
    meta: ['Astro 7 + MDX', '사이트맵 · RSS · OG', '다크 모드 토큰'],
    demo: BLOG,
    code: 'https://github.com/Shye-Seo/quoguri-blog',
    shot: blogShot,
    shotAlt: '쿼구리 블로그 홈 — 크림색 배경의 에디토리얼 레이아웃',
  },
  boundary: {
    label: 'Unverified / 그대로 적은 경계',
    title: '검증하지 못한 것은 숨기지 않습니다',
    items: [
      '마켓 Open API 실호출 — 자격 증명 없음',
      'Meta·YouTube 실발행, Redis 실서버',
      '공공데이터 인증키·AWS 배포',
      'iOS 실기기 빌드 — 코어 로직만 컴파일 검증',
    ],
    note: '네 프로젝트 모두 같은 경계를 저장소 문서에 적어 두었습니다.',
  },
};

export const CONTACT = {
  no: '03',
  label: 'Contact',
  title: ['다음 작업을', '같이 볼 수 있으면 합니다'],
  accent: '같이 볼 수 있으면',
  body:
    '포지션에 맞는 프로젝트부터 보시고, 필요하면 근거를 함께 보내드리겠습니다. 메일은 아래 주소로 바로 보내실 수 있고, 주소를 복사해 두셔도 됩니다.',
  mailLabel: '메일 보내기',
  copyLabel: '주소 복사',
  copiedLabel: '복사됨',
  links: [
    { label: 'GitHub', href: GITHUB },
    { label: '쿼구리 블로그', href: BLOG },
    { label: '프로젝트 다시 보기', href: '#work' },
  ],
};

export const NAV = [
  { id: 'work', no: '01', label: '작업' },
  { id: 'approach', no: '02', label: '방식' },
  { id: 'contact', no: '03', label: '연락' },
] as const;
