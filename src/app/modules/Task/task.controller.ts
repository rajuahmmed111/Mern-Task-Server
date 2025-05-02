import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { TaskServices } from './task.service';

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

export const TaskControllers = {
    createTask
}
