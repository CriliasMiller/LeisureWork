import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import commonjs from '@rollup/plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // commonjs(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // server: {
  //   proxy: {
  //     '/v1': {
  //       secure: false,  
  //       target: 'http://api.cyansu.top',
  //       changeOrigin: true, // Add this line
  //       rewrite: (path) => path.replace(/^\/v1/, '')
  //     },
  //     '/v2': {
  //       secure: false,  
  //       target: 'http://api.cyansu.top',
  //       changeOrigin: true, // Add this line
  //       rewrite: (path) => path.replace(/^\/v2/, '')
  //     },
  //     '/v3': {
  //       secure: false,  
  //       target: 'http://api.cyansu.top',
  //       changeOrigin: true, // Add this line
  //       rewrite: (path) => path.replace(/^\/v3/, '')
  //     }
  //   }
  // }
  
})

