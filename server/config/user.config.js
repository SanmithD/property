import Joi from "joi";

const signupSchema = (req, res, next) => {
  const signup = Joi.object({
    name: Joi.string().min(5).max(20).required().messages({
      "string.base": "Name should be in text format",
      "string.empty": "Name cannot be empty",
      "string.min": "Name must be minimum  {#limit} character ",
      "string.max": "Name must be most  {#limit} character ",
      "any.required": "Name is a required field.",
    }),
    email: Joi.string().email().trim().required().lowercase().messages({
      "string.base": "Email should be in text format",
      "string.empty": "Email must be a valid address",
      "any.required": "Email is a required field.",
    }),
    phone: Joi.string()
      .pattern(/^\d{10}$/)
      .required()
      .messages({
        "string.base": "Phone number must be text.",
        "string.empty": "Phone number cannot be empty.",
        "string.pattern.base": "Phone number must be exactly 10 digits (0-9).",
        "any.required": "Phone number is a required field.",
      }),
    password: Joi.string().min(5).max(10).required().messages({
      "string.base": "password should be in text format",
      "string.empty": "password cannot be empty",
      "string.min": "password must be minimum  {#limit} character ",
      "string.max": "password must be minimum  {#limit} character ",
      "any.required": "password is a required field.",
    }),
    role: Joi.string().optional()
  });

  const { error } = signup.validate(req.body, { abortEarly: false });

  if(error){
    return res.status(400).json({
        success: false,
        message: error.message
    })
  }
  next();
};

const loginSchema = (req, res, next) => {
  const login = Joi.object({
    email: Joi.string().email().trim().required().lowercase().messages({
      "string.base": "Email should be in text format",
      "string.empty": "Email must be a valid address",
      "any.required": "Email is a required field.",
    }),
    password: Joi.string().min(5).max(10).required().messages({
      "string.base": "password should be in text format",
      "string.empty": "password cannot be empty",
      "string.min": "password must be minimum  {#limit} character ",
      "string.max": "password must be minimum  {#limit} character ",
      "any.required": "password is a required field.",
    }),
  });

  const { error } = login.validate(req.body, { abortEarly: false });

  if(error){
    return res.status(400).json({
        success: false,
        message: error.message
    })
  }
  next();
};

export { loginSchema, signupSchema };
