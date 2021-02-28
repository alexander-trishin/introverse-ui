import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Configuration as WebpackConfig } from 'webpack';
import type { Configuration as WebpackDevServerConfig } from 'webpack-dev-server';

interface Configuration extends WebpackConfig {
    devServer?: WebpackDevServerConfig;
}

const configuration: Configuration = {
    mode: 'production',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'introverse.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
        }),
    ],
    devServer: {
        port: 3000,
        open: true        
    }
};

export default configuration;
