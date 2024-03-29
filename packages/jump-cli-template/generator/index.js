/**
 * @file jump-cli-template generator
 * @author meixuguang
 */

module.exports = async (api, options) => {
    const {
        noH5,
        needPWA
    } = options;

    if (options.isDistH5) {
        api.render('./dist-h5');
        return;
    }

    api.render('./template', {
        doesCompile: api.hasPlugin('babel') || api.hasPlugin('typescript')
    });

    if (!noH5) {
        api.render('./template-h5', null, {delimiter: '$'});

        needPWA && api.render('./template-pwa', null, {delimiter: '$'});

        // 添加 h5 所需的依赖
        api.extendPackage({
            // call jump-cli-service directly not work
            // for some ENV requirements
            // scripts: {
            //     'serve-dist-h5': 'jump-cli-service serve',
            //     'build-dist-h5': 'jump-cli-service build'
            // },
            dependencies: {
                'vue': '^2.6.6',
                'vue-router': '^3.0.1',
                '@jumpjs/components': '^1.0.0',
                '@jumpjs/api': '^1.0.0'
            },
            devDependencies: {
                'atom-web-compiler': '^2.2.0',
                'atom2vue-loader': '^1.0.0',
                '@jumpjs/vue-cli-plugin-jump-web': '^0.0.9',
                // '@jumpjs/vue-cli-plugin-pwa': '^0.0.1',
                '@vue/cli-plugin-babel': '^3.0.0',
                '@vue/cli-service': '^3.5.0',
                'less': '^3.0.4',
                'less-loader': '^4.1.0',
                'vue-template-compiler': '^2.6.10'
            }
        });

        needPWA && api.extendPackage({
            devDependencies: {
                '@jumpjs/vue-cli-plugin-pwa': '^0.0.1'
            }
        });
    }

    api.extendPackage({
        scripts: {
            'serve': 'jump serve',
            'build': 'jump build',
            // 'build:swan': 'jump build',
            // 'serve:swan': 'jump serve',
            'build:h5': 'jump build -t h5',
            'serve:h5': 'jump serve -t h5',
            'build:wx': 'jump build -t wx',
            'serve:wx': 'jump serve -t wx'
        },
        devDependencies: {
            '@vue/cli': '^3.3.0',
            '@jumpjs/build': '^0.3.0',
            '@jumpjs/core': '^0.3.0'
        }
    });

    // additional tooling configurations
    if (options.configs) {
        api.extendPackage(options.configs);
    }
};
