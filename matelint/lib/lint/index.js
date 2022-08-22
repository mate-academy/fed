'use script';

const { makeLinter } = require('./makeLinter');

function lint(files, config) {
  const linter = makeLinter(config);

  return files.map(({ path, content }) => ({
    path,
    errors: linter(content),
  }));
}

module.exports = {
  lint,
};
