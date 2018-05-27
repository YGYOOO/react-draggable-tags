const path = require('path');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'lib'),
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
        'style-loader',
        'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'less-loader' // compiles Less to CSS
        }]
      },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  },
};


// module.exports = {
//   entry: './example/index.js',
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'example'),
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: [
//         'style-loader',
//         'css-loader'
//         ]
//       },
//       {
//         test: /\.less$/,
//         use: [{
//           loader: 'style-loader' // creates style nodes from JS strings
//         }, {
//           loader: 'css-loader' // translates CSS into CommonJS
//         }, {
//           loader: 'less-loader' // compiles Less to CSS
//         }]
//       },
//       { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
//       {
//         test: /\.(png|jpg|gif)$/,
//         use: [
//           {
//             loader: 'url-loader',
//             options: {
//               limit: 8192
//             }
//           }
//         ]
//       }
//     ]
//   },
//   // plugins: [
//   //   new UglifyJsPlugin({
//   //     uglifyOptions: {
//   //       safari10: true,
//   //     }
//   //   }),
//   // ],
//   devServer: {
//     contentBase: path.join(__dirname, "example"),
//     compress: true,
//     port: 9000
//   }
// };