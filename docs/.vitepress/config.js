import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '国学传播平台',
  description: '传承经典，传播斯道',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '经部', link: '/经部/' },
      { text: '史部', link: '/史部/' },
      { text: '子部', link: '/子部/' },
      { text: '集部', link: '/集部/' },
      { text: '专题', link: '/专题/' }
    ],
    sidebar: {
      '/经部/': [{ text: '经部', items: [{ text: '经典释经', link: '/经部/' }] }],
      '/史部/': [{ text: '史部', items: [{ text: '史学典籍', link: '/史部/' }] }],
      '/子部/': [{ text: '子部', items: [{ text: '诸子百家', link: '/子部/' }] }],
      '/集部/': [{ text: '集部', items: [{ text: '诗词文赋', link: '/集部/' }] }],
      '/专题/': [{ text: '专题', items: [{ text: '分类导读', link: '/专题/' }] }]
    }
  }
})