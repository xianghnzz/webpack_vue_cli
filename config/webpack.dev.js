const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    // 入口文件
    entry: './src/main.js',
    // 出口文件
    output: {
        // path: path.resolve(__dirname, '../dist'), // 开发模式实在内存中编译没有输出可省略
        path: undefined,
        filename: "static/js/index.js",
        clean: true
    },
    // 加载器
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                    ],
                                ],
                            },
                        },
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    // options: {
                    //     presets: ['@babel/preset-env']
                    // }
                }
            },
            {
                test: /\.(png|jpe?g|svg|webp|gif)/,
                type: 'asset',
                generator: {
                    filename: 'static/image/[hash:10][ext][query]'
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 50 * 1024
                    }
                }
            },
            {
                test: /\.(woff2|woff|ttf)/,
                type: 'asset/resource',
                generator: {
                    filename: 'static/font/[hash:10][ext][query]'
                },
            },
        ]
    },
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'static/css/style.css'
        }),
        new ESLintPlugin({
            context: path.resolve(__dirname, 'src')
        })
    ],
    // 模式
    mode: 'development',
    // 开发服务
    devServer: {
        host: 'localhost',
        port: 8080,
        open: true
    },
    devtool: 'cheap-module-source-map'
}