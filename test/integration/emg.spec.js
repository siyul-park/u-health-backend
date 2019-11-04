const Joi = require('joi');
const request = require('../agent');
const createRandomInteger = require('../../util/createRandomInteger');
const createRandomArray = require('../../util/createRandomArray');
const EmgService = require('../../app/service/emg.service');
const validate = require('../util/validate');


const createEmgSuccessScheme = Joi.object().keys({
  transaction: Joi.object().keys({
    id: Joi.string().required(),
    operation: Joi.string().required(),
    metadata: Joi.object().keys({
      datetime: Joi.string().required()
    })
  }),
  exerciseTime: Joi.number().required(),
  monthlyPremium: Joi.number().required()
});

const getEmgSuccessScheme = Joi.object().keys({
  values: Joi.array().items(Joi.number()).required(),
  unitTime: Joi.number().required(),
  metadata: Joi.object().keys({
    datetime: Joi.string().required()
  })
});

async function addEMGAndCheckSuccess(emg) {
  const response = await request
    .post('/emg')
    .send(emg)
    .expect(201);

  validate(response.body, createEmgSuccessScheme);

  return response.body;
}

async function getEMGAndCheckSuccess(id) {
  const response = await request
    .get(`/emg/${id}`)
    .expect(200);

  validate(response.body, getEmgSuccessScheme);

  return response.body;
}

describe('EMG', () => {
  it('add emg', async (done) => {
    const emgSample = {
      values: createRandomArray(100, [0, 1000]),
      unitTime: 0.1
    };

    await addEMGAndCheckSuccess(emgSample);

    done();
  });

  it('get emg', async (done) => {
    const emgSample = {
      values: createRandomArray(100, [0, 1000]),
      unitTime: 0.1
    };

    const response = await addEMGAndCheckSuccess(emgSample);
    await getEMGAndCheckSuccess(response.transaction.id);

    done();
  });

  it('leaning emg', async (done) => {
    const emgService = new EmgService();

    const emgSample = {
      values: createRandomArray(1000000, [0, 1000]),
      unitTime: 0.1
    };

    const leaningData = [];
    const thresholdForExerciseStat = createRandomInteger(0, 1000);

    emgSample.values.forEach((value) =>
      leaningData.push({ value, isExercise: value > thresholdForExerciseStat })
    );

    emgService.doLearning(leaningData);

    expect(Math.abs(emgService.thresholdForExerciseStat - thresholdForExerciseStat) / 1000 < 0.1)
      .toBe(true);

    done();
  });
});
