// 팔레트 대비 계산 — WCAG 2.1 relative luminance
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
  paper: '#ffffff',
  paper2: '#f5f7fb',
  paper3: '#eef2f9',
  surface: '#ecf1fe',
  ink: '#111827',
  text: '#333d4e',
  muted: '#59637a',
  line: '#dce3f0',
  lineStrong: '#c0c9da',
  accent: '#2f54eb',
  accentStrong: '#2141ce',
  sky: '#0c86a0',
  warn: '#a9500b',
  white: '#ffffff',
};

const pairs = [
  ['ink', 'paper'],
  ['text', 'paper'],
  ['muted', 'paper'],
  ['muted', 'paper2'],
  ['text', 'paper2'],
  ['muted', 'surface'],
  ['ink', 'surface'],
  ['accentStrong', 'surface'],
  ['accent', 'paper'],
  ['accent', 'paper2'],
  ['accent', 'surface'],
  ['sky', 'paper'],
  ['sky', 'paper2'],
  ['warn', 'paper'],
  ['warn', 'paper2'],
  ['white', 'accent'],
  ['white', 'accentStrong'],
  ['lineStrong', 'paper'],
];

for (const [f, b] of pairs) {
  const r = ratio(T[f], T[b]);
  const tag = r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? 'AA-large' : 'FAIL';
  console.log(`${f.padEnd(13)} ${T[f]}  on ${b.padEnd(8)} ${T[b]}  ${r.toFixed(2).padStart(5)}:1  ${tag}`);
}
