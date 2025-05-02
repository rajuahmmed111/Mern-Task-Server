import express from 'express';
import { TaskControllers } from './task.controller';

const router = express.Router();

// create task
router.post('/create', TaskControllers.createTask);

// get all
router.get('/', TaskControllers.getAllTasks);

// get single
router.get('/:id', TaskControllers.getSingleTask);

// update status for done
router.patch('/:id/status', TaskControllers.updateTaskStatus);

// delete
router.delete('/:id', TaskControllers.deleteTask);

// filter on category
router.get('/filter/category', TaskControllers.getTasksByCategory);

export const taskRoute = router;
