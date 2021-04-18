const Joi = require("joi");

// Register JOI validation
const registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    username: Joi.string().min(6).max(50).required(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};

// Login JOI validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });
  return schema.validate(data);
};

module.exports = { registerValidation, loginValidation };
