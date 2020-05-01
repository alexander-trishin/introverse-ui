const path = require('path');

module.exports = {
    webpack: {
        alias: {
            containers: path.join(path.resolve(__dirname, 'src/containers')),
            pages: path.join(path.resolve(__dirname, 'src/pages')),
            utils: path.join(path.resolve(__dirname, 'src/utils')),
        },
    },
    jest: {
        configure: {
            moduleNameMapper: {
                '^containers(.*)$': '<rootDir>/src/containers$1',
                '^pages(.*)$': '<rootDir>/src/pages$1',
                '^utils(.*)$': '<rootDir>/src/utils$1',
            },
        },
    },
};
