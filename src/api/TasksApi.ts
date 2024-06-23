import axios from 'axios';
import { TaskModel } from '../models/TaskModel';

const baseUrl = 'http://localhost:8080/tasks';

export const fetchAllTasks = async (): Promise<TaskModel[]> => {
  const response = await axios.get<TaskModel[]>(baseUrl)
  const tasks = response.data.map(task => ({
    ...task,
    createdDate: task.createdDate ? new Date(task.createdDate) : null,
    assignedDate: task.assignedDate ? new Date(task.assignedDate) : null,
    unassignedDate: task.unassignedDate ? new Date(task.unassignedDate) : null,
    doneDate: task.doneDate ? new Date(task.doneDate) : null,
  }));
  return tasks;
};

export const fetchTaskById = async (id : string): Promise<TaskModel> => {
  const response = await axios.get<TaskModel>(`${baseUrl}/${id}`);
  const task = {
    ...response.data,
    createdDate: response.data.createdDate ? new Date(response.data.createdDate) : null,
    assignedDate: response.data.assignedDate ? new Date(response.data.assignedDate) : null,
    unassignedDate: response.data.unassignedDate ? new Date(response.data.unassignedDate) : null,
    doneDate: response.data.doneDate ? new Date(response.data.doneDate) : null,
  };
  return task;
};

export const updateTask = async (task: TaskModel, taskId: string) => {
  const taskForUpdate = {
    ...task,
    createdDate: task.createdDate ? task.createdDate.toISOString() : null,
    assignedDate: task.assignedDate ? task.assignedDate.toISOString() : null,
    unassignedDate: task.unassignedDate ? task.unassignedDate.toISOString() : null,
    doneDate: task.doneDate ? task.doneDate.toISOString() : null,
  };
  const response = await axios.put(`${baseUrl}/${taskId}`, taskForUpdate);

  return response.status;
}

export const createTask = async (task: TaskModel): Promise<TaskModel> => {
  const response = await axios.post(baseUrl, task);

  return response.data;
}