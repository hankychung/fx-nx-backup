const withCSS = require('@zeit/next-css')
const withImages = require('next-images')
const path = require('path')

module.exports = withImages(
  withCSS({
    webpack(config, { isServer }) {
      // 如果是服务端渲染，则直接返回配置
      if (isServer) {
        return config
      }

      // 获取 landing 目录的绝对路径
      const landingPath = path.join(__dirname, 'landing')

      // 将 landing 目录下的 CSS 文件使用 postcss-px-to-viewport 插件进行转换
      config.module.rules.push({
        test: /\.css$/,
        include: landingPath,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [require('postcss-px-to-viewport')()]
            }
          }
        ]
      })

      return config
    }
  })
)
