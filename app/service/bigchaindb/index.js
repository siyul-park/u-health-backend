const createConnection = require('./createConnection');
const createKeypair = require('./createKeypair');
const User = require('./user');


class BigChainDbService {
  constructor() {
    this.connection = createConnection();
  }

  createUser() {
    return new User(this.connection, createKeypair());
  }
}

module.exports = BigChainDbService;
