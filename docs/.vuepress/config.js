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
    head: [
        ['link', 
            { rel: 'icon', href: '/icon5.png' }
            //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
        ],  
    ],
    themeConfig: {
        logo: '/icon5.png',
        subSidebar: 'auto', //子侧边栏放在页面的右侧
        //顶部导航栏   
        nav: [           
            //格式一：直接跳转，'/'为不添加路由，跳转至首页
            { text: '首页', link: '/' },    
            //格式二：添加下拉菜单，link指向的文件路径
            {
                text: '分类',  //默认显示        
                ariaLabel: '分类',   //用于识别的label
                items: [
                    { text: '文章', link: '/pages/folder1/compress.md' },  
                    //点击标签会跳转至link的markdown文件生成的页面
                    { text: '琐碎', link: '/pages/folder2/test4.md' },
                ]
            },
            { text: '功能演示', link: '/pages/folder1/test3.md' },
            //格式三：跳转至外部网页，需http/https前缀
            { text: 'Github', link: 'https://github.com/bill-yan98/' },
        ],
        //侧边导航栏：会根据当前的文件路径是否匹配侧边栏数据，自动显示/隐藏
        sidebar: {
            '/pages/folder1/':[         
                {
                    title: '性能优化',   // 一级菜单名称
                    collapsable: false, // false为默认展开菜单, 默认值true是折叠,
                    sidebarDepth: 1,    //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
                    children: [
                        ['compress.md', '图片压缩'],  //菜单名称为'子菜单1'，跳转至/pages/folder1/test1.md
                    ]
                },
                {
                    title: '地图相关',
                    collapsable: false, 
                    children: [
                        ['mapTool.md', '地理小工具']
                    ]
                }
            ],
            //...可添加多个不同的侧边栏，不同页面会根据路径显示不同的侧边栏
        }
    }
}