import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  app: {
    head: {
      title: '雷士照明',
      htmlAttrs: {
        lang: 'zh-cn',
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        { hid: 'description', name: 'description', content: '雷士照明' },
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
    plugins: {
      'postcss-pxtorem': {
        rootValue: 10, // 指定转换倍率，现在设置这个表示1rem=10px;
        propList: ['*'], // 属性列表，表示你要把哪些css属性的px转换成rem，这个*表示所有
        mediaQuery: false, // 是否允许使用媒体查询，false媒体查询的代码可用，true不可用
        exclude: /node_modules/,
        replace: true, // 替换包含rem的规则，而不是添加回退
        minPixelValue: 2, // 需要转换的最小值
        unitPrecision: 5, // 转换成rem单位的小数点后的保留位数
        selectorBlackList: ['html', 'f-1', 'f-2', 'el-'], // 匹配不被转换为rem的选择器
      },
    },
  },
})
