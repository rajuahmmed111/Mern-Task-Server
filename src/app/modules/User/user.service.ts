import * as bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import prisma from '../../../shared/prisma';
import config from '../../../config';
import { UserStatus } from '@prisma/client';
import { ObjectId } from 'mongodb';

// create user
const createUser = async (payload: any) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existingUser) {
    if (existingUser.userStatus === UserStatus.BLOCK) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'This user is inactive and cannot be created.'
      );
    }
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'This user information already exists'
    );
  }

  const hashedPassword = await bcrypt.hash(payload.password, config.salt || 12);

  const user = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
      dateOfBirth: new Date(),
    },
  });

  const { password, otp, otpExpiry, hexCode, ...updateUser } = user;

  return updateUser;
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  if (users.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found');
  }
  return users;
};

// get single user
const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id, userStatus: UserStatus.ACTIVE },
  });

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};

// delete a user
const deleteUser = async (userId: string, loggedId: string) => {
  if (!ObjectId.isValid(userId)) {
    throw new ApiError(400, 'Invalid user ID format');
  }

  if (userId === loggedId) {
    throw new ApiError(403, "You can't delete your own account!");
  }

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    throw new ApiError(404, 'User not found');
  }

  // Delete the user
  await prisma.user.delete({
    where: { id: userId },
  });

  return;
};

// update user profile image
const updateUserProfileImage = async (
  userId: string,
  profileImageUrl: string
) => {
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Update user's profile image
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { profileImage: profileImageUrl },
  });

  const { id, email, profileImage } = updatedUser;

  return { id, email, profileImage };
};

export const UserService = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUserProfileImage,
};
