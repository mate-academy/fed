'use script';

module.exports = [
  require('./closing-and-opening-on-seme-level'),
]

if (process.env.__DEV__) {
  module.exports = [
    require('./closing-and-opening-on-seme-level'),
    require('./max-attrs-count-in-line'),
    require('./indents-for-attrs'),
  ]
}
