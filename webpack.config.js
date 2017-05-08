let webpack = require('webpack')
let path = require('path')
const pkg = require('./package.json')

module.exports = {
    entry: './src/entry.js',
    output: {
        path: path.resolve(__dirname, './public/dist/scripts'),
        filename: '[chunkhash].js',
    },
    module: {
        rules: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                include: [path.resolve('./src/')],
                exclude: /node_modules/,
                query: {
                    babelrc: false,
                    presets: [
                        [
                            'env',
                            {
                                targets: {
                                    browsers: pkg.browserList
                                },
                                modules: false,
                                useBuiltIns: false,
                                debug: false
                            }
                        ],
                        'es2015',
                        // 'stage-2',
                        // 'react'
                    ],
                    // plugins: [
                    //     'react-hot-loader/babel',
                    //     'transform-react-jsx-source',
                    //     'transform-react-jsx-self'
                    // ]
                }
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true,
                            modules: true,
                            localIdentName: '[name]-[local]-[hash:base64:5]',
                            minimize: false,
                            discardComments: { removeAll: true },
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: path.resolve('./postcss.config.js')
                        },
                    }
                ]
            },
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            comments: false
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        function () {
            this.plugin('done', function (stats) {
                require('fs').writeFileSync(
                    path.join(__dirname, 'server', 'hashBundleInfo.json'),
                    JSON.stringify(stats.toJson()))
            })
        }
    ]
}
