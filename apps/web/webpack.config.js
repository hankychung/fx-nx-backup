const { composePlugins, withNx } = require('@nrwl/webpack')
const { withReact } = require('@nrwl/react')
const CopyPlugin = require('copy-webpack-plugin')

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`

  config.resolve.fallback = { crypto: false, path: false, fs: false }

  config.plugins.push(
    new CopyPlugin({
      patterns: [
        {
          from: __dirname + '/src/sw',
          to: '.'
        }
      ]
    })
  )

  return config
})
