# @mate-academy/browsersync-config

#### Link to documentation [Browsersync](https://www.browsersync.io/docs/options)

## Install

```bash
  npm install --save-dev @mate-academy/browsersync-config
```

## Usage

1. Create file `server.js`
1. Connect `Browsersync` to file:
    ```javascript
      const browserSync = require('browser-sync');
    ```
1. Connect module to file:
   ```javascript
     const config = require('@mate-academy/browsersync-config');
   ```
1. Add config file to browserSync:
    ```javascript
      browserSync({config});
    ```
For more information on how to install `Browsersync` and updated config file, look to the documentation.
