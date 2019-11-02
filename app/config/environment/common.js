const packageInfo = require('../../../package.json');

module.exports = {
  host: 'localhost',
  port: 7070,

  bigchaindb: {
    apiPath: 'http://localhost:9984/api/v1/'
  },

  logger: {
    name: packageInfo.name,
    streams: [{
      type: 'stream',
      stream: process.stdout,
      level: 'debug',
    }],
  },
};
