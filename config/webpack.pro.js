const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    // 入口文件
    entry: './src/main.js',
    // 出口文件
    output: {
        path: path.resolve(__dirname, '../dist'),
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
                    options: {
                        presets: ['@babel/preset-env']
                    }
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
    // 优化（css压缩等）
    optimization: {
        minimizer: [
            `...`, // 注意需要加上扩展符,不然影响 js压缩
            new CssMinimizerPlugin()
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
        // new CssMinimizerPlugin()  也可以在这里开启css压缩
        new ESLintPlugin({
            context: path.resolve(__dirname, 'src')
        })
    ],
    // 模式
    mode: 'production',
    devtool: 'source-map'
}