const path = require('path');

module.exports.getPath = (...paths) => path.join(path.dirname(require.main.filename), ...paths);