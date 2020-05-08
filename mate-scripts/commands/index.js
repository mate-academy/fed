'use strict';

module.exports = {
  ...require('./init'),
  ...require('./start'),
  ...require('./build'),
  ...require('./deploy'),
  ...require('./lint'),
  ...require('./test'),
};
