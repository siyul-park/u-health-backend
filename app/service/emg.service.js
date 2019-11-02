const createRandomInteger = require('../../util/createRandomInteger');
const BigChainDbService = require('./bigchaindb');


class EmgService {
  constructor(
    thresholdForExerciseStat = createRandomInteger(0, 1000),
    learningRate = 0.1
  ) {
    this.thresholdForExerciseStat = thresholdForExerciseStat;
    this.learningRate = learningRate;

    this.bigChainDbService = new BigChainDbService();
    this.user = this.bigChainDbService.createUser();
  }

  doLearning(emg) {
    emg.forEach(({value, isExercise}) => {
      let guess = this.isExercise(value);

      if (guess !== isExercise) {
        this.thresholdForExerciseStat += (value - this.thresholdForExerciseStat) * this.learningRate;
      }
    })
  }

  async insert(emg) {
    const exerciseTime = this.findExerciseTime(emg);
    const { id, operation, metadata } = await this.user.addEMG(emg);

    return { transaction: { id, operation, metadata }, exerciseTime };
  }

  async get(id) {
    const { asset, metadata } = await this.user.getEMG(id);
    const { values, unitTime } = asset.data;

    return { values, unitTime, metadata };
  }

  findExerciseTime(emg) {
    let exerciseCount = 0;

    emg.values.forEach((data) => {
      if (this.isExercise(data)) exerciseCount++;
    });

    return exerciseCount * emg.unitTime;
  }

  isExercise(data) {
    return data > this.thresholdForExerciseStat;
  }
}

module.exports = EmgService;
