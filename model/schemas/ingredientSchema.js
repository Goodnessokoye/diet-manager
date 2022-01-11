const Joi = require("joi");

const schemaForIngredient = {
  name: Joi.string().min(3).max(30).required(),
};

module.exports = {
  schemaForIngredient,
};
