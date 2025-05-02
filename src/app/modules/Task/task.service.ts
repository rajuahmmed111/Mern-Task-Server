import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import prisma from '../../../shared/prisma';
import { TaskCategory, TaskStatus } from '@prisma/client';

// create task
const createTask = async (payload: any) => {
  const result = await prisma.task.create({
    data: {
      ...payload,
      date: new Date(),
    },
  });

  return result;
};

// get all tasks
const getAllTasks = async () => {
  const users = await prisma.task.findMany();
  if (users.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No tasks found');
  }
  return users;
};

// get single task
const getSingleTask = async (id: string) => {
  const isExist = await prisma.task.findUnique({
    where: {
      id,
    },
  });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No tasks found');
  }
};

// update taskStatus(done)
const updateTaskStatus = async (id: string) => {
  const isExist = await prisma.task.findUnique({
    where: {
      id,
    },
  });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No tasks found');
  }

  const updateStatus = await prisma.task.update({
    where: {
      id,
    },
    data: {
      status: TaskStatus.DONE,
    },
  });
};

// delete task
const deleteTask = async (id: string) => {
  const isExist = await prisma.task.findUnique({
    where: {
      id,
    },
  });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No tasks found');
  }

  await prisma.task.delete({
    where: {
      id,
    },
  });

  return {
    message: 'Task deleted successfully',
  };
};

const getTasksByCategory = async (category: TaskCategory) => {
  const tasks = await prisma.task.findMany({
    where: {
      category,
    },
  });

  if (tasks.length === 0) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'No tasks found for this category'
    );
  }

  return tasks;
};

export const TaskServices = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTaskStatus,
  deleteTask,
  getTasksByCategory,
};
