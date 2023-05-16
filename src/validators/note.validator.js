import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const noteValidator = (req, res, next) => {
  console.log("requesting ====> ", req.body);
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    color: Joi.string().optional()
    

  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  } else {
    next();
  }
};