import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { TaskServices } from './task.service';
import { TaskCategory } from '@prisma/client';

// create task
const createTask = catchAsync(async (req, res) => {
  const taskData = req.body;
  const result = await TaskServices.createTask(taskData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Task created successfully',
    data: result,
  });
});

// Get all tasks
const getAllTasks = catchAsync(async (req, res) => {
  const result = await TaskServices.getAllTasks();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tasks retrieved successfully',
    data: result,
  });
});

// Get single task
const getSingleTask = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TaskServices.getSingleTask(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task retrieved successfully',
    data: result,
  });
});

// Update task status to DONE
const updateTaskStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TaskServices.updateTaskStatus(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task status updated to DONE',
    data: result,
  });
});

// Delete task
const deleteTask = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TaskServices.deleteTask(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task deleted successfully',
    data: result,
  });
});

// filter on category
const getTasksByCategory = catchAsync(async (req, res) => {
  const category = req.query.category as TaskCategory;

  const result = await TaskServices.getTasksByCategory(category);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tasks retrieved by category successfully',
    data: result,
  });
});

export const TaskControllers = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTaskStatus,
  deleteTask,
  getTasksByCategory,
};
