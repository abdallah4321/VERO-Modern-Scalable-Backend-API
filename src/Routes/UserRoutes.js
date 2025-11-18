import express from 'express';
import {
  deleteUser,
  getAllUsers,
  updateUser,
  UserByEmail,
  UserById,
} from '../Controllers/UserController.js';

const Router = express.Router();

Router.get('/email/:email', UserByEmail);
Router.get('/:id', UserById);
Router.get('/', getAllUsers);
Router.patch('/:id', updateUser);
Router.delete('/:id', deleteUser);

export default Router;
