import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { generateToken } from '../Utils/Jwt.js';
import {
  findUserByEmail,
  createUser,
  updateUser,
  findUserByResetToken,
} from '../DataAcess/Auth.DataAcess.js';
import APIError from '../Utils/APIError.js';
import { sendResetEmail } from '../Utils/Nodemailer.js';

export const registerUser = async (name, email, password) => {
  if (!name || !email || !password) {
    throw new APIError('All fields are required', 400);
  }

  const existing = await findUserByEmail(email);
  if (existing) throw new APIError('Email already in use', 400);

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({
    name,
    email,
    password_hash: hashedPassword,
  });

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token: generateToken({ id: user.id, email: user.email }),
  };
};

export const loginUser = async (email, password_hash) => {
  const user = await findUserByEmail(email);
  if (!user) throw new APIError('User not found', 404);

  const isMatch = await bcrypt.compare(password_hash, user.password_hash);
  if (!isMatch) throw new APIError('Invalid password', 401);
  await updateUser(user.id, { is_online: true });

  return { 
    user: { id: user.id, name: user.name, email: user.email },
     token: generateToken({ id: user._id, email }) };
};

export const forgetPassword = async (email) => {
  const user = await findUserByEmail(email);
  if (!user) throw new APIError('Email not registered', 404);
  if (!user.id) throw new APIError('User ID not found', 500);

  const reset_token = crypto.randomBytes(32).toString('hex');
  const reset_token_expiry = new Date(Date.now() + 1000 * 60 * 15); // 15 دقيقة

  await updateUser(user.id, { reset_token, reset_token_expiry });
console.log(user.email);

  await sendResetEmail(user.email, reset_token);

  return { message: 'Password reset email sent successfully' };
};

export const resetPassword = async (token, newPassword) => {
  const user = await findUserByResetToken(token);
  if (!user || user.reset_token_expiry < Date.now())
    throw new APIError('Invalid or expired token', 400);

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await updateUser(user._id, {
    password: hashedPassword,
    reset_token: null,
    reset_token_expiry: null,
  });

  return { message: 'Password reset successful' };
};
