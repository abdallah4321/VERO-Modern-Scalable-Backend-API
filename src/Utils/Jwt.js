import jwt from 'jsonwebtoken';
import APIError from './APIError.js';

const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;

export const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email, role: user.role }, secret, {
    expiresIn,
  });
};


export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new APIError('Invalid token'  , 401);
  }
};