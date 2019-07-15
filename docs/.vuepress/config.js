module.exports = {
  title: 'fe-dev-playbook',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: 'https://avatars1.githubusercontent.com/u/50347314?s=200&v=4',
      },
    ],
    [
      'meta',
      {
        name: 'keywords',
        itemprop: 'keywords',
        content: '打造舒适的前端开发环境',
      },
    ],
    ['meta', {
      property: 'og:title',
      content: 'fe-dev-playbook'
    }],
    [
      'meta',
      {
        property: 'og:description',
        content: '前端开发环境',
      },
    ],
    [
      'script',
      {},
      `var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?237f09190380353b568507efa87ac4ce";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })()`,
    ],
  ],
  description: '打造舒适高效的前端开发环境',
  themeConfig: {
    nav: [{
        text: '指南',
        link: '/guide/'
      },
      {
        text: 'Github',
        link: 'https://github.com/ykfe/fe-dev-playbook'
      },
    ],
    sidebar: {
      '/guide/': [{
        collapsable: false,
        children: [
          'Shell',
          'Nodejs',
          'VSCode',
          'Git',
          'Chrome',
          'Vim',
          'Mac',
          'Linux',
          'Utils',
        ],
      }]
    }

  }
};