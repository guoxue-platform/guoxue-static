import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '国学传播平台',
  description: '传承经典，传播斯道',
  base: '/guoxue-static/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '经部', link: '/经部/' },
      { text: '史部', link: '/史部/' },
      { text: '子部', link: '/子部/' },
      { text: '集部', link: '/集部/' },
      { text: '素材库', link: '/sucai/' },
      { text: '专题', link: '/专题/' },
      { text: '🔍 搜索', link: '/search.html' }
    ],
    sidebar: {
      '/经部/': [{ text: '经部 · 儒家经典', items: [
        { text: '诗经名句', link: '/经部/#诗经名句' },
        { text: '论语名句', link: '/经部/#论语名句' },
        { text: '尚书名句', link: '/经部/#尚书名句' },
        { text: '礼记名句', link: '/经部/#礼记名句' },
        { text: '周易名句', link: '/经部/#周易名句' },
        { text: '孟子名句', link: '/经部/#孟子名句' },
        { text: '左传典故', link: '/经部/#左传典故' }
      ]}],
      '/史部/': [{ text: '史部 · 史学典籍', items: [
        { text: '史记典故', link: '/史部/#史记典故' },
        { text: '资治通鉴典故', link: '/史部/#资治通鉴典故' }
      ]}],
      '/子部/': [{ text: '子部 · 诸子百家', items: [
        { text: '庄子典故', link: '/子部/#庄子典故' },
        { text: '韩非子典故', link: '/子部/#韩非子典故' }
      ]}],
      '/集部/': [{ text: '集部 · 诗词文赋', items: [
        { text: '唐诗名句', link: '/集部/#唐诗名句' },
        { text: '宋词名句', link: '/集部/#宋词名句' },
        { text: '楚辞名句', link: '/集部/#楚辞名句' },
        { text: '唐宋典故', link: '/集部/#唐宋典故' }
      ]}],
      '/sucai/': [{ text: '素材库', items: [
        { text: '名句·经部', link: '/sucai/mingju/jing/' },
        { text: '名句·集部', link: '/sucai/mingju/ji/' },
        { text: '典故·史部', link: '/sucai/diangu/shi/' },
        { text: '典故·子部', link: '/sucai/diangu/zi/' },
        { text: '作者名录', link: '/sucai/zuozhe/' }
      ]}],
      '/专题/': [{ text: '专题', items: [
        { text: '分类导读', link: '/专题/' }
      ]}]
    }
  }
})
