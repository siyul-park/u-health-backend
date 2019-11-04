const EmgService = require('../service/emg.service');
const config = require('../config/environment');


const emgService = new EmgService();

async function createEmg(req, res) {
  const emg = req.body;

  const response = await emgService.insert(emg);

  config.logger.log(`Request: add emg, exerciseTime is ${response.exerciseTime}`);


  res.status(201)
    .send(response);
}

async function getEmg(req, res) {
  const id = req.params.id;

  const response = await emgService.get(id);

  config.logger.log(`Request: get emg, emg is ${response.values}`);

  res.status(200)
    .send(response);
}

module.exports = { createEmg, getEmg };
