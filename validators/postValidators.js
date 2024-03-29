const Joi = require('joi');

exports.validatePost = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    active: Joi.boolean().required(),
    location: Joi.object({
      latitude: Joi.number().required(),
      longitude: Joi.number().required()
    }).required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  
  next();
};
