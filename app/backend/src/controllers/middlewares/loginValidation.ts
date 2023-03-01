import { Request, Response, NextFunction } from 'express';
import Joi = require('joi');

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  const validateEmailFunc = Joi.string().email().required();
  const validateEmail = validateEmailFunc.validate(email);
  if (validateEmail.error || password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
};

export default validateLogin;
