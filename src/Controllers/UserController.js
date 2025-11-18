import {
  findAllUsers,
  getUserByEmail,
  getUserById,
  UpdateUser,
  deleteUserByID
} from '../Services/UserServices.js';

export const UserByEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const result = await getUserByEmail(email);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const UserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getUserById(Number(id)); // Prisma يحتاج رقم
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const result = await findAllUsers();
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const result = await UpdateUser(Number(id), updateData);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteUserByID(Number(id));
    res.json(result);
  } catch (err) {
    next(err);
  }
};
