import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '国学传播平台',
  description: '传承经典，传播斯道',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '经部', link: '/经部.html' },
      { text: '史部', link: '/史部.html' },
      { text: '子部', link: '/子部.html' },
      { text: '集部', link: '/集部.html' },
      { text: '素材库', link: '/sucai/index.html' },
      { text: '专题', link: '/专题.html' },
      { text: '🔍 搜索', link: '/search.html' }
    ],
    sidebar: {
      '/经部.html': [{ text: '经部', items: [{ text: '经典释经', link: '/经部.html' }] }],
      '/史部.html': [{ text: '史部', items: [{ text: '史学典籍', link: '/史部.html' }] }],
      '/子部.html': [{ text: '子部', items: [{ text: '诸子百家', link: '/子部.html' }] }],
      '/集部.html': [{ text: '集部', items: [{ text: '诗词文赋', link: '/集部.html' }] }],
      '/专题.html': [{ text: '专题', items: [{ text: '分类导读', link: '/专题.html' }] }],
      '/sucai/index.html': [{ text: '素材库', items: [
        { text: '名句·经部', link: '/sucai/mingju/jing/论语.html' },
        { text: '名句·集部', link: '/sucai/mingju/ji/唐诗.html' },
        { text: '典故·史部', link: '/sucai/diangu/shi/史记.html' },
        { text: '典故·子部', link: '/sucai/diangu/zi/庄子.html' },
        { text: '作者名录', link: '/sucai/zuozhe/shi/史部作者.html' }
      ]}]
    }
  }
})