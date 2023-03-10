const image = require('@rollup/plugin-image')

module.exports = (config) => {
  return {
    ...config,
    // 必要时使用，当模块需要打包且不得不使用img时
    plugins: [image(), ...config.plugins]
    // plugins: [...config.plugins]
  }
}
