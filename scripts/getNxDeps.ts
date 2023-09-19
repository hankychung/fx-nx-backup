const config = require('../tsconfig.base.json')

const deps = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  ...Object.keys(config.compilerOptions.paths)
]

export { deps }
