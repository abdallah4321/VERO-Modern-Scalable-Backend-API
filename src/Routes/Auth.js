import express from 'express';
import {
  register,
  login,
  forgot,
  reset,
} from '../Controllers/auth.js';
import {
  validateLogin,
  validateRegister,
} from '../Validators/UserValidator.js';
 
const Router = express.Router();

Router.post('/register', validateRegister, register);
Router.post('/login',validateLogin, login);
Router.post('/forgot-password', forgot);
Router.post('/reset-password/:token', reset);

export default Router;
