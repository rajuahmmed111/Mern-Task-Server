import prisma from '../../../shared/prisma';

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


export const TaskServices = {
  createTask,
};
