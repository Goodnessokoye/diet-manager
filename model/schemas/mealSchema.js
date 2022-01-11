const Joi = require("joi");

const schemaForMeal = {
  name: Joi.string().min(3).max(30).required(),
};

module.exports = {
  schemaForMeal,
};
