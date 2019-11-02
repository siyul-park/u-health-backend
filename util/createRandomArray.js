const repeat = require('./repeat');
const createRandomInteger = require('./createRandomInteger');


function createRandomArray(size, [min, max]) {
  let arr = [];

  repeat(size, () => arr.push(createRandomInteger(min, max)));

  return arr;
}

module.exports = createRandomArray;
