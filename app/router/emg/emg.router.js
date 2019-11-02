const asyncHandler = require('../../util/asyncHandler');
const emgController = require('../../controller/emg.controller');


module.exports = (router) => {
  router.post('/', asyncHandler(emgController.createEmg));
  router.get('/:id', asyncHandler(emgController.getEmg));

};
