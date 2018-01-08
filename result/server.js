var path = require("path"),
    express = require("express"),
    request = require("request");

console.log('port', process.env.PORT);

var DIST_DIR = path.join(__dirname, "../result"),
    PORT = process.env.PORT || 3000,
    app = express();
console.log('env', process.env.NODE_ENV);
//Serving the files on the dist folder
app.use(express.static(DIST_DIR));

//Send index.html when the user access the web
app.get("/", function (req, res) {
    res.sendFile(path.join(DIST_DIR, "index.html"));
});

if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    //const webpackHotMiddleware = require('webpack-hot-middleware');
    const config = require('../webpack.config.js');
    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {
        stats: { colors: true },
        //noInfo: false,
        //lazy: false,
        headers: {
            "Access-Control-Allow-Origin": "http://localhost"
        }
        //publicPath: config.output.publicPath
    }));
    //app.use(webpackHotMiddleware(compiler));

}

app.listen(PORT, function () {
    console.log('The server is running at http://localhost:' + PORT);
});