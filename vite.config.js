import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages 项目站点：路径带仓库名前缀 /passcode/
export default defineConfig({
  base: '/passcode/',
  plugins: [react()],
});
