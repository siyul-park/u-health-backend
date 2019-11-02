const express = require('express');
const setRouterPath = require('../index');


const router = express.Router();

module.exports = (app) => {
  setRouterPath(router, __dirname);

  app.use('/emg', router);
};
