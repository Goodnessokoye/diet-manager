const Joi = require("joi");


const schemaForLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .alphanum()
    .min(8)
    .max(30)
    .regex(/[a-zA-Z0-9]{3,30}/)
    .required(),
});

const schemaForSignup = Joi.object({
  password: Joi.string()
    .alphanum()
    .min(8)
    .max(30)
    .regex(/[a-zA-Z0-9]{3,30}/)
    .required(),
  email: Joi.string().email().required(),
});

module.exports = {
  schemaForLogin,
  schemaForSignup
};
