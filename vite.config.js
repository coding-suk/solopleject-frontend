import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  base: "./", // 상대 경로로 배포
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
})