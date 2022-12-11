const path = require("path");

module.exports = {
  // production:余分な半角スペースなどを取り除いてバンドルで、
  // development:ソースマップ有効でJSファイルが出力される
  mode: "development",
  // どのファイルを起点にバンドルするか
  entry: "./src/index.tsx",
  // どのディレクトリにバンドルしたファイルを出力するか
  output: {
    // 出力ファイルのディレクトリ名
    path: path.join(__dirname, "dist"),
    // 出力ファイル名
    filename: "main.js",
  },
  // Loader の設定を行う
  module: {
    rules: [
      {
        // どのタイプのファイルを変換対象とするかを文字列または正規表現で指定
        test: /\.tsx?$/,
        // どのloaderを使用するかを指定(下から処理される)
        use: [
          //   {
          //     // ECMAScript2015以降をES5に IEなどの古いブラウザに対応するため
          //     loader: "babel-loader",
          //     options: {
          //       // preset-react→preset-env
          //       presets: ["@babel/preset-env", "@babel/preset-react"],
          //     },
          //   },
          {
            // ts→jsコンパイル
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.?css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "/images/[name].[hash:7].[ext]",
            },
          },
        ],
      },
    ],
  },
  // webpack-dev-server
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3000,
  },
  // import 文で .ts や .tsx ファイルを解決するため
  resolve: {
    extensions: [".ts", ".tsx", ".js", "jsx", ".json"],
  },
  // サーバー側であればnode、ブラウザ側であれば'web'
  // ES5(IE11等)向けの指定（webpack 5以上で必要）
  target: ["web", "es5"],
};
