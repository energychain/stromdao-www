const Records = require('spike-records')
const DataSrc = require('spike-records-loaddir')
const highlightjs = require('markdown-it-highlightjs')
const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const pageId = require('spike-page-id')
const env = process.env.SPIKE_ENV

const locals = {}
const posts = new DataSrc()

module.exports = {
  devtool: 'source-map',
  ignore: [
    '**/layout.html',
    '**/_*',
    '.*/**',
    '**/.*',
    'coverage/**',
    '.nyc_output/**',
    '*.log',
    'readme.md',
    'yarn.lock',
    'package-lock.json'
  ],
  reshape: htmlStandards({
    locals: ctx => {
      locals.pageId = pageId(ctx)
      locals.foo = 'bar'
      return locals /* OLD { pageId: pageId(ctx), foo: 'bar' } */
    },
    markdownPlugins: [[highlightjs, { auto: false }]],
    minify: false // env === 'production' // => does not work because code blocks in documentation!
  }),
  plugins: [
    new Records({
      addDataTo: locals,
      blog: {
        data: posts.source('./data/articles'),
        transform: (data) => (data.sort((a, b) => {
          return (new Date(a.data.date).getTime() - new Date(b.data.date).getTime())
        }).reverse()),
        template: {
          path: './views/_templates/_article.html',
          output: function (post) {
            return `articles/${post.data._slug}.html`
          }
        }
      }
    })
  ],
  postcss: cssStandards({
    minify: env === 'production',
    warnForDuplicates: env !== 'production'
  }),
  babel: jsStandards(),
  vendor: 'assets/vendor/**'
}
