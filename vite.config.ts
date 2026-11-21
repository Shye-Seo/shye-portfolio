import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' — GitHub Pages 프로젝트 페이지(/저장소명/)든 커스텀 도메인이든
// 같은 빌드 산출물로 동작하도록 상대 경로로 내보냅니다.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 2048,
  },
});
