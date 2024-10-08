/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js

const ESLintPlugin = require('eslint-webpack-plugin')
const { configure } = require('quasar/wrappers')

const CompressionPlugin = require('compression-webpack-plugin')
const zlib = require('zlib')

// const routesPaths = {
//   IndexPage: '',
//   SelectionPage: 'selection',
//   StatusCheckPage: 'statuscheck',
//   OPSearchPage: 'opcheck',
//   NoticeSearchPage: 'noticecheck',
//   PermitSearchPage: 'permitcheck',
//   ListDailyReceivedPage: 'receivedlist',
//   NameCheckPage: 'namecheck',
//   ListApprovedPage: 'approvedlist',
//   BlankPage: 'blank',
//   HelpIndexPage: 'helpindex',
//   ApplicationHelpPage: 'helpapplication',
//   NameHelpPage: 'helpname',
//   StatusSearchLoading: 'statussearch',
//   NameSearchLoading: 'namesearch',
//   OPSearchLoading: 'opsearch',
//   ListGenerateLoading: 'listgenerate',
//   NoticeSearchLoading: 'noticesearch',
//   PermitSearchLoading: 'permitsearch',
//   ListGenerateApproveLoading: 'listgenerateapprove',
//   ListGenerateDailyReceivedLoading: 'listgeneratereceived',
//   SearchErrorPage: 'searcherror',
//   StatusCheckErrorPage: 'statuserror',
//   ErrorPage: 'error',
//   NoConnectionPage: 'noconnection',
//   PinCodePage: 'pincode',
// }

// const routes = Object.values(routesPaths).map((route) => {
//   return `/${route}`
// })

module.exports = configure(function (ctx) {
  return {
    // https://v2.quasar.dev/quasar-cli-webpack/supporting-ts
    supportTS: false,

    // https://v2.quasar.dev/quasar-cli-webpack/prefetch-feature
    preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-webpack/boot-files
    boot: ['axios'],

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-css
    css: ['app.sass'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      // 'fontawesome-v6',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-build
    build: {
      vueRouterMode: 'hash', // available values: 'hash', 'history'

      env: require('dotenv').config().parsed,

      // transpile: false,
      // publicPath: '/',

      // Add dependencies for transpiling with Babel (Array of string/regex)
      // (from node_modules, which are by default not transpiled).
      // Applies only if "transpile" is set to true.
      // transpileDependencies: [],

      // rtl: true, // https://quasar.dev/options/rtl-support
      preloadChunks: true,
      // showProgress: false,
      // gzip: true,
      // analyze: true,

      // Options below are automatically set depending on the env, set them if you want to override
      // extractCSS: false,

      uglifyOptions: {
        compress: { drop_console: true },
      },

      // https://v2.quasar.dev/quasar-cli-webpack/handling-webpack
      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain

      chainWebpack(chain) {
        chain.module
          .rule('pug')
          .test(/\.pug$/)
          .use('pug-plain-loader')
          .loader('pug-plain-loader')

        chain.plugin('eslint-webpack-plugin').use(ESLintPlugin, [{ extensions: ['js', 'vue'] }])

        if (!ctx.dev && !ctx.debug) {
          chain.plugin('compression-webpack-plugin').use(CompressionPlugin, [
            {
              filename: '[path][base].br',
              algorithm: 'brotliCompress',
              test: /\.(js|css|html|svg)$/,
              compressionOptions: {
                params: {
                  [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
                },
              },
              threshold: 10240,
              minRatio: 0.8,
              deleteOriginalAssets: false,
            },
          ])
        }
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-devServer
    devServer: {
      server: {
        type: 'http',
      },
      port: 8080,
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8081/',
          changeOrigin: true,
        },
      },
    },

    // https://v2.quasar.dev/quasar-cli-webpack/quasar-config-js#Property%3A-framework
    framework: {
      config: {},

      iconSet: 'material-icons', // Quasar icon set
      lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: ['AddressbarColor', 'Dialog', 'Notify', 'SessionStorage'],
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [],

    // ssg: { routes },
    // build: {
    //   env: {
    //     ROUTES_PATHS: routesPaths
    //   },
    // },

    // https://v2.quasar.dev/quasar-cli-webpack/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,

      // pages: [
      //   'src/pages/IndexPage.vue',
      //   'src/pages/SelectionPage.vue',
      //   'src/pages/StatusCheckPage.vue',
      //   'src/pages/OPSearchPage.vue',
      //   'src/pages/NoticeSearchPage.vue',
      //   'src/pages/PermitSearchPage.vue',
      //   'src/pages/ListDailyReceivedPage.vue',
      //   'src/pages/NameCheckPage.vue',
      //   'src/pages/ListApprovedPage.vue',
      //   'src/pages/BlankPage.vue',
      //   'src/pages/HelpIndexPage.vue',
      //   'src/pages/helps/ApplicationHelpPage.vue',
      //   'src/pages/helps/NameHelpPage.vue',
      //   'src/pages/loadings/StatusSearchLoading.vue',
      //   'src/pages/loadings/NameSearchLoading.vue',
      //   'src/pages/loadings/OPSearchLoading.vue',
      //   'src/pages/loadings/ListGenerateLoading.vue',
      //   'src/pages/loadings/NoticeSearchLoading.vue',
      //   'src/pages/loadings/PermitSearchLoading.vue',
      //   'src/pages/loadings/ListGenerateApproveLoading.vue',
      //   'src/pages/loadings/ListGenerateDailyReceivedLoading.vue',
      //   'src/pages/errors/SearchErrorPage.vue',
      //   'src/pages/errors/StatusCheckErrorPage.vue',
      //   'src/pages/errors/ErrorPage.vue',
      //   'src/pages/NoConnectionPage.vue',
      //   'src/pages/PinCodePage.vue',
      // ],
      // ssr: true,

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: 3000, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      maxAge: 1000 * 60 * 60 * 24 * 30,
      // Tell browser when a file from the server should expire from cache (in ms)

      chainWebpackWebserver(chain) {
        chain.plugin('eslint-webpack-plugin').use(ESLintPlugin, [{ extensions: ['js'] }])
      },

      middlewares: [
        ctx.prod ? 'compression' : '',
        'render', // keep this as last one
      ],
    },

    // https://v2.quasar.dev/quasar-cli-webpack/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW

      // for the custom service worker ONLY (/src-pwa/custom-service-worker.[js|ts])
      // if using workbox in InjectManifest mode

      chainWebpackCustomSW(chain) {
        chain.plugin('eslint-webpack-plugin').use(ESLintPlugin, [{ extensions: ['js'] }])
      },

      manifest: {
        name: `Quasar App`,
        short_name: `Quasar App`,
        description: `A Quasar Project`,
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-webpack/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'inquiry-2',
      },

      // "chain" is a webpack-chain object https://github.com/neutrinojs/webpack-chain

      chainWebpackMain(chain) {
        chain.plugin('eslint-webpack-plugin').use(ESLintPlugin, [{ extensions: ['js'] }])
      },

      chainWebpackPreload(chain) {
        chain.plugin('eslint-webpack-plugin').use(ESLintPlugin, [{ extensions: ['js'] }])
      },
    },
  }
})
