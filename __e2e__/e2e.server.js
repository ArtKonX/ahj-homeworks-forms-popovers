const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const config = require("../webpack.dev");

const options = {
  compress: true,
  historyApiFallback: true,
  hot: true,
  open: true,
  port: 9000,
  static: "./dist",
};

const compiler = webpack(config);

const server = new WebpackDevServer(options, compiler);

server.startCallback(() => {
  console.log(`dev server listening on port ${options.port}`);
});
