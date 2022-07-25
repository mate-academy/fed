const injectDevServer = require('@cypress/react/plugins/react-scripts');
const {
  addMatchImageSnapshotPlugin,
} = require('cypress-image-snapshot/plugin');

module.exports = (on, config) => {
  addMatchImageSnapshotPlugin(on, config);
  injectDevServer(on, config);

  return config;
};
