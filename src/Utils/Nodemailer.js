import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import APIError from './APIError.js';
dotenv.config();

export const sendResetEmail = async (email, reset_token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT || 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const resetUrl = `${process.env.FRONTEND_URL}/api/v1/auth/reset-password/${reset_token}`;

    const message = {
      from: `"VERO App Support" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      html: `
      <h2>Hello!</h2>
      <p>You requested a password reset. Please click below to reset your password:</p>
      <a href="${resetUrl}" target="_blank">Reset Password</a>
      <p>This link will expire in 15 minutes.</p>
    `,
    };

    await transporter.sendMail(message);
  } catch (err) {
    throw new APIError('Email sending failed');
  }
};
