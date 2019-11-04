const createEMG = require('./createEMG');
const getEMG = require('./getEMG');

class User {
  constructor(connection, keypair) {
    this.keypair = keypair;
    this.connection = connection;

    this.totalExerciseTime = 0;
  }

  insertEMG(emg) {
    return createEMG(this.connection, this.keypair, emg);
  }

  getEMG(id) {
    return getEMG(this.connection, id);
  }

  addExerciseTime(exerciseTime) {
    this.totalExerciseTime += exerciseTime;

    return this.totalExerciseTime;
  }
}

module.exports = User;
