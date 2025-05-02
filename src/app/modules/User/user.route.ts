import express from 'express';
import UserController from './user.controller';
import { userValidation } from './user.validation';
import { Role } from '@prisma/client';
import validateRequest from '../../middleware/validateRequest';
import auth from '../../middleware/auth';
import { fileUploader } from '../../../helpers/fileUploader';

// import { parseBodyData } from '../../middlewares/parseBodyData';

const router = express.Router();

router.post(
  '/create',
  // validateRequest(userValidation.createUserSchema),
  UserController.createUser
);

// update user profile image
router.patch(
  '/profile-update/:id',
  auth(),
  fileUploader.uploadProfileImage,
  UserController.updateUserProfileImage
);

router.get('/', auth(), UserController.getAllUsers);
router.get('/:id', auth(), UserController.getUserById);

router.delete('/:id', auth(Role.ADMIN), UserController.deleteUser);

export const userRoute = router;
