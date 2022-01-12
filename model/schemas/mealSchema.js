const Joi = require("joi");

exports.schemaForMeal = {
  name: Joi.string().min(3).max(30).required(),
};

