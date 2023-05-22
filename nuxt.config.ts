import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  app: {
    head: {
      title: '项目名称',
      htmlAttrs: {
        lang: 'zh-cn',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { hid: 'description', name: 'description', content: '项目名称' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      script: [],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  css: ['@/assets/scss/base.scss'],
  modules: ['@element-plus/nuxt', '@spruce-hub/nuxt-fetch'],
  components: [
    {
      path: '~/components/',
      pathPrefix: false, // 取消了根据文件路劲导入组件
    },
  ],
  elementPlus: {
    importStyle: 'scss',
  },
  devServer: {
    port: 3000,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/element-variable.scss";',
        },
      },
    },
  },
  runtimeConfig: {
    nuxtFetch: {
      // 需要代理的路由前缀
      baseApi: '/api',
      // 目标服务地址
      apiHostUrl: 'https://lsapi.online.dev.fyunshan.com',
      apiHostEnv: 'API_HOST',
      // 从 cookie 中获取名为 access_token 的值并写入请求头 Authorization 中
      authorization: 'access_token',
    },
  },
  nuxtRoute: {
    // 需要鉴权的路由
    authPath: ['/presonal/*', '/product/**'],
    // 登录页面的路由
    loginPath: '/login',
    // 记录 token 的 cookie name
    tokenName: 'access_token',
    // 登录成功之后不可重定向至以下路由，
    excludePath: ['/login', '/register'],
  },
  postcss: {
    plugins: {},
  },
})
