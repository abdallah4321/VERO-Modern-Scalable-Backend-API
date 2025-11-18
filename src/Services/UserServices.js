import {
  deleteUserById,
  findUserByEmail,
  findUserById,
  getAllUsers,
  updateUser
} from "../DataAcess/Auth.DataAcess.js";

export const getUserByEmail = async (email) => {
  return await findUserByEmail(email);
};

export const UpdateUser = async (id, updateData) => {
  return await updateUser(id, updateData);
};

export const getUserById = async (id) => {
  return await findUserById(id);
};

export const findAllUsers = async () => {
  return await getAllUsers();
};

export const deleteUserByID  = async (id) => {
  return await deleteUserById(id);
};
