/*
 * @Author: wanghui wanghui@flyele.net
 * @Date: 2023-04-01 17:43:41
 * @LastEditors: wanghui wanghui@flyele.net
 * @LastEditTime: 2023-07-20 15:33:17
 * @FilePath: /fx-nx/apps/web/webpack.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { composePlugins, withNx } = require('@nrwl/webpack')
const { withReact } = require('@nrwl/react')

module.exports = composePlugins(withNx(), withReact(), (config) => {
  config.resolve.fallback = { crypto: false, path: false, fs: false }
  return config
})
