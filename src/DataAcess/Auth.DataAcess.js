import { prisma } from "../Config/prismaClient.js";
 

 
export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = async (userData) => {
  return await prisma.user.create({ data: userData });
};

export const updateUser = async (id, updateData) => {
  return await prisma.user.update({
    where: { id },
    data: updateData,
  });
};

export const findUserByResetToken = async (token) => {
  return await prisma.user.findFirst({
    where: { reset_token: token },
    reset_token_expiry: {
        gt: new Date()
      },
  });
};


export const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    select: { id: true, username: true, email: true, is_online: true, last_seen: true },
  });
};


export const setUserOnlineStatus = async (id, isOnline) => {
  return await prisma.user.update({
    where: { id },
    data: { is_online: isOnline, last_seen: isOnline ? null : new Date() },
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: { id: true, username: true, email: true, is_online: true, last_seen: true },
  });
};

export const searchUsersByUsername = async (username) => {
  return await prisma.user.findMany({
    where: {
      username: {
        contains: username,
        mode: 'insensitive',
      },
    },
    select: { id: true, username: true, email: true, is_online: true, last_seen: true },
  });
};

export const deleteUserById = async (id) => {
  return await prisma.user.delete({
    where: { id },
  });
};

