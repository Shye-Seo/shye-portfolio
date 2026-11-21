# shye-portfolio

서승혜 — 풀사이클 웹 개발자 포트폴리오 랜딩페이지.
`https://chatis.kr`을 디자인 레퍼런스로 삼아 Vite + React + TypeScript로 만든 정적 사이트입니다.
GitHub Pages에 그대로 올릴 수 있게 구성했습니다.

- 프레임워크: Vite 5 · React 18 · TypeScript(strict)
- 스타일: 직접 작성한 CSS 디자인 토큰 (프레임워크 없음)
- 폰트: Paperlogy (눈누 무료 배포, `src/assets/fonts/`)
- 외부 라이브러리 런타임 의존성: 없음 (React 제외)

## 1. 로컬에서 켜기

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # dist/ 생성 (타입 검사 포함)
npm run preview    # 빌드 결과 확인 http://localhost:4173
```

## 2. 내용 고치기

문구·수치·링크·프로젝트 설명은 **`src/content.ts` 한 파일**에 모아 두었습니다.

| 상수 | 바꾸면 반영되는 곳 |
| --- | --- |
| `HERO` | 히어로 제목·소개·요약 지표 |
| `ROLES` | "1분 역량 진단" 4개 포지션과 근거 |
| `PROCESS` | 일하는 방식 4단계 |
| `PROJECTS` | 프로젝트 4종 (제목·요약·근거·스택·검증 범위·링크) |
| `PROOF` | 검증 섹션 숫자 |
| `STACK` | 기술 스택 그룹 |
| `SIDE` | 쿼구리 블로그 카드 |
| `FAQ` | 아코디언 |
| `CONTACT` | 마지막 CTA |
| `CONTACT_EMAIL` | `null`이면 이메일 버튼이 나오지 않습니다. 주소를 넣으면 버튼이 생깁니다. |

프로젝트 캡처 이미지는 `src/assets/shots/`에 있습니다. 다시 찍어 교체해도 됩니다.

## 3. 배포 — GitHub Pages

### 방법 A. GitHub Actions (권장)

```bash
git init && git add -A && git commit -m "feat: portfolio landing"
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

## 4. 구성

```
src/
  content.ts            모든 문구·수치·링크
  App.tsx               섹션 조립
  styles/site.css       디자인 토큰 + 전체 스타일
  components/           Nav · Hero · RoleSection · ProcessSection · WorkSection
                        ProofSection · StackSection · FaqSection · ContactSection
                        VoiceDiagram · TechStrip · Reveal · Icons
  lib/                  IntersectionObserver 리빌 · 카운터 훅
  assets/               폰트(Paperlogy) · 라이브 데모 캡처
docs/DESIGN-REFERENCE.md  chatis.kr 분석 노트 (토큰·인터랙션 값)
```

## 5. 검증한 것

- `npm run build` 성공 (TypeScript strict 통과, 51 modules → dist 약 1.2MB)
- 로컬 정적 서버에서 데스크톱(1440×900)·모바일(390×844) 렌더 확인
- 하위 경로(`/shye-portfolio/`) 서빙에서도 자산·폰트 로드 확인
- `prefers-reduced-motion` 사용자에게는 리빌·마퀴 애니메이션을 끔

## 6. 참고

- 수치는 각 저장소 README의 최종 검증 기록을 옮긴 것입니다. 저장소에서 다시 실행해 확인할 수 있습니다.
- 라이브 데모 화면 캡처는 `shye-seo.github.io`의 실제 배포 화면입니다.
- 폰트 Paperlogy는 눈누(projectnoonnu) 배포본이며 상업적 사용이 허용된 무료 폰트입니다.
  재배포 시에는 원 배포처 표기를 유지해 주세요.
