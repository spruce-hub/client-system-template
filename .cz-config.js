module.exports = {
  /** 提交类型
   * -------------------------- */
  types: [
    { value: 'feat', name: 'feat: 新增功能' },
    { value: 'fix', name: 'fix: 修复漏洞' },
    { value: 'refactor', name: 'refactor: 代码重构' },
    { value: 'perf', name: 'perf: 性能优化' },
    { value: 'test', name: 'test: 添加、修改单元测试' },
    { value: 'style', name: 'style: 代码格式化' },
    { value: 'chore', name: 'chore: 配置变更' },
    { value: 'build', name: 'build: 构建流程变更' },
    { value: 'ci', name: 'ci: CI 配置变更' },
    { value: 'revert', name: 'revert: 代码回滚' },
    { value: 'docs', name: 'docs: 新增、修改文档' },
  ],

  /** 提交消息
   * -------------------------- */
  messages: {
    type: '选择本次提交的类型:',
    scope: '选择本次更改影响的范围:',
    customScope: '输入自定义影响范围:',
    subject: '输入本次修改的描述:\n',
    body: '输入本次修改的详细描述,使用"|"换行(可选):\n',
    breaking: '列出重大更改(可选):\n',
    footer: '列举出所有变更的 ISSUES CLOSED(可选):\n',
    confirmCommit: '确认提交?',
  },

  subjectLimit: 100, // 字符限制
  // typePrefix: '[', // 提交类型前缀
  // typeSuffix: ']', // 提交类型后缀
  // subjectSeparator: '：', // 分隔符
  // 默认提交范围
  scopes: [
    { name: 'asset' }, // 网站资源
    { name: 'component' }, // 组件
    { name: 'composable' }, // 组合逻辑
    { name: 'layouts' }, // 布局
    { name: 'middleware' }, // 中间件
    { name: 'pages' }, // 页面
    { name: 'plugin' }, // 插件
    { name: 'public' }, // 静态资源
    { name: 'util' }, // 辅助函数
    { name: 'scss' }, // 全局样式
    { name: 'other' }, // 其他
  ],
  // 选择以下类型时覆盖默认提交范围
  scopeOverrides: {
    chore: [
      { name: 'nuxt' },
      { name: 'eslint' },
      { name: 'typescript' },
      { name: 'package' },
      { name: 'prettier' },
      { name: 'npm' },
      { name: 'cz' },
      { name: 'commitlint' },
    ],
    build: [{ name: 'script' }],
    docs: [{ name: 'README' }],
  },
  allowCustomScopes: false, // 允许自定义范围
  allowBreakingChanges: ['feat', 'fix', 'refactor'], // 需描述重大更改
  // skipQuestions: ['body', 'footer'], // 跳过
  appendBranchNameToCommitMessage: true, // 附加提交分支
  allowTicketNumber: false, // 是否允许页脚
  ticketNumberPrefix: 'TICKET-', // 页脚代码的自定义前缀
  isTicketNumberRequired: false,
  ticketNumberRegExp: '\\d{1,5}',
  breaklineChar: '|', // "|"换行,只有body 和 footer生效
  // breakPrefix: 'BREAKING CHANGE:',
  // footerPrefix : 'ISSUES CLOSED:',
  // askForBreakingChangeFirst : true,
}
