const path = require('path')
const HardSourcePlugin = require('hard-source-webpack-plugin')
const htmlStandards = require('reshape-standard')
// const cssStandards = require('spike-css-standards')
const jsStandards = require('babel-preset-latest')
const pageId = require('spike-page-id')

// additional postcss plugins
const ant = require('postcss-ant')

module.exports = {
  devtool: 'source-map',
  matchers: {
    html: '*(**/)*.sgr',
    css: '*(**/)*.css'
  },
  ignore: ['**/layout.sgr', '**/_*', '**/.*', '_cache/**', 'readme.md', 'css_modules'],
  reshape: (ctx) => {
    return htmlStandards({
      webpack: ctx,
      locals: { pageId: pageId(ctx), foo: 'bar' }
    })
  },
  postcss: (ctx) => {
    // const css = cssStandards({ parser: false, webpack: ctx })
    const css = {
      parser: false,
      webpack: ctx,
      plugins: []
    }
    css.plugins.push(require('postcss-import')({
      root: ctx.resourcePath,
      addDependencyTo: ctx,
      path: [ path.resolve(path.join(__dirname, 'assets/css/css_modules')) ]
    }))
    css.plugins.push(require('postcss-cssnext')({
      warnForDuplicates: true
    }))
    css.plugins.push(require('rucksack-css')())
    css.plugins.push(ant())
    // css.plugins.push(require('cssnano')())
    return css
  },
  babel: { presets: [jsStandards] },
  plugins: [
    new HardSourcePlugin({
      environmentPaths: { root: __dirname },
      recordsPath: path.join(__dirname, '_cache/records.json'),
      cacheDirectory: path.join(__dirname, '_cache/hard_source_cache')
    })
  ]
}
