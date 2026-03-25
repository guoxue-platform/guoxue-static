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
      { text: '素材库', link: '/sucai/' },
      { text: '专题', link: '/专题.html' }
    ],
    sidebar: {
      '/经部.html': [{ text: '经部', items: [{ text: '经典释经', link: '/经部.html' }] }],
      '/史部.html': [{ text: '史部', items: [{ text: '史学典籍', link: '/史部.html' }] }],
      '/子部.html': [{ text: '子部', items: [{ text: '诸子百家', link: '/子部.html' }] }],
      '/集部.html': [{ text: '集部', items: [{ text: '诗词文赋', link: '/集部.html' }] }],
      '/专题.html': [{ text: '专题', items: [{ text: '分类导读', link: '/专题.html' }] }],
      '/sucai/': [{ text: '素材库', items: [
        { text: '名句索引', link: '/sucai/mingju/' },
        { text: '典故溯源', link: '/sucai/diangu/' },
        { text: '作者简介', link: '/sucai/zuozhe/' }
      ]}]
    }
  }
})