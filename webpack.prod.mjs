import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
// import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const Config = {
  mode: "production",
  entry: {
    main: {
      import: path.resolve(__dirname, "./src/index.tsx"),
    },
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[hash]-[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "ts-loader",
      },
    ],
  },

  resolve: {
    extensions: [".ts", ".js", ".tsx"],
    extensionAlias: {
      ".js": [".tsx", ".ts", ".js"],
      ".mjs": [".mts", ".mjs"],
    },
  },

  output: {
    path: path.resolve(__dirname, "dist/"),
    // publicPath: "/",//not specifying this allows it to be dynamically assigned
    filename: "[name].[fullhash:8].js",
    // sourceMapFilename: "[name].[fullhash:8].map",
    chunkFilename: "[name].[chunkhash:8].js",
  },
  optimization: {
    minimize: true,
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve("./publicProd/index.html"),
      publicPath: "",
      favicon: path.resolve("./publicProd/favicon.ico"),
      chunks: ["vendors", "main"],
      chunksSortMode: "manual",
    }),
    // new BundleAnalyzerPlugin(),
  ].filter(Boolean),
};

export default Config;
