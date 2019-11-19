/**
 * @file utils
 * @author meixuguang
 */

/* eslint-disable fecs-no-require */
const fs = require('fs-extra');

let isH5;
let version;

const dependencyList = [
    '@jumpjs/build',
    '@jumpjs/core',
    '@jumpjs/cli-template'
];
const dependencyListH5 = [
    '@jumpjs/components',
    '@jumpjs/api',
    'atom-web-compiler',
    'atom2vue-loader',
    '@jumpjs/vue-cli-plugin-jump-web'
];

const defaultConfig = {
    registry: 'https://registry.npmjs.org/'
};

function getCliVersion() {
    return version !== undefined ? version : version = require('../../package').version;
}

function isH5Project() {
    return isH5 !== undefined ? isH5 : isH5 = fs.existsSync(process.cwd() + '/vue.config.js');
}

function camelize(str) {
    return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
}

// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
function cleanArgs(cmd) {
    const args = {};
    cmd.options.forEach(o => {
        const key = camelize(o.long.replace(/^--/, ''));
        // if an option is not present and Command has a method with the same name
        // it should not be copied
        if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
            args[key] = cmd[key];
        }
    });
    return args;
}

module.exports = {
    dependencyList,
    dependencyListH5,
    getCliVersion,
    isH5Project,
    defaultConfig,
    cleanArgs
};
