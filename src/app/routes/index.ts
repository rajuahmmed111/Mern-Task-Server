import express from 'express';
import { authRoutes } from '../modules/Auth/auth.routes';
import { userRoute } from '../modules/User/user.route';
import { taskRoute } from '../modules/Task/task.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/tasks',
    route: taskRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
