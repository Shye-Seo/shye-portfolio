// apple-touch-icon.png (180×180) — favicon.svg의 코발트 타일을 꽉 채운 판으로 렌더.
// 글자는 사이트와 같은 Paperlogy 800을 data URI로 넣어 로드한다.
//
// 실행: export LD_LIBRARY_PATH=/workspace/tmp/atkroot/usr/lib/x86_64-linux-gnu && node scripts/icons.mjs
// (playwright import 경로와 LD_LIBRARY_PATH는 이 작업 환경 기준)
import { chromium } from '/workspace/commerce-seller-analytics/node_modules/@playwright/test/index.mjs';
import fs from 'node:fs';

const b64 = fs
  .readFileSync('/workspace/work/shye-portfolio/src/assets/fonts/Paperlogy-8ExtraBold.woff2')
  .toString('base64');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:'Paperlogy';src:url(data:font/woff2;base64,${b64}) format('woff2');font-weight:800;font-display:block}
html,body{margin:0;width:180px;height:180px;overflow:hidden;background:#2f54eb}
.tile{position:relative;width:180px;height:180px;background:#2f54eb}
.mark{position:absolute;left:0;top:0;width:180px;height:180px;display:flex;align-items:center;justify-content:center;
  font-family:'Paperlogy', monospace;font-weight:800;font-size:122px;line-height:1;color:#fff;letter-spacing:-4px;transform:translate(-7px,3px)}
.dot{position:absolute;left:127px;top:117px;width:24px;height:24px;border-radius:50%;background:#a7ecf7}
</style></head><body><div class="tile"><span class="mark">s</span><span class="dot"></span></div></body></html>`;

const browser = await chromium.launch({
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--allow-file-access-from-files'],
});
const page = await browser.newPage({ viewport: { width: 180, height: 180 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'load' });
const applied = await page.evaluate(async () => {
  await document.fonts.load('800 122px Paperlogy');
  await document.fonts.ready;
  const probe = document.createElement('span');
  probe.style.cssText = "position:absolute;visibility:hidden;font:800 122px 'Paperlogy', monospace";
  probe.textContent = 's';
  document.body.appendChild(probe);
  const paper = probe.getBoundingClientRect().width;
  probe.style.font = "800 122px 'ZZNoFont', monospace";
  return paper !== probe.getBoundingClientRect().width;
});
await page.waitForTimeout(400);
await page.screenshot({ path: '/workspace/work/shye-portfolio/public/apple-touch-icon.png' });
await browser.close();
console.log('apple-touch-icon.png 180×180 갱신 · Paperlogy 적용:', applied);
