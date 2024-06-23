import axios from 'axios';
import { TaskModel } from '../models/TaskModel';

const baseUrl = 'http://localhost:8080/tasks';

export const fetchAllTasks = async (): Promise<TaskModel[]> => {
  const response = await axios.get<TaskModel[]>(baseUrl)
  return response.data;
};

export const fetchTaskById = async (id : string): Promise<TaskModel> => {
  const response = await axios.get<TaskModel>(`${baseUrl}/${id}`);
  return response.data;
};

export const updateTask = async (task: TaskModel, taskId: string) => {
  const response = await axios.put(`${baseUrl}/${taskId}`, task);

  return response.status;
}

export const createTask = async (task: TaskModel): Promise<TaskModel> => {
  const response = await axios.post(baseUrl, task);

  return response.data;
}