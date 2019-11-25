module.exports = {
  title: '八爪鱼',
  description: '八爪鱼平台前端文档',
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/docs/', // 这是部署到github相关的配置 下面会讲
  dest: './dist',
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: { //主题配置
    // 添加导航栏
    nav: [
      { text: '主页', link: '/' }, // 导航条
      { text: '组件文档', link: '/moduleMd/' },
      { text: '知识库', link: '/knowledge/' },
      {
        text: 'github',    // 这里是下拉列表展现形式。
        items: [
          { text: 'focus-outside', link: 'https://github.com/TaoXuSheng/focus-outside' },
          { text: 'stylus-converter', link: 'https://github.com/TaoXuSheng/stylus-converter' },
        ]
      }
    ],
    // 为以下路由添加侧边栏
    sidebar: {
      // 侧边栏在 /guide/ 上
      '/moduleMd/': [
        {
          title: '自定义组件',
          collapsable: false,
          children: [
            '',
            'HeadFilter',
            'BatchUploading',
            'Form'
          ]
        }
      ]
    },
    lastUpdated: 'Last Updated'
  },
  markdown: {
    // options for markdown-it-anchor
    anchor: { permalink: false },
    config: md => {
      md.use(require("markdown-it-katex"));
    }
  }
}
