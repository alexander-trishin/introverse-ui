const path = require('path');

module.exports = {
    webpack: {
        alias: {
            assets: path.join(path.resolve(__dirname, 'src/assets')),
            components: path.join(path.resolve(__dirname, 'src/components')),
            containers: path.join(path.resolve(__dirname, 'src/containers')),
            pages: path.join(path.resolve(__dirname, 'src/pages')),
            utils: path.join(path.resolve(__dirname, 'src/utils')),
        },
    },
    jest: {
        configure: {
            moduleNameMapper: {
                '^assets(.*)$': '<rootDir>/src/assets$1',
                '^components(.*)$': '<rootDir>/src/components$1',
                '^containers(.*)$': '<rootDir>/src/containers$1',
                '^pages(.*)$': '<rootDir>/src/pages$1',
                '^utils(.*)$': '<rootDir>/src/utils$1',
            },
        },
    },
};
