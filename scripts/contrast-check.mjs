// 팔레트 대비 계산 — WCAG 2.1 relative luminance
// 실행: node scripts/contrast-check.mjs
const hex = (h) => h.replace('#', '').match(/../g).map((x) => parseInt(x, 16) / 255);
const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const L = (h) => {
  const [r, g, b] = hex(h).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [L(a), L(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

const T = {
  paper: '#faf7f0',
  paper2: '#f3ede0',
  paper3: '#efe6d5',
  surface: '#f8ead0',
  white: '#fffdf8',
  ink: '#1c1917',
  text: '#3d352c',
  muted: '#57534e',
  line: '#e6dcc8',
  lineStrong: '#d3c6ac',
  accent: '#a94d07',
  accentDeep: '#83390a',
  accentStrong: '#92400e',
  mark: '#fde68a',
  sky: '#4f6147',
  warn: '#9a3412',
  warnSoft: '#fbf0e4',
};

// [글자, 바탕] — 본문 텍스트가 놓이는 실제 조합만 검사한다.
const pairs = [
  ['ink', 'paper'],
  ['ink', 'paper2'],
  ['ink', 'paper3'],
  ['ink', 'surface'],
  ['ink', 'white'],
  ['text', 'paper'],
  ['text', 'paper2'],
  ['text', 'white'],
  ['muted', 'paper'],
  ['muted', 'paper2'],
  ['muted', 'paper3'],
  ['muted', 'surface'],
  ['muted', 'white'],
  ['accent', 'paper'],
  ['accent', 'paper2'],
  ['accent', 'white'],
  ['accentStrong', 'surface'],
  ['accentStrong', 'mark'],
  ['accentDeep', 'paper'],
  ['sky', 'paper'],
  ['sky', 'paper2'],
  ['warn', 'paper'],
  ['warn', 'paper2'],
  ['warn', 'warnSoft'],
  ['white', 'accent'],
  ['white', 'accentDeep'],
  ['ink', 'line'],
  ['ink', 'lineStrong'],
];

let fail = 0;
for (const [f, b] of pairs) {
  const r = ratio(T[f], T[b]);
  const tag = r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? 'AA-large' : 'FAIL';
  if (r < 4.5) fail += 1;
  console.log(`${f.padEnd(13)} ${T[f]}  on ${b.padEnd(10)} ${T[b]}  ${r.toFixed(2).padStart(5)}:1  ${tag}`);
}
console.log(fail === 0 ? '\n모든 조합 4.5:1 이상 (AA 통과)' : `\n${fail}개 조합이 4.5:1 미만`);
process.exit(fail === 0 ? 0 : 1);
