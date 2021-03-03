import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

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
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html')
            }),
            ...(isDevelopment ? [new ReactRefreshWebpackPlugin()] : [])
        ],
        resolve: {
            alias: {
                app: path.resolve(__dirname, 'src', 'app')
            },
            extensions: ['.ts', '.tsx', '.js'],
            modules: [path.resolve('./src'), path.resolve('./node_modules')]
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: isDevelopment ? '[name].bundle.js' : '[name].[contenthash].bundle.js'
        },
        devServer: {
            hot: true,
            port: 3000,
            open: true
        }
    };
};

export default createWebpackConfiguration;