import { createVuePlugin } from 'vite-plugin-vue2'
import commonjs from 'rollup-plugin-commonjs'
import externalGlobals from "rollup-plugin-external-globals";

export default {
  plugins: [ createVuePlugin() ],
  //代理跨域
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3999/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') //重定向
      }
    }
  },
  resolve: {
    // 设置路径别名
    alias: {
      '@': '/src',
      '@api': '/src/api'
    },
    // 省略扩展名
    extensions: [ '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json' ],
    // 生产环境去除console和debugger
    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        }
      },
    },
    // 小于此阈值的导入或引用资源将内联为 base64 编码， 以避免额外的 http 请求。 设置为 0 可以完全禁用此项。 4096 (4kb)
    // 阈值不要设置太大，太大解码很耗性能
    assetsInlineLimit: 4096 * 2, // 8kb
    // 配置cdn加速
    rollupOptions: {
      external: [ "axios", "moment" ],
      plugins: [
        commonjs(),
        externalGlobals({
          axios: "axios",
          moment: "moment",
        }),
      ],
    },
  },
}