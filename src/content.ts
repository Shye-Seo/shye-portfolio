/**
 * 이 페이지에 쓰이는 모든 사실 정보·문구·링크를 한 곳에 모아 둡니다.
 * 수치와 문장을 고칠 때는 이 파일만 수정하면 됩니다.
 *
 * 수치 출처: 각 저장소 README의 최종 검증 기록(2026-11 기준)
 *  - commerce-seller-analytics : Vitest 400 · PHPUnit 135 · Playwright E2E 10 = 545
 *  - sns-shortform-automation  : Vitest 485 · PHPUnit 125 = 610 (커버리지 88.3%)
 *  - prop-data-hub             : 단위·통합 202 · Playwright E2E 13 = 215
 *  - voice-guard-ios           : Swift XCTest 17 · DSP 시나리오 10 = 27
 */

export const GITHUB = 'https://github.com/Shye-Seo';

/** 연락용 이메일을 공개하려면 이 값에 주소를 넣으세요. null이면 버튼이 표시되지 않습니다. */
export const CONTACT_EMAIL: string | null = null;

export const NAV = [
  { id: 'role', label: '역량' },
  { id: 'process', label: '일하는 방식' },
  { id: 'work', label: '프로젝트' },
  { id: 'proof', label: '검증' },
  { id: 'stack', label: '기술' },
  { id: 'faq', label: 'FAQ' },
] as const;

export const HERO = {
  badge: '4년차 · 커머스 SaaS 실무',
  titleLines: ['기획부터 운영까지,', '한 사람이 끝까지'],
  titleAccent: '끝까지',
  lead:
    '커머스 SaaS 셀링스톰·채티스에서 프론트엔드, PHP 백엔드, MySQL 스키마 설계, 인스타그램·카카오 알림톡 연동까지 직접 만들고 운영했습니다. 그 방식을 4개의 공개 프로젝트로 코드와 라이브 데모에 담았습니다.',
  note: '라이브 데모 4개 · 공개 저장소 4개 · 자동화 테스트 1,397건',
  stats: [
    { value: '4', unit: '년', label: '커머스 SaaS 실무' },
    { value: '4', unit: '', label: '공개 프로젝트' },
    { value: '1,397', unit: '건', label: '자동화 테스트' },
  ],
  statsFoot: '각 저장소 README에 남긴 최종 검증 수치의 합계입니다.',
};

/** 1분 진단 인터랙션 — 포지션별로 어떤 근거를 먼저 보여줄지 */
export const ROLES = [
  {
    id: 'frontend',
    icon: 'monitor',
    title: '프론트엔드',
    sub: 'React·TypeScript로 화면과 상태를 끝까지',
    headline: '데이터가 많아도 느려지지 않는 화면을 만듭니다',
    points: [
      'Next.js 14 App Router·TypeScript strict·Tailwind로 4개 화면군을 직접 설계·구현',
      'Web Worker 스트리밍 파서와 윈도우 가상화로 10만 행 정산서를 브라우저에서 처리',
      '9:16 스튜디오, Canvas 타임라인, 키네틱 자막 프리뷰 같은 커스텀 UI 구현',
      'Playwright E2E 13개 시나리오로 프로덕션 빌드를 검증',
    ],
    projects: ['셀러스코프', '쇼트폼 엔진', '부동산 데이터 허브'],
  },
  {
    id: 'backend',
    icon: 'database',
    title: '백엔드 · DB',
    sub: '스키마부터 동시성까지 직접 설계',
    headline: '돈이 걸린 계산은 조건과 이력으로 증명합니다',
    points: [
      'PHP 8.2 OOP API·배치, MySQL 8.0 12테이블 DDL과 ERD 설계서 작성',
      '조건부 UPDATE·낙관적 락·멱등키 3중 방어로 1,920회 동시 발급 경합에서 오버이슈 0건',
      'PostgreSQL 파티션·집계 뷰, 멱등 업서트·재시도·DLQ 수집 파이프라인',
      '멀티 테넌트 RBAC와 해시체인 감사 로그로 변경 이력 추적',
    ],
    projects: ['셀러스코프', '부동산 데이터 허브'],
  },
  {
    id: 'fullstack',
    icon: 'layers',
    title: '1인 풀스택',
    sub: '기획·개발·운영을 한 사람이',
    headline: '실무에서는 요구사항 정리부터 배포·장애 대응까지 혼자 했습니다',
    points: [
      '앱 설치형 커머스 위젯을 기획 → ERD → 프론트·백엔드 → 설치·해제까지 담당',
      '인스타그램 API, 카카오 알림톡(NCP SENS), OAuth 온보딩·웹훅 연동 운영',
      '백오피스 쿼터 관리와 상세페이지 임베디드 SDK, 크롤러 제어(X-Robots-Tag)',
      '4개 포트폴리오 모두 기획 문서·아키텍처·테스트를 같은 저장소에 남김',
    ],
    projects: ['셀러스코프', '쇼트폼 엔진', '부동산 데이터 허브', '보이스가드'],
  },
  {
    id: 'data',
    icon: 'chart',
    title: '데이터 · 자동화',
    sub: '수집·정규화·지표·이벤트까지',
    headline: '쌓이기만 하는 로그가 아니라 판단에 쓰이는 지표로 만듭니다',
    points: [
      '공공데이터(MOLIT 매매·전월세, ECOS) 수집 커넥터와 출처·기준일 메타데이터',
      '전세가율·이상 거래 z-score·급매 레이더 배점 모델을 공용 패키지로 분리',
      '행동 이벤트 9종·5단계 퍼널 정의와 실시간 퍼널 뷰어',
      '훅 A/B의 통계적 유의성 검정, DSP 시나리오 10건 자동 검증',
    ],
    projects: ['부동산 데이터 허브', '쇼트폼 엔진'],
  },
];

export const PROCESS = [
  {
    step: '01',
    title: '기획',
    body: '고객이 실제로 겪는 지점부터 확인합니다. 설치형 위젯이면 고객 화면에 무엇이 붙는지, 운영자는 어디서 상태를 보는지까지 화면 흐름으로 정리합니다.',
    tags: ['요구사항 정리', '화면 흐름', '지표 정의'],
  },
  {
    step: '02',
    title: '설계',
    body: '데이터가 틀리면 나머지가 다 틀어지므로 스키마를 먼저 잡습니다. MySQL Workbench ERD, 인덱스·파티션, 쿼터와 권한 모델을 문서로 남깁니다.',
    tags: ['ERD', '쿼터·권한', 'API 명세'],
  },
  {
    step: '03',
    title: '구현',
    body: 'TypeScript·React 프론트와 PHP·Node 백엔드를 한 사람이 이어서 만듭니다. 위젯은 한 줄 스크립트로 붙고, 정산은 조건을 다시 계산해 차액을 증명합니다.',
    tags: ['React·TS', 'PHP·Node', '연동'],
  },
  {
    step: '04',
    title: '운영',
    body: '설치·해제, 알림톡 발송, 쿼터 초과, 크롤러 수집까지 배포 뒤에 벌어지는 일을 봅니다. 장애는 로그와 테스트로 다시 확인할 수 있게 남깁니다.',
    tags: ['모니터링', '장애 대응', '문서화'],
  },
];

import sellerShot from './assets/shots/seller-scope.png';
import shortformShot from './assets/shots/shortform-engine.png';
import propShot from './assets/shots/prop-data-hub.png';
import blogShot from './assets/shots/quoguri-blog.png';

export type Project = {
  id: string;
  no: string;
  kicker: string;
  name: string;
  title: string[];
  titleAccent: string;
  summary: string;
  points: string[];
  stack: string[];
  tests: string;
  scope: string;
  demo?: string;
  code: string;
  shot: string;
  shotAlt: string;
  shotLabel: string;
};

export const PROJECTS: Project[] = [
  {
    id: 'seller',
    no: '01',
    kicker: '이커머스 정산 · 마진 분석',
    name: '셀러스코프 SellerScope',
    title: ['정산서와 판매 원장이', '어긋나는 지점을 찾습니다'],
    titleAccent: '어긋나는 지점',
    summary:
      '“이번 달 매출은 늘었는데 통장에 들어온 돈은 왜 줄었지?” 셀러가 돈을 잃는 곳은 마진 계산이 아니라 정산서와 원장이 어긋나는 순간입니다. 마켓 정산서를 계약 조건으로 다시 계산해 수수료 초과 청구·반품비 중복 차감·설명되지 않는 부족분을 원인별 금액으로 증명합니다.',
    points: [
      '11종 이상 징후 판정 엔진 — 수수료 초과, 반품비 중복, 정산 누락을 원인별 금액으로 분해',
      'Web Worker 스트리밍 파서 — 10만 행(13MB) 정산서를 612ms에 처리하고 10만 행 테이블은 가상화 렌더링',
      '실시간 선착순 드롭 — 조건부 UPDATE·낙관적 락·멱등키 3중 방어, 최대 16워커 1,920회 경합에서 오버이슈 0건',
      '쿠폰 원장 → 정산 대사 → 월별 재대사 → SENS 알림톡 시뮬레이터까지 한 흐름으로 연결',
    ],
    stack: ['Next.js 14', 'TypeScript', 'Tailwind', 'PHP 8.2', 'MySQL 8.0', 'Playwright'],
    tests: '545 tests — Vitest 400 · PHPUnit 135 · E2E 10',
    scope: '마켓 Open API 실호출은 자격 증명이 없어 미검증입니다. OAuth2·HMAC 서명 벡터와 샌드박스 응답까지 검증했고, 이 경계는 저장소 문서에 그대로 적어 두었습니다.',
    demo: 'https://shye-seo.github.io/commerce-seller-analytics/',
    code: 'https://github.com/Shye-Seo/commerce-seller-analytics',
    shot: sellerShot,
    shotAlt: '셀러스코프 대시보드 — 마진 요약과 기간 비교 패널이 있는 다크 테마 화면',
    shotLabel: 'shye-seo.github.io/commerce-seller-analytics',
  },
  {
    id: 'shortform',
    no: '02',
    kicker: '숏폼 제작 · 멀티 플랫폼 발행',
    name: '숏폼 엔진 shortform-engine',
    title: ['한 편 90분을', '3분으로 줄이는 파이프라인'],
    titleAccent: '3분',
    summary:
      '대본 → 자막 싱크 → 오디오 더킹 → 9:16 인코딩 → 플랫폼 발행까지, 숏폼 한 편에 드는 90분 중 60분이 반복 작업입니다. 그 과정을 코드로 옮기고, 여러 고객사가 동시에 예약해도 무너지지 않는 렌더 큐와 쿼터 관리까지 붙였습니다.',
    points: [
      '60초 4비트 대본(훅–문제–해결–CTA)과 오디오 더킹, 단어별 키네틱 자막, 9:16 안전영역 합성',
      'Meta Graph·YouTube Data API 예약 발행 — 일일 쿼터(25건·1,600 unit)를 미리 계산해 초과 차단',
      'SKIP LOCKED 렌더 큐, 워커 장애 lease 복구, 실패 유형 분리(재시도 3회 후 DLQ 격리)',
      '댓글 → DM 쿠폰 5초 데드라인, 1회용 클레임 토큰, 1,000건 폭주 시 어뷰징 41건 차단',
    ],
    stack: ['Node.js 20', 'TypeScript', 'ffmpeg', 'PHP 8.2', 'MySQL 8.0', 'Redis'],
    tests: '610 tests — Vitest 485 · PHPUnit 125 · 커버리지 88.3%',
    scope: 'Meta·YouTube 실발행과 Redis 실서버는 자격 증명이 없어 미검증입니다. 웹훅 HMAC 검증·서명 벡터·폭주 시뮬레이션까지가 검증 범위입니다.',
    demo: 'https://shye-seo.github.io/sns-shortform-automation/',
    code: 'https://github.com/Shye-Seo/sns-shortform-automation',
    shot: shortformShot,
    shotAlt: '숏폼 엔진 웹 스튜디오 — 9:16 프리뷰와 대본·발행 큐 콘솔',
    shotLabel: 'shye-seo.github.io/sns-shortform-automation',
  },
  {
    id: 'prop',
    no: '03',
    kicker: '공공데이터 · 실거래 분석',
    name: '부산 부동산 데이터 허브',
    title: ['쌓이기만 하는 공공데이터를', '판단에 쓰이는 지표로'],
    titleAccent: '판단에 쓰이는 지표',
    summary:
      '국토교통부 실거래·전월세와 한국은행 거시지표를 수집·정규화해 전세가율과 이상 거래 리스크를 계산합니다. 부산 6개 구의 350세대 이상 단지 중 최근 중위가보다 크게 낮은 매물만 모으는 급매 레이더와 맞춤 알림 규칙까지 포함합니다.',
    points: [
      'pnpm 모노레포 — web·api·collector·shared·infra를 한 저장소에서 실행',
      '수집 파이프라인 — 거래 해시 기반 멱등 업서트, 재시도, DLQ, 출처·기준일 메타데이터',
      '제품 화면 6종 — 시장 개요·실거래 탐색·단지 비교·구별 리스크·급매 레이더·금리 민감도',
      '행동 이벤트 9종·5단계 퍼널 수집, OpenAPI 3.0 문서, 맞춤 알림 규칙 payload 미리보기',
    ],
    stack: ['React 18', 'Fastify', 'TypeScript', 'PostgreSQL', 'Vite', 'Docker'],
    tests: '215 tests — 단위·통합 202 · Playwright E2E 13',
    scope: '공공데이터 인증키와 AWS 배포는 연결하지 않았습니다. 데모는 번들 표본 데이터로 동작하며, 표본의 범위와 한계는 저장소 문서에 적어 두었습니다.',
    demo: 'https://shye-seo.github.io/prop-data-hub/',
    code: 'https://github.com/Shye-Seo/prop-data-hub',
    shot: propShot,
    shotAlt: '부동산 데이터 허브 — 시장 개요 지표와 구별 리스크 화면',
    shotLabel: 'shye-seo.github.io/prop-data-hub',
  },
  {
    id: 'voice',
    no: '04',
    kicker: 'iOS · 온디바이스 오디오',
    name: '보이스가드 VoiceGuard',
    title: ['격양 직전 5초를', '기기 안에서 지킵니다'],
    titleAccent: '기기 안에서',
    summary:
      '주변 대화의 감정 격양(성량 급등·피치 상승·에너지 급변)을 서버 없이 기기에서만 감지해, 격양 직전 프리롤부터 자동으로 녹음을 시작하는 iOS 앱입니다. 배터리를 아끼려고 1단계에서는 1/4 서브샘플 에너지 게이트만 돌립니다.',
    points: [
      '2-Stage VAD — 야간 1시간 시뮬레이션에서 2단계 분석 비율 5.1%(절약 추정 93.3%)',
      '적응형 베이스라인과 히스테리시스 상태머신으로 주변 소음에 맞춰 임계값 조정',
      '전화·알람·에어팟 연결·미디어 서비스 리셋 시 자동 복구(디바운스, 최대 3회 재시도)',
      '모든 녹음에 completeUnlessOpen 파일 보호, Face ID·기기 암호 잠금, 백그라운드 자동 잠금',
    ],
    stack: ['Swift 6', 'SwiftUI', 'AVFoundation', 'XcodeGen', 'XCTest'],
    tests: '27건 — Swift XCTest 17 · DSP 시나리오 10',
    scope: 'Linux 환경에서 작성해 Xcode 실기기 빌드는 아직 검증하지 않았습니다. 코어 로직은 실제 컴파일해 XCTest 17건을 통과했고, 앱 타깃은 구문 검증까지만 했습니다.',
    code: 'https://github.com/Shye-Seo/voice-guard-ios',
    shot: '',
    shotAlt: 'VoiceGuard 2단계 VAD 파이프라인 도식',
    shotLabel: 'VoiceGuardCore · 2-Stage VAD',
  },
];

export const SIDE = {
  kicker: '사이드 프로젝트',
  title: ['직접 써보고 찍은 것만', '글로 남깁니다'],
  titleAccent: '글로 남깁니다',
  name: '쿼구리 quoguri',
  body:
    'Astro 7 정적 블로그. GitHub Actions로 빌드·배포하고, 애드센스와 쿠팡 파트너스 자리를 처음부터 넣었습니다. 글은 브라우저의 /admin 화면에서 쓰고 커밋합니다.',
  points: ['Astro 7 + MDX 정적 출력', '사이트맵·RSS·OG·구조화 데이터', '다크 모드 디자인 토큰'],
  demo: 'https://shye-seo.github.io/quoguri-blog/',
  code: 'https://github.com/Shye-Seo/quoguri-blog',
  shot: blogShot,
  shotAlt: '쿼구리 블로그 홈 — 크림색 배경의 에디토리얼 레이아웃',
  shotLabel: 'shye-seo.github.io/quoguri-blog',
};

export const PROOF = [
  { value: 1397, suffix: '', label: '자동화 테스트', note: '4개 저장소 합계' },
  { value: 612, suffix: 'ms', label: '10만 행 정산서 파싱', note: 'Web Worker · 13MB' },
  { value: 0, suffix: '건', label: '동시 발급 오버이슈', note: '1,920회 경합 · 16워커' },
  { value: 88.3, suffix: '%', label: '숏폼 엔진 커버리지', note: 'Vitest 485 기준', decimals: 1 },
  { value: 93.3, suffix: '%', label: '2단계 VAD 절약 추정', note: '야간 1시간 시뮬레이션', decimals: 1 },
  { value: 13, suffix: '개', label: 'Playwright E2E', note: '부동산 허브 프로덕션 빌드' },
];

export const STACK = [
  { group: 'Frontend', items: ['TypeScript', 'React 18', 'Next.js 14', 'Astro 7', 'Tailwind CSS', 'Vite'] },
  { group: 'Backend', items: ['PHP 8.2', 'Node.js 20', 'Fastify', 'REST · OpenAPI 3.0', 'OAuth 2.0', 'Webhook'] },
  { group: 'Data', items: ['MySQL 8.0', 'PostgreSQL', 'Redis', 'ERD · DDL 설계'] },
  { group: 'Quality', items: ['Vitest', 'PHPUnit', 'Playwright', 'XCTest'] },
  { group: 'Infra', items: ['GitHub Actions', 'Docker Compose', 'GitHub Pages', 'Vercel', 'AWS'] },
  { group: 'Integrations', items: ['인스타그램 API', '카카오 알림톡 (NCP SENS)', 'Meta Graph', 'YouTube Data API', '공공데이터 (MOLIT · ECOS)'] },
];

export const FAQ = [
  {
    q: '경력 공백이 있는데 괜찮을까요?',
    a: '2026년 9월에 회사를 나온 뒤 지금까지 포트폴리오 4종을 만들었습니다. 이 기간의 결과물이 이 페이지에 있고, 테스트 수·E2E·부하 시뮬레이션은 각 저장소에서 다시 실행해 확인할 수 있습니다. 공백을 설명으로 덮기보다 코드로 보여주는 쪽을 택했습니다.',
  },
  {
    q: '프로젝트가 토이 프로젝트 아닌가요?',
    a: '각 저장소 README에 문제 정의, 아키텍처, 트레이드오프, 검증 범위를 적어 두었습니다. 화면만 있는 데모가 아니라 ERD·API 명세·부하 시뮬레이션·E2E가 함께 있고, 테스트는 합계 1,397건입니다.',
  },
  {
    q: '실서비스 운영 경험은 어디서 쌓았나요?',
    a: '커머스 SaaS 셀링스톰·채티스에서 4년간 설치형 커머스 앱을 기획·개발·운영했습니다. 인스타그램 API와 카카오 알림톡 연동, 앱스토어 OAuth 온보딩과 웹훅 처리, 백오피스 쿼터 관리, 상세페이지 임베디드 위젯과 크롤러 제어를 담당했습니다.',
  },
  {
    q: '외부 연동은 실제로 검증된 건가요?',
    a: '구분해서 적어 두었습니다. 마켓 Open API 실호출, SENS 실발송, Redis 실서버는 자격 증명이 없어 미검증입니다. 대신 서명 벡터, 샌드박스 응답, HMAC 검증, 폭주 시뮬레이션까지 검증했고 그 경계를 README의 ‘검증 범위’에 그대로 남겼습니다.',
  },
  {
    q: 'iOS 앱은 지금 실행되나요?',
    a: '아직 실기기 빌드는 검증하지 않았습니다. 작성 환경이 Linux라 Xcode 컴파일을 돌릴 수 없었기 때문입니다. 코어 로직은 Swift 6로 실제 컴파일해 XCTest 17건, DSP 시나리오 10건을 통과했고, 맥북에서 xcodegen 후 실행하는 절차를 README에 적어 두었습니다.',
  },
  {
    q: '협업할 때 어떤 방식으로 일하나요?',
    a: '문서와 테스트를 코드와 같은 저장소에 남기는 방식으로 일합니다. ERD, 아키텍처 문서, OpenAPI 명세, 이벤트 정의서를 먼저 만들고 구현이 따라가면, 나중에 합류하는 사람도 저장소만 보고 판단할 수 있습니다.',
  },
  {
    q: '어떤 자리에 맞나요?',
    a: '프론트엔드 중심의 풀스택, 또는 기획과 운영까지 볼 사람이 필요한 곳에 맞습니다. 부산에 거주합니다. 근무 형태와 조건은 면접에서 이야기하겠습니다.',
  },
  {
    q: '이 페이지는 어떻게 만들었나요?',
    a: 'chatis.kr을 디자인 레퍼런스로 삼아 Vite + React + TypeScript 정적 사이트로 만들었습니다. 스크롤에 따라 섹션이 나타나는 인터랙션, 고정 내비게이션, 반응형 레이아웃을 직접 작성한 CSS 토큰 위에 올렸고, GitHub Pages로 배포할 수 있게 구성했습니다.',
  },
];

export const CONTACT = {
  kicker: '함께 일하기',
  title: ['지금 필요한 건', '끝까지 붙잡는 한 사람'],
  titleAccent: '끝까지 붙잡는 한 사람',
  body:
    '코드와 문서, 검증 수치는 저장소에 그대로 있습니다. 포지션에 맞는 프로젝트부터 보시고, 필요하면 근거를 함께 보내드리겠습니다.',
  links: [
    { label: '셀러스코프', href: 'https://shye-seo.github.io/commerce-seller-analytics/' },
    { label: '숏폼 엔진', href: 'https://shye-seo.github.io/sns-shortform-automation/' },
    { label: '부동산 허브', href: 'https://shye-seo.github.io/prop-data-hub/' },
    { label: '쿼구리 블로그', href: 'https://shye-seo.github.io/quoguri-blog/' },
  ],
};
