const driver = require('bigchaindb-driver');


function getEMG(connection, id) {
  return connection.getTransaction(id);
}


module.exports = getEMG;
