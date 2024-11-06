import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'development',
  entry: './src/index.ts',
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 9001,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.worker\.ts$/,
        loader: 'worker-loader',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: 'lit-css-loader',
        options: {
          import: 'lit', // defaults to lit-element
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  output: {
    filename: 'mgnify-sourmash-component.js',
    module: true,
    library: { type: "module" },
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
      /*
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html'),
      title: 'MGnify Sourmash Component - EBI',
    }),
    */
    new webpack.ProvidePlugin({
      util: 'util',
    }),
  ],
  experiments: {
    syncWebAssembly: true,
    outputModule: true,
  },
};
