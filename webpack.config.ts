import webpack, { DefinePlugin, EntryObject } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import InterpolateHtmlWebpackPlugin from 'interpolate-html-plugin';
import { WebpackManifestPlugin as ManifestWebpackPlugin } from 'webpack-manifest-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

import { getClientEnvironment, getWebpackResolveAlias, paths } from './config';

const createWebpackConfiguration = (): webpack.Configuration => {
    const clientEnvironment = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));
    const isDevelopment = process.env.NODE_ENV !== 'production';

    return {
        bail: !isDevelopment,
        mode: isDevelopment ? 'development' : 'production',
        target: isDevelopment ? 'web' : 'browserslist',
        devtool: isDevelopment ? 'eval' : 'source-map',
        entry: {
            main: [paths.indexTsx]
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
                            include: paths.src,
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
                                isDevelopment
                                    ? 'style-loader'
                                    : {
                                          loader: MiniCssExtractPlugin.loader,
                                          options: paths.publicUrlOrPath.startsWith('.')
                                              ? { publicPath: '../../' }
                                              : {}
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
                                        root: paths.src,
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
                inject: true,
                template: paths.indexHtml,
                ...(isDevelopment
                    ? {}
                    : {
                          minify: {
                              removeComments: true,
                              collapseWhitespace: true,
                              removeRedundantAttributes: true,
                              useShortDoctype: true,
                              removeEmptyAttributes: true,
                              removeStyleLinkTypeAttributes: true,
                              keepClosingSlash: true,
                              minifyJS: true,
                              minifyCSS: true,
                              minifyURLs: true
                          }
                      })
            }),
            new DefinePlugin({
                'process.env': Object.keys(clientEnvironment).reduce(
                    (env, key) => ({
                        ...env,
                        [key]: JSON.stringify(
                            clientEnvironment[key as keyof typeof clientEnvironment]
                        )
                    }),
                    {}
                )
            }),
            new InterpolateHtmlWebpackPlugin(clientEnvironment),
            new ManifestWebpackPlugin({
                fileName: 'asset-manifest.json',
                publicPath: paths.publicUrlOrPath,
                generate: (seed, files, entrypoints) => {
                    const manifestFiles = files.reduce(
                        (manifest, file) => ({
                            ...manifest,
                            [file.name as string]: file.path
                        }),
                        seed
                    );

                    const entrypointFiles = entrypoints.main.filter(
                        fileName => !fileName.endsWith('.map')
                    );

                    return {
                        files: manifestFiles,
                        entrypoints: entrypointFiles
                    };
                }
            }),
            ...(isDevelopment
                ? [new ReactRefreshWebpackPlugin()]
                : [
                      new MiniCssExtractPlugin({
                          filename: 'static/css/[name].[contenthash:8].css',
                          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css'
                      }),
                      new CopyWebpackPlugin({
                          patterns: [
                              {
                                  from: 'public/*',
                                  to: '[name][ext]',
                                  globOptions: {
                                      ignore: ['**/index.html']
                                  }
                              }
                          ]
                      })
                  ])
        ],
        resolve: {
            alias: getWebpackResolveAlias(paths.base),
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
            modules: [paths.src, paths.nodeModules]
        },
        output: {
            publicPath: paths.publicUrlOrPath.slice(0, -1),
            path: paths.build,
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
            contentBase: paths.public,
            contentBasePublicPath: paths.publicUrlOrPath,
            publicPath: paths.publicUrlOrPath.slice(0, -1),
            compress: true,
            hot: true,
            port: 3000,
            open: true
        }
    };
};

export default createWebpackConfiguration;
