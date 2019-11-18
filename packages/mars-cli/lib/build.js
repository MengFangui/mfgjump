/**
 * @file 构建脚本
 * @author meixuguang
 */

/* eslint-disable fecs-no-require */
/* eslint-disable no-console */

const {error, stopSpinner} = require('@vue/cli-shared-utils');
const execa = require('execa');
const {getConfig} = require('./scripts/getConfig');

async function build(cmd) {
    const {target, buildPath, env} = getConfig(cmd);

    const {
        build,
        watch,
        clean,
        getConfig: getBuildConfig
    } = require(buildPath);

    const options = {
        target,
        env
    };
    if (!process.env.NODE_ENV) {
        process.env.NODE_ENV = 'production';
    }
    process.env.JUMP_CLI_OPTIONS = JSON.stringify(options);
    process.env.JUMP_CLI_TARGET = target;
    process.env.JUMP_CLI_ENV = env;
    // process.env.JUMP_CLI_DEST = env ? `./dist-${env}` : './dist-h5';
    process.env.JUMP_ENV_TARGET = `${target}${env ? `:${env}` : ''}`;

    const {dest, h5: h5Config} = getBuildConfig(options);
    const servePath = dest.servePath;
    // for jump-cli-service
    process.env.JUMP_PWA = !!(h5Config && h5Config.supportPWA);

    function serveH5() {
        // const child = execa('npm', ['run', 'build-dist-h5']);
        const args = ['jump-cli-service', 'build', '--path', servePath];
        console.log('[build h5]', args.join(' '));
        const child = execa('npx', args);
        child.stdout.pipe(process.stdout);
        child.stderr.pipe(process.stderr);
    }

    if (target === 'h5' && cmd.h5skip === 'jump') {
        return serveH5();
    }

    const run = cmd.watch ? watch : build;

    clean(options).once('stop', () => {
        run(options).once('stop', () => {
            console.log(`[build ${target}]`, cmd.watch ? 'watching...' : 'done!');
            if (target === 'h5' && cmd.h5skip !== 'vue') {
                serveH5();
            }
        });
    });
}

module.exports = (...args) =>
    build(...args).catch(err => {
        stopSpinner(false); // do not persist
        error(err);
        if (!process.env.VUE_CLI_TEST) {
            process.exit(1);
        }
    });
