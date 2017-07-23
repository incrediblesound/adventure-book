const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    proxy: {
      '/api/**': {
        target: 'http://localhost:8080',
        secure: false
      }
    }
  })
  .listen(3000, 'localhost', function (err, result) {
    console.log(result)
    if (err) {
      console.log(err);
    }

    console.log('Running at http://0.0.0.0:3000');
  });
