const createEMG = require('./createEMG');
const getEMG = require('./getEMG');

class User {
  constructor(connection, keypair) {
    this.keypair = keypair;
    this.connection = connection;
  }

  addEMG(emg) {
    return createEMG(this.connection, this.keypair, emg);
  }

  getEMG(id) {
    return getEMG(this.connection, id);
  }
}

module.exports = User;
