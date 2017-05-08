const pkg = require('./package.json')

module.exports = () => ({
  plugins: [
    require('postcss-global-import')(),
    require('postcss-import')(),
    require('postcss-nesting')(),
    require('postcss-nested')(),
    require('postcss-calc')(),
    require('postcss-custom-properties')(),
    require('autoprefixer')(pkg.browsersList),
  ],
})
