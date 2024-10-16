const { composePlugins, withNx } = require('@nx/webpack')
const path = require('path')
module.exports = composePlugins(
  withNx({
    compiler: 'tsc',
    target: 'node',
  }),
  config => {
    config.output.devtoolModuleFilenameTemplate = function (info) {
      const rel = path.relative(process.cwd(), info.absoluteResourcePath)
      return `webpack:///./${rel}`
    }
    return config
  }
)
