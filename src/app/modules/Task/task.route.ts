import express from 'express';
import { TaskControllers } from './task.controller';

const router = express.Router();

// create task
router.post('/create', TaskControllers.createTask);

export const taskRoute = router;
