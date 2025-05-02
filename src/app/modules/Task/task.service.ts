import prisma from '../../../shared/prisma';

const createTask = async (payload: any) => {
  const result = await prisma.task.create({
    data: {
      ...payload,
      date: new Date(),
    },
  });
};

export const TaskServices = {
  createTask,
};
