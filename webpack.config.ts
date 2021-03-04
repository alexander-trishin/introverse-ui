import path from 'path';
import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

import { getWebpackResolveAlias } from './config';

const createWebpackConfiguration = (): webpack.Configuration => {
    const isDevelopment = process.env.NODE_ENV !== 'production';

    return {
        bail: !isDevelopment,
        mode: isDevelopment ? 'development' : 'production',
        target: isDevelopment ? 'web' : 'browserslist',
        devtool: isDevelopment ? 'eval' : 'source-map',
        entry: {
            app: [path.resolve(__dirname, 'src', 'index.tsx')]
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                plugins: isDevelopment ? ['react-refresh/babel'] : []
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html')
            }),
            ...(isDevelopment ? [new ReactRefreshWebpackPlugin()] : [])
        ],
        resolve: {
            alias: getWebpackResolveAlias(__dirname),
            extensions: ['.ts', '.tsx', '.js'],
            modules: [path.resolve('./src'), path.resolve('./node_modules')]
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: isDevelopment ? '[name].bundle.js' : '[name].[contenthash].bundle.js'
        },
        devServer: {
            compress: true,
            hot: true,
            port: 3000,
            open: true
        }
    };
};

export default createWebpackConfiguration;
