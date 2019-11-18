/**
 * @file vue config
 */

module.exports = {
    transpileDependencies: [
        '@jumpjs/api',
        '@jumpjs/components'
    ],
    parallel: false,
    pwa: {
        include: [/\.html$/, /\.jpg$/, /\.png$/, /\.css$/, /\.js$/],
        version: '0-0-1',
        exclude: []
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'Jump demo';
                args[0].template = process.cwd() + '/public/index.html';
                return args;
            });
    }
};
