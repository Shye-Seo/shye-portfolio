// 포트폴리오 검증 + 화면 기록 — 밝은 버터·앰버 팔레트(v5)
//
// 실행 (이 작업 환경 기준):
//   export PATH=/workspace/tools/node/bin:$PATH
//   export LD_LIBRARY_PATH=/workspace/tmp/browserroot/lib/x86_64-linux-gnu:/workspace/tmp/browserroot/usr/lib/x86_64-linux-gnu:/workspace/tmp/atkroot/usr/lib/x86_64-linux-gnu
//   PF_BASE=./ npm run build && PF_URL=file://$PWD/dist/index.html node scripts/verify.mjs
// 앞의 두 줄은 이 작업 환경에만 있는 경로입니다. 다른 컴퓨터에서는 playwright를 설치해
// 아래 import 경로만 바꾸면 됩니다. 빌드(dist)를 먼저 만들어 두어야 합니다.
// 배포 빌드(base '/shye-portfolio/')는 PF_URL에 http://…/shye-portfolio/ 주소를 줘서 검사합니다.
import { chromium } from '/workspace/work/commerce-seller-analytics/node_modules/@playwright/test/index.mjs';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const ROOT = '/workspace/work/shye-portfolio';
const URL = process.env.PF_URL || pathToFileURL(path.join(ROOT, 'dist/index.html')).href;
const OUT = process.env.PF_OUT || '/workspace/browser';

const results = [];
const ok = (name, pass, detail = '') => {
  results.push({ name, pass, detail });
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
};

const browser = await chromium.launch({
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'],
});

async function open(width, height, dsf = 1) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: dsf });
  await page.goto(URL, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(450);
  return page;
}

// 스크롤 리빌을 모두 발동시킨다
async function revealAll(page) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 500) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(90);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
}

const lumOfCss = `
  (c) => {
    const m = String(c).match(/rgba?\\(([^)]+)\\)/);
    if (!m) return null;
    const p = m[1].split(',').map((v) => parseFloat(v.trim()));
    const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    const L = 0.2126 * lin(p[0]) + 0.7152 * lin(p[1]) + 0.0722 * lin(p[2]);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1, L };
  }
`;

// ── 1. 가로 스크롤 없음
{
  const widths = [320, 360, 390, 414, 480, 540, 620, 680, 720, 768, 820, 900, 960, 1024, 1080, 1120, 1180, 1240, 1280, 1360, 1440, 1600, 1920];
  const page = await open(1440, 900);
  await revealAll(page);
  const bad = [];
  for (const w of widths) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.waitForTimeout(140);
    const r = await page.evaluate(() => ({
      sw: document.documentElement.scrollWidth,
      cw: document.documentElement.clientWidth,
      bodySw: document.body.scrollWidth,
    }));
    if (r.sw > r.cw + 1 || r.bodySw > r.cw + 1) bad.push(`${w}px (sw ${r.sw}, body ${r.bodySw}, cw ${r.cw})`);
  }
  ok('가로 스크롤 없음 — 320~1920px 23개 폭', bad.length === 0, bad.join(' | '));
  await page.close();
}

// ── 2. 색 대비 · 어두운 바탕 제거
{
  const page = await open(1440, 900);
  await revealAll(page);

  const contrast = await page.evaluate((lumSrc) => {
    const lumOf = eval(lumSrc);
    const bgStack = (el) => {
      const layers = [];
      let n = el;
      while (n) {
        const c = lumOf(getComputedStyle(n).backgroundColor);
        if (c && c.a > 0.01) layers.push(c);
        n = n.parentElement;
      }
      // 뒤에서부터 흰색 위에 합성
      let base = { r: 255, g: 255, b: 255 };
      for (const l of layers.reverse()) {
        base = {
          r: l.r * l.a + base.r * (1 - l.a),
          g: l.g * l.a + base.g * (1 - l.a),
          b: l.b * l.a + base.b * (1 - l.a),
        };
      }
      return base;
    };
    const rel = (r, g, b) => {
      const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
      return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    };
    const ratio = (a, b) => {
      const [x, y] = [a.L ?? rel(a.r, a.g, a.b), b.L ?? rel(b.r, b.g, b.b)].sort((p, q) => q - p);
      return (x + 0.05) / (y + 0.05);
    };

    const selectors = [
      '.folio__row', '.folio__latin', '.folio__place',
      '.opening__kicker', '.opening__title', '.accent', '.opening__lead', '.index__head',
      '.index__no', '.index__name', '.index__meta', '.opening__note', '.facts', '.opening__scroll',
      '.opening__mail', '.shead__label', '.shead__title', '.shead__desc',
      '.case__no', '.case__name', '.case__kicker', '.case__tests',
      '.casepanel__meta', '.casepanel__title', '.casepanel__summary', '.tab', '.tab[aria-selected="true"]',
      '.points__no', '.points__item p', '.scopenote', '.scopenote b', '.arch__no', '.arch__title', '.arch__body',
      '.trouble__q', '.trouble__a', '.trouble__q span', '.trouble__a span',
      '.plate figcaption', '.spec dt', '.spec dd', '.work__foot',
      '.bcell__label', '.bcell__label--tint', '.bcell__label--warn', '.bcell__title', '.bcell__label--warn::after', '.metric__num', '.metric__num small',
      '.metric__title', '.metric__note', '.breakdown__name', '.breakdown__count',
      '.loop__title', '.loop__body', '.loop__step span', '.loop__step b', '.loop__step em',
      '.loop__foot', '.loop__core b', '.stackgrid__group h4', '.stackgrid__group p',
      '.stack__principle', '.stack__note', '.side__name', '.side__desc', '.side__meta',
      '.side__links a', '.boundary__title', '.boundary__list li', '.boundary__note',
      '.contact__label', '.contact__title', '.contact__body', '.mailrow__address',
      '.contact__status', '.contact__links a', '.footer__row', '.vd__head', '.vd__chip',
      '.employer__name', '.employer__alias', '.employer__fact dt', '.employer__fact dd',
      '.employer__summary', '.employer__stack li', '.employer__note',
      '.ct__no', '.ct__name', '.ct__kicker', '.ct__role', '.ct__body', '.ct__points li',
      '.also__title', '.also__item',
      '.contrib__label', '.contrib__title', '.contrib__list li',
      '.vd__label', '.vd__label em', '.vd__meters b', '.vd__meters span',
    ];

    const rows = [];
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (!el) continue;
      const cs = getComputedStyle(el);
      const fg = lumOf(cs.color);
      if (!fg) continue;
      const bg = bgStack(el);
      // 반투명 글자는 흰 바탕 위 합성해서 계산
      const fgC = { r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a) };
      rows.push({
        sel,
        size: parseFloat(cs.fontSize),
        ratio: +ratio(fgC, bg).toFixed(2),
        bg: `rgb(${Math.round(bg.r)},${Math.round(bg.g)},${Math.round(bg.b)})`,
      });
    }
    return rows;
  }, lumOfCss);

  const fail = contrast.filter((r) => r.ratio < 4.5);
  ok(
    `본문 대비 4.5:1 이상 — 검사 ${contrast.length}개 요소`,
    fail.length === 0,
    fail.map((f) => `${f.sel} ${f.ratio}:1 (${f.size}px, ${f.bg})`).join(' | ') || `최저 ${Math.min(...contrast.map((r) => r.ratio)).toFixed(2)}:1`,
  );

  const dark = await page.evaluate(() => {
    const rel = (r, g, b) => {
      const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
      return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
    };
    const parse = (c) => {
      const m = String(c).match(/rgba?\(([^)]+)\)/);
      if (!m) return null;
      const p = m[1].split(',').map((v) => parseFloat(v.trim()));
      return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
    };
    const eff = (el) => {
      const layers = [];
      let n = el;
      while (n) {
        const c = parse(getComputedStyle(n).backgroundColor);
        if (c && c.a > 0.01) layers.push(c);
        n = n.parentElement;
      }
      let base = { r: 255, g: 255, b: 255 };
      for (const l of layers.reverse()) {
        base = { r: l.r * l.a + base.r * (1 - l.a), g: l.g * l.a + base.g * (1 - l.a), b: l.b * l.a + base.b * (1 - l.a) };
      }
      base.L = rel(base.r, base.g, base.b);
      return base;
    };
    return ['.case.is-open .case__btn', '.bcell--loop', '.bcell', '.casepanel', '.indexbar', '.approach', '.career', '.contact', '.opening', 'body'].map((sel) => {
      const el = document.querySelector(sel);
      if (!el) return { sel, missing: true };
      const c = eff(el);
      return { sel, L: +c.L.toFixed(3), rgb: `rgb(${Math.round(c.r)},${Math.round(c.g)},${Math.round(c.b)})` };
    });
  });
  const darkFail = dark.filter((d) => !d.missing && d.L < 0.7);
  ok('어두운 바탕 없음 — 모든 면이 밝음(L≥0.7)', darkFail.length === 0, dark.map((d) => `${d.sel} L=${d.L}`).join(' · '));

  await page.close();
}

// ── 3. 내용 불변식
{
  const page = await open(1440, 900);
  await revealAll(page);
  await page.waitForTimeout(1800);

  const text = await page.evaluate(() => document.body.innerText.replace(/\s+/g, ' '));
  ok('자동화 테스트 수치 1,702건 유지', text.includes('1,702'), text.includes('1,702') ? '' : '미발견');
  ok(
    '프로젝트별 테스트 수치 640 · 751 · 255 · 56',
    ['640 tests', '751 tests', '255 tests', '56 tests'].every((v) => text.includes(v)),
    ['640', '751', '255', '56'].map((v) => `${v}:${text.includes(`${v} tests`)}`).join(' · '),
  );
  ok('메일 주소 seounghye95@naver.com 유지', text.includes('seounghye95@naver.com'));
  ok('케이스 4개', (await page.locator('.case').count()) === 4);
  ok(
    '경력 항목 4건 — 카페24 첫구매 100원 · 기프틴 · 인스타 위젯 · 럭키딜',
    (await page.locator('.career .ct').count()) === 4 &&
      ['카페24 첫구매 100원', '기프틴', '고도몰 인스타쇼핑위젯', '럭키딜'].every((v) => text.includes(v)),
    `${await page.locator('.career .ct').count()}건`,
  );
  ok('경력 섹션에 회사(채티스) 정보', text.includes('주식회사 채티스') && text.includes('SellingStorm'));
  ok(
    '컨택트에 기여 포인트·협업 방식 명시',
    text.includes('바로 맡을 수 있는 일') && text.includes('일하는 방식'),
  );
  ok('섹션 색인 4항목(작업·경력·방식·연락)', (await page.locator('.indexbar__nav a').count()) === 4);
  ok('FAQ 없음', !/FAQ|자주 묻는/.test(text));
  ok('색인 → 케이스 아코디언 구조 유지', (await page.locator('.cases').count()) === 1);
  ok('12칸 벤토 유지', (await page.locator('.bento > .bcell').count()) === 8, `${await page.locator('.bento > .bcell').count()}개 칸`);
  ok('탭 3개(개요/구조/문제 해결)', (await page.locator('.case.is-open .tab').count()) === 3);
  await page.close();
}

// ── 4. 상호작용
{
  const page = await open(1440, 900);
  await page.evaluate(() => window.scrollTo(0, document.getElementById('work').offsetTop));
  await page.waitForTimeout(500);

  // 아코디언: 한 번에 하나
  await page.click('#case-btn-shortform');
  await page.waitForTimeout(300);
  const openCount = await page.locator('.case.is-open').count();
  ok('아코디언 한 번에 하나만 열림', openCount === 1 && (await page.locator('#case-panel-shortform').isVisible()));

  // 표지 색인 링크 → 해당 케이스 열림
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.click('.index__item[href="#case-prop"]');
  await page.waitForTimeout(600);
  ok('표지 색인 클릭 → 03 케이스 열림', await page.locator('#case-panel-prop').isVisible());

  // 탭 키보드 이동
  const tab = page.locator('#tab-prop-overview');
  await tab.focus();
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(250);
  const selected = await page.evaluate(() => document.activeElement?.textContent?.trim());
  ok('탭 방향키 이동(개요 → 구조)', selected === '구조', String(selected));

  // 아코디언 닫기
  await page.click('#case-btn-prop');
  await page.waitForTimeout(300);
  ok('열린 줄 다시 누르면 닫힘', (await page.locator('.case.is-open').count()) === 0);

  await page.close();
}

// ── 5. 접힌 상태 기본값(첫 케이스 열림) 확인
{
  const page = await open(1440, 900);
  ok('첫 화면: 01 케이스 기본 열림', await page.locator('#case-panel-seller').isVisible());
  await page.close();
}

// ── 5-2. 링크·복사·오류·모션
{
  const errors = [];
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    permissions: ['clipboard-read', 'clipboard-write'],
  });
  const page = await ctx.newPage();
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(URL, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);

  const mailtos = await page.locator('a[href^="mailto:"]').count();
  ok('네이버 메일 mailto 링크 4곳', mailtos === 4, `${mailtos}곳`);

  ok('스크롤 전 색인 바 숨김', !(await page.locator('.indexbar').isVisible()));
  await page.evaluate(() => window.scrollTo(0, document.getElementById('approach').offsetTop));
  await page.waitForTimeout(600);
  ok('스크롤 후 색인 바 표시', await page.locator('.indexbar').isVisible());

  // 지연 로드 이미지까지 모두 받도록 끝까지 내렸다가 올린다
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1200);
  const loaded = await page.evaluate(() => [...document.images].map((i) => i.naturalWidth > 0));
  ok('이미지 4장 로드', loaded.length === 4 && loaded.every(Boolean), `${loaded.length}장 · ${loaded.map((v) => (v ? 'ok' : 'fail')).join(',')}`);

  const copyBtn = page.locator('button', { hasText: '주소 복사' }).first();
  await copyBtn.scrollIntoViewIfNeeded();
  await copyBtn.click();
  await page.waitForTimeout(400);
  const clip = await page.evaluate(() => navigator.clipboard.readText()).catch(() => '');
  ok('주소 복사 → 클립보드에 메일 주소', clip === 'seounghye95@naver.com', JSON.stringify(clip));

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(700);
  const active = (await page.locator('.indexbar__nav a.is-active').innerText().catch(() => '')).replace(/\s+/g, '');
  ok('색인 바 현재 섹션 표시', active.includes('연락'), active);

  ok('콘솔·페이지 오류 없음', errors.length === 0, errors.slice(0, 3).join(' | '));
  await ctx.close();

  const ctx2 = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const p2 = await ctx2.newPage();
  await p2.goto(URL, { waitUntil: 'load' });
  await p2.waitForTimeout(400);
  const opacities = await p2.evaluate(() =>
    [...document.querySelectorAll('[class*="reveal"]')].map((el) => Number(getComputedStyle(el).opacity)),
  );
  ok(
    'prefers-reduced-motion에서 리빌 즉시 표시',
    opacities.length > 0 && opacities.every((v) => v === 1),
    `${opacities.length}개 요소`,
  );
  await ctx2.close();
}

// ── 6. 화면 기록
{
  const page = await open(1440, 900);
  await page.screenshot({ path: `${OUT}/pf-v5-desktop-opening.png` });

  await page.evaluate(() => window.scrollTo(0, document.getElementById('work').offsetTop - 60));
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/pf-v5-desktop-work.png` });

  await page.evaluate(() => window.scrollTo(0, document.getElementById('career').offsetTop - 60));
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/pf-v5-desktop-career.png` });

  // 지표 카운터를 먼저 끝까지 돌린 뒤 벤토 첫 화면으로 돌아와 찍는다
  await page.evaluate(() => window.scrollTo(0, document.getElementById('approach').offsetTop + 520));
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, document.getElementById('approach').offsetTop - 60));
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}/pf-v5-desktop-bento.png` });

  await page.evaluate(() => window.scrollTo(0, document.getElementById('approach').offsetTop + 560));
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${OUT}/pf-v5-desktop-bento2.png` });

  await page.evaluate(() => window.scrollTo(0, document.getElementById('contact').offsetTop - 60));
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${OUT}/pf-v5-desktop-contact.png` });

  await revealAll(page);
  await page.screenshot({ path: `${OUT}/pf-v5-desktop-full.png`, fullPage: true });
  await page.close();
}

{
  const page = await open(390, 844);
  await revealAll(page);
  await page.screenshot({ path: `${OUT}/pf-v5-mobile-full.png`, fullPage: true });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/pf-v5-mobile-opening.png` });
  await page.close();
}

// ── 7. og.png (1200×630) 재생성 — 소셜 카드는 표지의 이름·직함·제목·소개문만 담는다
{
  const page = await open(1200, 630);
  await page.evaluate(() => {
    document.querySelectorAll('.index, .opening__note').forEach((el) => {
      el instanceof HTMLElement && (el.style.display = 'none');
    });
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(ROOT, 'public/og.png') });
  await page.close();
}

await browser.close();

const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} 통과`);
process.exit(failed.length ? 1 : 0);
