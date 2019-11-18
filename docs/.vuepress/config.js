/**
 * @file vuepress config
 * @author zhangwentao <winty2013@gmail.com>
 */

module.exports = {
    base: '/Jump/',
    dest: 'docs/.vuepress/dist/Jump',
    title: 'Jump',
    description: 'Vue 驱动的多端开发框架',
    head: [
        ['link', {rel: 'icon', href: 'https://avatars2.githubusercontent.com/u/48916409?s=96&v=4'}]
    ],
    themeConfig: {
        sidebarDepth: 1,
        sidebar: {
            '/guide/': [
                'start',
                'migrate-0.3.x',
                'miniprogram',
                'vue-features',
                'platforms',
                'component',
                'API',
                'config',
                'TypeScript',
                'examples',
                'common-questions'
            ],
            '/CHANGELOGS/': [
                'api',
                'core',
                'build',
                'cli',
                'cli-template'
            ],
            '/CHANGELOGS-0.3/': [
                'core',
                'build',
                'cli',
                'cli-template'
            ]
        },
        displayAllHeaders: true,
        nav: [
            {text: '教程', link: '/guide/start'},
            {text: 'CHANGELOG', link: '/CHANGELOGS/core'},
            {text: '0.3.x CHANGELOG', link: '/CHANGELOGS-0.3/core'}
        ],
        lastUpdated: 'Last Updated',
        repo: 'max-team/Jump',
        docsDir: 'docs',
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页'
    }
};
