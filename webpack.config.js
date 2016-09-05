let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let path = require('path')

module.exports = {
    entry: './src/entry.js',
    output: {
        path: './public/dist/scripts',
        filename: '[chunkhash].js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: require.resolve('jquery'),
                loader: 'expose?$!expose?jQuery'
            },
            {
                test: require.resolve('socket.io-client'),
                loader: 'expose?io'
            }
        ]
    }
}

module.exports.plugins = [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        comments: false
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    function () {
        // this.plugin("done", function (stats) {
        //     let hashedFileName = stats.assetsByChunkName.main
        //     console.log(hashedFileName)
        //     require('fs').OpenFileSync(
        //         path.join(__dirname, 'server/views', 'index.jade'),
        //         (err, stream)
        //     )
        // })
        this.plugin('done', function (stats) {
            require('fs').writeFileSync(
                path.join(__dirname, 'server', 'hashBundleInfo.json'),
                JSON.stringify(stats.toJson()))
        })
    }
]