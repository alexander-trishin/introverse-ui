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
    const isProduction = process.env.NODE_ENV === 'production';

    return {
        bail: isProduction,
        mode: isProduction ? 'production' : 'development',
        target: isProduction ? 'browserslist' : 'web',
        devtool: isProduction ? 'source-map' : 'eval',
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
                                babelrc: true,
                                plugins: isProduction ? [] : ['react-refresh/babel'],
                                cacheDirectory: !isProduction,
                                cacheCompression: true,
                                compact: isProduction
                            }
                        },
                        {
                            test: /\.(js|mjs)$/,
                            loader: 'babel-loader',
                            options: {
                                babelrc: true,
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
                                isProduction
                                    ? {
                                          loader: MiniCssExtractPlugin.loader,
                                          options: paths.publicUrlOrPath.startsWith('.')
                                              ? { publicPath: '../../' }
                                              : {}
                                      }
                                    : 'style-loader',
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
                ...(isProduction
                    ? {
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
                      }
                    : {})
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
            ...(isProduction
                ? [
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
                  ]
                : [new ReactRefreshWebpackPlugin()])
        ],
        resolve: {
            alias: getWebpackResolveAlias(paths.base),
            extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
            modules: [paths.src, paths.nodeModules]
        },
        output: {
            publicPath: paths.publicUrlOrPath,
            path: paths.build,
            pathinfo: !isProduction,
            filename: isProduction
                ? 'static/js/[name].[contenthash:8].js'
                : 'static/js/[name].bundle.js',
            chunkFilename: isProduction
                ? 'static/js/[name].[contenthash:8].chunk.js'
                : 'static/js/[name].chunk.js'
        },
        optimization: {
            minimize: isProduction,
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    styles: {
                        name: 'styles',
                        test: /\.css$/,
                        chunks: 'all',
                        enforce: true
                    },
                    vendor: {
                        test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|)[\\/]/,
                        name: 'react-vendor',
                        chunks: 'all',
                        reuseExistingChunk: true
                    }
                }
            },
            runtimeChunk: {
                name: (entrypoint: EntryObject) => `runtime-${entrypoint.name}`
            }
        },
        devServer: {
            contentBase: paths.public,
            contentBasePublicPath: paths.publicUrlOrPath,
            publicPath: paths.publicUrlOrPath.slice(0, -1),
            historyApiFallback: {
                disableDotRule: true,
                index: paths.publicUrlOrPath
            },
            compress: true,
            hot: true,
            port: 3000,
            open: true
        }
    };
};

export default createWebpackConfiguration;
