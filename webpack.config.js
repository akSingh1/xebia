var path = require('path');
var webpack = require('webpack');

var DIST_DIR   = path.join(__dirname, "result"),
    CLIENT_DIR = path.join(__dirname, "code");


module.exports = {
    context: CLIENT_DIR,
    //entry: './js/app.js',
    //entry: ['webpack-hot-middleware/client','./js/app.js'],
    entry: './js/app.js',
    output: {
        path: DIST_DIR,
        //publicPath:  "/",
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-0'],
                    // "env": {
                    //     // this plugin will be included only in development mode, e.g.
                    //     // if NODE_ENV (or BABEL_ENV) environment variable is not set
                    //     // or is equal to "development"
                    //     "development": {
                    //         "plugins": [
                    //             ["react-transform", {
                    //                 "transforms": [{
                    //                     "transform": "react-transform-hmr",
                    //                     "imports": ["react"],
                    //                     "locals": ["module"]
                    //                 }
                    //                 // , {
                    //                 //     // you can have many transforms, not just one
                    //                 //     "transform": "react-transform-catch-errors",
                    //                 //     "imports": ["react", "redbox-react"]
                    //                 // }
                    //                 ]
                    //             }]
                    //         ]
                    //     }
                    // }
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                warnings: false
            }
        })
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
