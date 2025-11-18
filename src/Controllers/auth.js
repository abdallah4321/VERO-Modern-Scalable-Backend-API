import {
  registerUser,
  loginUser,
  forgetPassword,
  resetPassword,
} from '../Services/AuthServices.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, password_hash } = req.body;
    const result = await registerUser(name, email, password_hash);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password_hash } = req.body;
    const result = await loginUser(email, password_hash);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const forgot = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await forgetPassword(email);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const reset = async (req, res, next) => {
  try {
    const {   newPassword } = req.body;
    const { token } = req.params;
    const result = await resetPassword(token, newPassword);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
