import { Role, UserStatus } from '@prisma/client';

export type IUser = {
  lastName: string;
  password: string;
  email: string;
  status?: UserStatus;
  role?: Role;
};