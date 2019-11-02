const driver = require('bigchaindb-driver');
const config = require('../../config/environment');


function createConnection() {
  return new driver.Connection(config.bigchaindb.apiPath);
}

module.exports = createConnection;
