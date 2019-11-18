/* eslint-disable */
const target = process.env.JUMP_CLI_TARGET || 'swan';
let config = {};

// babel config for H5
if (target === 'h5') {
    config = {
        presets: [
            '@vue/app'
        ]
    };
}

module.exports = config;
