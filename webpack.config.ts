import path from 'path';

import webpack, { EntryObject } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
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
            parser: {
                javascript: {
                    strictExportPresence: true
                }
            },
            rules: [
                {
                    oneOf: [
                        {
                            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                name: 'static/media/[name].[hash:8].[ext]'
                            }
                        },
                        {
                            test: /\.tsx?$/,
                            include: path.resolve(__dirname, 'src'),
                            loader: 'babel-loader',
                            options: {
                                plugins: [
                                    [
                                        'babel-plugin-named-asset-import',
                                        {
                                            loaderMap: {
                                                svg: {
                                                    Svg:
                                                        '@svgr/webpack?-svgo,+titleProp,+ref![path]'
                                                }
                                            }
                                        }
                                    ],
                                    ...(isDevelopment ? ['react-refresh/babel'] : [])
                                ],
                                cacheDirectory: isDevelopment,
                                cacheCompression: !isDevelopment,
                                compact: !isDevelopment
                            }
                        },
                        {
                            test: /\.(js|mjs)$/,
                            exclude: /@babel(?:\/|\\{1,2})runtime/,
                            loader: 'babel-loader',
                            options: {
                                compact: false,
                                cacheDirectory: true,
                                cacheCompression: false,
                                sourceMaps: true,
                                inputSourceMap: true
                            }
                        },
                        {
                            test: /\.(sass|scss)$/,
                            use: [
                                {
                                    loader: isDevelopment
                                        ? 'style-loader'
                                        : MiniCssExtractPlugin.loader
                                },
                                {
                                    loader: 'css-loader',
                                    options: {
                                        importLoaders: 3,
                                        sourceMap: true
                                    }
                                },
                                {
                                    loader: 'postcss-loader',
                                    options: {
                                        postcssOptions: {
                                            plugins: [
                                                'postcss-flexbugs-fixes',
                                                [
                                                    'postcss-preset-env',
                                                    {
                                                        autoprefixer: {
                                                            flexbox: 'no-2009'
                                                        },
                                                        stage: 3
                                                    }
                                                ]
                                            ]
                                        },
                                        sourceMap: true
                                    }
                                },
                                {
                                    loader: 'resolve-url-loader',
                                    options: {
                                        root: path.resolve(__dirname, 'src'),
                                        sourceMap: true
                                    }
                                },
                                {
                                    loader: 'sass-loader',
                                    options: {
                                        sourceMap: true
                                    }
                                }
                            ]
                        },
                        {
                            loader: 'file-loader',
                            exclude: [/\.(ts|tsx)$/, /\.html$/, /\.json$/],
                            options: {
                                name: 'static/media/[name].[hash:8].[ext]'
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
            ...(isDevelopment
                ? [new ReactRefreshWebpackPlugin()]
                : [
                      new MiniCssExtractPlugin({
                          filename: '[name].[contenthash].css'
                      })
                  ])
        ],
        resolve: {
            alias: getWebpackResolveAlias(__dirname),
            extensions: [
                '.ts',
                '.tsx',
                '.js',
                '.sass',
                '.scss',
                '.json',
                '.bmp',
                '.gif',
                '.png',
                '.jpg',
                '.jpeg'
            ],
            modules: [path.resolve('./src'), path.resolve('./node_modules')]
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            pathinfo: isDevelopment,
            filename: isDevelopment
                ? 'static/js/[name].bundle.js'
                : 'static/js/[name].[contenthash:8].js',
            chunkFilename: isDevelopment
                ? 'static/js/[name].chunk.js'
                : 'static/js/[name].[contenthash:8].chunk.js'
        },
        optimization: {
            minimize: !isDevelopment,
            splitChunks: {
                chunks: 'all'
            },
            runtimeChunk: {
                name: (entrypoint: EntryObject) => `runtime-${entrypoint.name}`
            }
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
