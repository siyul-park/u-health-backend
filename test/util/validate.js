const Joi = require('joi');


function validate(object, scheme) {
  const { error } = Joi.validate(object, scheme);
  if (error) throw error;
}

module.exports = validate;
