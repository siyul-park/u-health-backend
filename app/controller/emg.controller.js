const EmgService = require('../service/emg.service');


const emgService = new EmgService();

async function createEmg(req, res) {
  const emg = req.body;

  const response = await emgService.insert(emg);

  res.status(201)
    .send(response);
}

async function getEmg(req, res) {
  const id = req.params.id;

  const response = await emgService.get(id);

  res.status(200)
    .send(response);
}

module.exports = { createEmg, getEmg };
