# shye-portfolio

서승혜 — 풀사이클 웹 개발자 포트폴리오.
Vite + React + TypeScript로 만든 정적 사이트이고, GitHub Pages에 그대로 올릴 수 있게 구성했습니다.

- 프레임워크: Vite 5 · React 18 · TypeScript(strict)
- 스타일: 직접 작성한 CSS 디자인 토큰 (프레임워크 없음)
- 폰트: Paperlogy (눈누 무료 배포, `src/assets/fonts/`)
- 외부 라이브러리 런타임 의존성: 없음 (React 제외)

## 1. 구조

한 페이지를 네 부분으로 나눕니다. 회사 소개형 홈페이지의 섹션 공식(요약 지표 히어로 → 마퀴 → 진단 버튼 →
단계 카드 → 교차 프로젝트 → 지표 그리드 → 다크 CTA)을 쓰지 않고, 작업 문서를 펼쳐 보는 순서로 구성했습니다.

| 순서 | 섹션 | 하는 일 |
| --- | --- | --- |
| 표지 | `.opening` | 마스트헤드 + 한 문장 + 프로젝트 색인. 지표 카드 없이 글과 색인만 놓습니다. |
| 01 | `#work` 케이스 파일 | 프로젝트 4개를 한 줄씩 쌓고, 고른 항목이 그 자리에서 펼쳐집니다. 펼친 패널 안에서 `개요 / 구조 / 문제 해결` 탭을 오갑니다. |
| 02 | `#approach` 벤토 | 12칸 벤토 한 장에 순환하는 작업 방식, 테스트 원장, 지표 3개, 도구, 사이드 프로젝트, 검증하지 못한 경계를 모았습니다. |
| 03 | `#contact` | 큰 메일 주소와 `주소 복사` 버튼. 밝은 바탕의 짧은 맺음말입니다. |

- 프로젝트를 고르면 그 패널만 열리고, 다시 누르면 닫힙니다.
- 탭은 `role="tablist"`와 방향키 이동을 지원하고, 패널은 `hidden`으로 닫힌 상태를 알립니다.
- 스크롤이 시작되면 상단에 얇은 색인 바가 내려와 현재 섹션과 읽은 비율을 보여 줍니다.

## 2. 로컬에서 켜기

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/ 생성 (타입 검사 포함)
npm run preview    # 빌드 결과 확인 http://localhost:4173
```

## 3. 내용 고치기

문구·수치·링크·프로젝트 설명은 **`src/content.ts` 한 파일**에 모아 두었습니다.

| 상수 | 바꾸면 반영되는 곳 |
| --- | --- |
| `FOLIO` | 마스트헤드의 이름·직함·지역·연도 |
| `OPENING` | 표지의 킥커·제목·소개문·사실 목록 |
| `INDEX` | 표지 오른쪽 프로젝트 색인 (클릭 시 해당 케이스가 열림) |
| `WORK` | 케이스 파일 섹션 머리와 하단 주석 |
| `PROJECTS` | 프로젝트 4종 — 요약·근거·구조 단계·문제 해결·검증 범위·스택·테스트·링크·도판 |
| `APPROACH` | 벤토의 순환 도식·테스트 원장·지표·도구·사이드 프로젝트·검증 경계 |
| `CONTACT` | 연락 섹션의 문구와 바로가기 |
| `CONTACT_EMAIL` | 연락 섹션과 상단 색인 바의 메일 주소. `mailto:`와 `주소 복사` 버튼이 이 값을 씁니다. |

- 현재 메일 주소는 `seounghye95@naver.com`입니다.
- 프로젝트 도판은 `src/assets/shots/`에 있습니다. 다시 찍어 교체해도 됩니다.
- `PROJECTS[].tests`는 저장소 README의 최종 검증 기록과 같은 문자열로 맞춰 두었습니다.
  1호 640 · 2호 751 · 3호 255 · 보이스가드 56 = **1,702건** (2026-11-21 실전 디벨롭 반영:
  1호 운영 콘솔 3종 · 2호 12도메인 대본 엔진과 편집 패키지·규제 점검 · 3호 전세 안전진단·입주 현금·하락률 랭킹 ·
  4호 온디바이스 STT·쟁점 요약).

## 4. 디자인

색·타이포·레이아웃·모션 기준은 [`docs/DESIGN.md`](docs/DESIGN.md)에 정리해 두었습니다.
요약하면 흰 종이와 쿨그레이 서피스 위에 네이비 차콜 본문, 포인트는 코발트 하나,
큰 제목과 여백으로 읽는 순서를 만들고, 라틴 라벨만 모노스페이스로 씁니다.
카드 모서리는 2~3px이고 그림자 대신 헤어라인으로 영역을 나눕니다. 어두운 바탕 면은 쓰지 않습니다.

## 5. 배포 — GitHub Pages

### 방법 A. GitHub Actions (권장)

```bash
git init && git add -A && git commit -m "feat: portfolio"
git branch -M main
git remote add origin https://github.com/<계정>/shye-portfolio.git
git push -u origin main
```

푸시하면 `.github/workflows/deploy.yml`이 빌드·배포합니다.
저장소 **Settings → Pages → Source: GitHub Actions** 로 한 번만 지정하면
`https://<계정>.github.io/shye-portfolio/` 에서 열립니다.

> `vite.config.ts`의 `base: './'` 덕분에 저장소 이름이 달라도, 커스텀 도메인을 붙여도
> 같은 빌드 결과물이 그대로 동작합니다.

### 방법 B. gh-pages 브랜치로 직접 올리기

워크플로 권한이 없는 계정이라면:

```bash
npm run deploy:gh-pages
```

그다음 **Settings → Pages → Source: Deploy from a branch → `gh-pages` / (root)**.

## 6. 구성

```
src/
  content.ts            모든 문구·수치·링크
  App.tsx               섹션 조립과 열린 케이스 상태
  styles/site.css       디자인 토큰 + 전체 스타일
  components/           Nav(색인 바) · Opening · CaseWorkspace · Bento
                        Contact · Footer · SectionHead · Accent · VoiceDiagram
                        Reveal · Icons
  lib/                  IntersectionObserver 리빌 · 카운터 훅
  assets/               폰트(Paperlogy) · 라이브 데모 캡처
docs/DESIGN.md          디자인 시스템 노트
public/og.png           1200×630 소셜 카드
```

## 7. 검증한 것

`npm run build`(TypeScript strict + Vite) 통과 후, Playwright로 데스크톱(1440×900)과
모바일(390×844)을 실제 렌더해 **24개 항목**을 확인했습니다(`node scripts/verify.mjs` → 24/24 통과).

- 320~1920px 사이 23개 폭에서 가로 스크롤 없음, 본문 대비 4.5:1 이상(76개 요소 검사)
- 어두운 바탕 면 없음 — 모든 면이 밝음(L≥0.7)
- 수치 표기(1,702 · 640 · 751 · 255 · 56)와 네이버 메일 주소 유지
- 케이스 4개, `FAQ`·자주 묻는 문구 없음, 색인 → 케이스 아코디언 구조·8칸 벤토·탭 3개 유지
- 아코디언 한 번에 하나만 열림, 열린 줄 다시 누르면 닫힘, 첫 화면 01 케이스 기본 열림
- 표지 색인 클릭 → 03 케이스 열림, 탭 방향키 이동(개요 → 구조)
- 네이버 메일 `mailto:` 링크 4곳, `주소 복사`가 클립보드에 실제로 쓰이는지
- 스크롤 전 색인 바 숨김 → 스크롤 후 표시, 바닥에서 현재 섹션을 `연락`으로 표시
- 이미지 4장 로드, 콘솔·페이지 오류 없음, `prefers-reduced-motion`에서 리빌 즉시 표시

수치는 각 저장소 README의 최종 검증 기록을 옮긴 것입니다. 저장소에서 다시 실행해 확인할 수 있습니다.
라이브 데모 화면 캡처는 `shye-seo.github.io`의 실제 배포 화면입니다.
폰트 Paperlogy는 눈누(projectnoonnu) 배포본이며 상업적 사용이 허용된 무료 폰트입니다.
재배포 시에는 원 배포처 표기를 유지해 주세요.

## 8. 화면 기록

`docs/screenshots/` 에 최종 렌더 결과를 남겨 두었습니다.

- `desktop-hero.jpg` — 데스크톱 1440×900 표지
- `desktop-full.jpg` — 데스크톱 전체 페이지
- `desktop-project.jpg` — 케이스 파일이 펼쳐진 화면
- `mobile-full.jpg` — 모바일 390×844 전체 페이지
