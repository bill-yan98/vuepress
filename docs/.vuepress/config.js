module.exports = {
    base: '/blogs/',
    title: 'bill.yan',
    description: 'bill.yan个人博客',
    theme: 'reco', //主题
    locales: {
        '/': {
          lang: 'zh-CN'
        }
    },
    themeConfig: {
        subSidebar: 'auto', //子侧边栏放在页面的右侧
        nav: [
            { text: '首页', link: '/' },
            { 
                text: 'bill.yan博客', 
                items: [
                    { text: 'Github', link: 'https://github.com/bill-yan98' },
                    // { text: '掘金', link: 'https://juejin.cn/user/712139234359182/posts' }
                ]
            }
        ],
        sidebar: [
            {
                title: '欢迎学习',
                path: '/',
                collapsable: false, // 不折叠
                children: [
                    { title: "学前必读", path: "/" }
                ]
            },
            {
              title: "基础学习",
              path: '/handbook/ConditionalTypes',
              collapsable: false, // 不折叠
              children: [
                { title: "条件类型", path: "/handbook/ConditionalTypes" },
                { title: "泛型", path: "/handbook/Generics" }
              ],
            }
        ]
    }
}