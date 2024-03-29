import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { wrapperEnv } from "./src/utils/getEnv";
import { visualizer } from "rollup-plugin-visualizer";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import viteCompression from "vite-plugin-compression";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
// import eslintPlugin from "vite-plugin-eslint";
import vueJsx from "@vitejs/plugin-vue-jsx";
import importToCDN from "vite-plugin-cdn-import";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite"; // 自定义组件自动引入插件
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import dayjs from "dayjs";
import pkg from "./package.json";
const { dependencies, devDependencies, name, version } = pkg;
// 最后一次打包时间
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
};

// @see: https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  const viteEnv = wrapperEnv(env);
  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
      }
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/var.scss";`
        }
      }
    },
    server: {
      // 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
      host: "0.0.0.0",
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      hmr: true,
      cors: true,
      // 跨域代理配置
      proxy: {
        [viteEnv.VITE_BASE_API]: {
          // target: "https://gitee.com", // easymock
          // target: "http://10.4.5.40:9111/bjxh", // yhw
          // target: "http://10.4.4.133:9111/bjxh", // pp
          // target: "http://10.1.35.207:8180/admin", //
          // target: "http://10.1.61.13:9501/admin/api",
          // target: "http://10.1.61.13:9501/adminLn/test/api",
          target: "http://xm-frontadmin-ln-v1-6-2.ebapp-xinmei-new.k8s.ebupt.com/test/api/adminLnK8stestv2-10-7",
          changeOrigin: true,
          rewrite: path => path.replace(viteEnv.VITE_BASE_API, "")
        },
        [viteEnv.VITE_FILE_BASE_API]: {
          target: "http://10.1.61.13:9501/material/api",
          changeOrigin: true,
          rewrite: path => path.replace(viteEnv.VITE_FILE_BASE_API, "")
        }
      }
    },
    plugins: [
      vue(),
      createHtmlPlugin({
        inject: {
          data: {
            title: viteEnv.VITE_GLOB_APP_TITLE
          }
        }
      }),
      // * 使用 svg 图标
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), "src/assets/svg")],
        symbolId: "icon-[dir]-[name]"
      }),
      // * EsLint 报错信息显示在浏览器界面上
      // eslintPlugin(),
      // * vite 可以使用 jsx/tsx 语法
      vueJsx(),
      // * name 可以写在 script 标签上
      VueSetupExtend(),
      // * 是否生成包预览(分析依赖包大小,方便做优化处理)
      viteEnv.VITE_REPORT && visualizer(),
      // * gzip compress
      viteEnv.VITE_BUILD_GZIP &&
        viteCompression({
          verbose: true,
          disable: false,
          threshold: 10240,
          algorithm: "gzip",
          ext: ".gz"
        }),
      // * cdn 引入（vue按需引入会导致依赖vue的插件出现问题(列如:pinia/vuex)）
      importToCDN({
        modules: []
      }),
      // * demand import element
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
    },
    build: {
      outDir: "dist",
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: viteEnv.VITE_DROP_CONSOLE,
          drop_debugger: viteEnv.VITE_DROP_CONSOLE
        },
        format: {
          // 删除注释
          comments: false
        }
      },
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
        }
      },
      sourcemap: false
    }
  };
});
