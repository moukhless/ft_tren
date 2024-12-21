import { ProxyOptions, defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";
import { config } from 'dotenv';

/**run package config */
config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  /*define process env*/
  envDir:".",
  define: {
    'process.env' : process.env
  },
  server: {
    proxy: {
      '/apisss/' : process.env.BACKEND_API_URL as ProxyOptions ,
    },
    port: Number(process.env.VITE_PORT),
    host: true,
  },
  resolve:{
    alias:{
      "@" : path.resolve(__dirname, "."),
      "@assets" : path.resolve(__dirname, "/assets"),
      "@icons" : path.resolve(__dirname, "/assets/icons"),
      "@images" : path.resolve(__dirname, "/assets/images"),
      "@videos" : path.resolve(__dirname, "/assets/videos"),
      "@src" : path.resolve(__dirname, "./src"),
      "@router": path.resolve(__dirname, "./src/router"),
      "@states": path.resolve(__dirname, "./src/states"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@publicPages": path.resolve(__dirname, "./src/pages/public"),
      "@publicPagesStyles" : path.resolve(__dirname, "./src/pages/public/styles"),
      "@publicComponents": path.resolve(__dirname, "./src/pages/public/components"),
      "@privatePages": path.resolve(__dirname, "./src/pages/private"),
      "@privatePagesStyles" : path.resolve(__dirname, "./src/pages/private/styles"),
      "@privateComponents": path.resolve(__dirname, "./src/pages/private/components")
    }
  }
})
