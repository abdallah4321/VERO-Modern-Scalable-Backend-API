import express from 'express';
import AuthRoutes from './Auth.js';
import UserRoutes from './UserRoutes.js';
import ChatRoutes from './Chat.js';
import { protect } from '../Middleware/AuthMiddleware.js';

const Router = express.Router();

// Public Routes
Router.use('/auth', AuthRoutes);
Router.use('/user', UserRoutes);
Router.use('/chat', ChatRoutes);




// Protected test route
Router.get('/profile', protect, (req, res) => {
  res.json({ message: 'Welcome to your profile', user: req.user });
});

export default Router;
