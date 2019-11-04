const createRandomInteger = require('../../util/createRandomInteger');
const BigChainDbService = require('./bigchaindb');
const config = require('../config/environment');


function initThresholdForExerciseStat() {
  if (config.env === 'development')
    return 200;
  return 800;
}

class EmgService {
  constructor(
    thresholdForExerciseStat = initThresholdForExerciseStat(),
    learningRate = 0.1,
    standardPremium = 10000000
  ) {
    this.thresholdForExerciseStat = thresholdForExerciseStat;
    this.learningRate = learningRate;

    this.standardPremium = standardPremium;

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
    const {id, operation, metadata} = await this.user.insertEMG(emg);

    const exerciseTime = this.findExerciseTime(emg);
    const totalExerciseTime = this.user.addExerciseTime(exerciseTime);

    const monthlyPremium = this.findMonthlyPremium(totalExerciseTime);

    return {transaction: {id, operation, metadata}, exerciseTime, monthlyPremium};
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

  findMonthlyPremium(exerciseTime) {
    const survivalFactor = this.findSurvivalFactor(exerciseTime);

    const monthlyPremium = this.standardPremium * (0.01675 * survivalFactor) * 0.9302;

    if (monthlyPremium < 0)
      return 0;

    return monthlyPremium
  }

  findSurvivalFactor(exerciseTime) {
    const quarterExerciseTime = exerciseTime / 60 / 30 / 30;

    return 1.6602 * Math.exp(-0.225 * quarterExerciseTime) / 4 + 0.6;
  }

  isExercise(data) {
    return data > this.thresholdForExerciseStat;
  }
}

module.exports = EmgService;
