const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');
const namespace = 'jizhang';
const dev = process.env.NODE_ENV === 'development';
const cndPrefix = dev ? '/' : 'http://concat-static.cdn.bcebos.com/'; // 'http://concat-static.bj.bcebos.com/'
module.exports = {
    entry: {
        app: './src/index.js'
    },
    target: 'web',
    output: {
        filename: `public/${namespace}/js/[name].[contenthash].js`,
        path: path.join(__dirname, 'dist'),
        publicPath: cndPrefix
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, 'src')
        }
    },
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }, {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'style-loader',
                    'css-loader'
                ]
            }, {
                test: /\.styl(us)?$/,
                use: [
                    'vue-style-loader',
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            }, {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: `public/${namespace}/img/[name].[ext]`
                        },
                    },
                ],
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: `public/${namespace}/font/[name].[ext]`
                        },
                    },
                ],
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        host: '0.0.0.0',
        port: 9000,
        hot: true,
        open: true,
        openPage: 'view/jizhang/index.html',
        proxy: {
            '/interface': 'http://106.12.173.158:7001'
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.tpl',
            filename: `view/${namespace}/index.${dev ? 'html' : 'tpl'}`
        })
    ],
    optimization: {
        runtimeChunk: {
            name: entry => `runtime~${entry.name}`
        }
    }
}