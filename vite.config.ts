import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages 프로젝트 페이지(https://shye-seo.github.io/shye-portfolio/)로 배포합니다.
// base를 절대 경로로 두면 저장소 이름이 곧 배포 경로가 되고, 로컬에서 파일로 열어
// 검사할 때만 PF_BASE=./ 로 낮춰 씁니다.
export default defineConfig({
  base: process.env.PF_BASE || '/shye-portfolio/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 2048,
  },
});
