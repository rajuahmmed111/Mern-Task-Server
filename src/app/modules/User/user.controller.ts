import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import ApiError from '../../../errors/ApiErrors';

// create  user
const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User information created successfully',
    data: result,
  });
});

// get single user
const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await UserService.getUserById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully',
    data: { ...user, password: undefined },
  });
});

// get all users
const getAllUsers = catchAsync(async (_req: Request, res: Response) => {
  const users = await UserService.getAllUsers();

  const data = users.map((user) => ({ ...user, password: undefined }));

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully',
    data,
  });
});

// delete user
const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const loggedId = req.user.id;

  await UserService.deleteUser(userId, loggedId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User deleted successfully',
  });
});

// update user profile
const updateUserProfileImage = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized access');
    }

    const profileImage = req.file;
    let imageUrl: string | undefined;

    if (profileImage) {
      imageUrl = `${req.protocol}://${req.get('host')}/uploads/profile/${profileImage.filename}`;
    }

    if (!imageUrl) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'No profile image uploaded');
    }

    const updatedUser = await UserService.updateUserProfileImage(
      userId,
      imageUrl
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User profile image updated successfully',
      data: updatedUser,
    });
  }
);

const UserController = {
  createUser,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUserProfileImage,
};

export default UserController;
