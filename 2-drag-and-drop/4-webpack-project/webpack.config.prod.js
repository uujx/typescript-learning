const path = require('path')
const WebpackCleanPlugin = require('webpack-clean-plugin')

module.exports = {
  entry: './src/app.ts',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  mode: 'production',

  devtool: 'none',

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new WebpackCleanPlugin()
  ]
}
