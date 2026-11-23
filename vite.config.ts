import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const backend = env.BACKEND_URL || 'http://localhost:8080'

  return {
    plugins: [react(), tailwindcss()],
    server: {
      // Spring Boot's CORS config (frontend.url) allows this port.
      port: 5174,
      strictPort: true,
      proxy: {
        // All API calls go to /backend/... and are forwarded to Spring Boot
        // without the prefix. This avoids CORS issues (e.g. /login has no
        // @CrossOrigin) and doesn't clash with the backend's Thymeleaf GET /login.
        '/backend': {
          target: backend,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/backend/, ''),
        },
      },
    },
  }
})
