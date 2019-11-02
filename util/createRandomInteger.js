function createRandomInteger(min, max) {
  return Math.floor(Math.random() * max) + min;
}

module.exports = createRandomInteger;
