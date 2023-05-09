import path from "path";
import ReactRefreshTypeScript from "react-refresh-typescript";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isDevelopment = process.env.NODE_ENV !== "production";
const publicPath = isDevelopment ? "dist/" : "";

const Config = {
  entry: path.resolve(process.cwd(), "./src/index.tsx"),
  mode: isDevelopment ? "development" : "production",
  module: {
    rules: [
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
        // options: {},
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: "ts-loader",
            options: {
              getCustomTransformers: () => ({
                before: [isDevelopment && ReactRefreshTypeScript()].filter(
                  Boolean,
                ),
              }),
              // transpileOnly: isDevelopment,
            },
          },
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
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
    publicPath,
    filename: "bundle.js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public/"),
    },
    port: 3000,
    devMiddleware: {
      publicPath: "https://localhost:3000/dist/",
    },
    hot: "only",
    historyApiFallback: true,
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve("./publicProd/index.html"),
      publicPath: "",
      favicon: path.resolve("./publicProd/favicon.ico"),
    }),
  ].filter(Boolean),
};

export default Config;
// test
