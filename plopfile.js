const generator = require('./dist/index').default

const defaultConfig = {}

const config = (plop) => {
  generator(plop, defaultConfig)
}

module.exports = config
