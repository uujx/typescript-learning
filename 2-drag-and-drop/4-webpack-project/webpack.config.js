const path = require('path')

module.exports = {
  entry: './src/app.ts',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'dist'
  },

  mode: 'development',

  devtool: 'inline-source-map',

  devServer: {
    port: 3000,
    hot: true
  },

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
  }
}
