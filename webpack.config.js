const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: "./src/App.fs.js",
  output: {
    filename: "main.js",
    path: path.join(__dirname, "dist"),
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      // https://github.com/MangelMaxime/fulma-demo/pull/43#issuecomment-756556346
      {
        test: /\.js$/,
        enforce: "pre",
        use: "source-map-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              babelrc: false,
              configFile: false,
              presets: ["@babel/preset-env", "solid"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      templateContent: ({ htmlWebpackPlugin }) =>
        `<!doctype html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width,initial-scale=1">
                <title>App</title>
                ${htmlWebpackPlugin.tags.headTags}
            </head>
            <body>
                <div id="root"></div>
                ${htmlWebpackPlugin.tags.bodyTags}
            </body>
        </html>
        `,
    }),
  ],
};

module.exports = config;
