import axios from 'axios';
import { TaskModel } from '../models/TaskModel';
import { TaskDetailedModel } from '../models/TaskDetailedModel';

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

export const fetchTaskById = async (taskId : string): Promise<TaskModel> => {
  const response = await axios.get<TaskModel>(`${baseUrl}/${taskId}`);
  const task = {
    ...response.data,
    createdDate: response.data.createdDate ? new Date(response.data.createdDate) : null,
    assignedDate: response.data.assignedDate ? new Date(response.data.assignedDate) : null,
    unassignedDate: response.data.unassignedDate ? new Date(response.data.unassignedDate) : null,
    doneDate: response.data.doneDate ? new Date(response.data.doneDate) : null,
  };
  return task;
};

export const fetchTaskDetailedyId = async (taskId : string): Promise<TaskDetailedModel> => {
  const response = await axios.get<TaskDetailedModel>(`${baseUrl}/detailed/${taskId}`);
  const task = {
    ...response.data,
    createdDate: response.data.createdDate ? new Date(response.data.createdDate) : null,
    assignedDate: response.data.assignedDate ? new Date(response.data.assignedDate) : null,
    unassignedDate: response.data.unassignedDate ? new Date(response.data.unassignedDate) : null,
    doneDate: response.data.doneDate ? new Date(response.data.doneDate) : null,
  };
  return task;
};

export const fetchTasksByEmployeeId = async (employeeId : string): Promise<TaskModel[]> => {
  const response = await axios.get<TaskModel[]>(`${baseUrl}/employee/${employeeId}`);
  const tasks = response.data.map(task => ({
    ...task,
    createdDate: task.createdDate ? new Date(task.createdDate) : null,
    assignedDate: task.assignedDate ? new Date(task.assignedDate) : null,
    unassignedDate: task.unassignedDate ? new Date(task.unassignedDate) : null,
    doneDate: task.doneDate ? new Date(task.doneDate) : null,
  }));
  return tasks;
};

export const fetchTasksDetailedByEmployeeId = async (employeeId : string): Promise<TaskDetailedModel[]> => {
  const response = await axios.get<TaskDetailedModel[]>(`${baseUrl}/detailed/employee/${employeeId}`);
  const tasks = response.data.map(task => ({
    ...task,
    createdDate: task.createdDate ? new Date(task.createdDate) : null,
    assignedDate: task.assignedDate ? new Date(task.assignedDate) : null,
    unassignedDate: task.unassignedDate ? new Date(task.unassignedDate) : null,
    doneDate: task.doneDate ? new Date(task.doneDate) : null,
  }));
  return tasks;
};

export const fetchTasksByProjectId = async (projectId : string): Promise<TaskModel[]> => {
  const response = await axios.get<TaskModel[]>(`${baseUrl}/project/${projectId}`);
  const tasks = response.data.map(task => ({
    ...task,
    createdDate: task.createdDate ? new Date(task.createdDate) : null,
    assignedDate: task.assignedDate ? new Date(task.assignedDate) : null,
    unassignedDate: task.unassignedDate ? new Date(task.unassignedDate) : null,
    doneDate: task.doneDate ? new Date(task.doneDate) : null,
  }));
  return tasks;
};

export const fetchTasksDetailedByProjectId = async (projectId : string): Promise<TaskDetailedModel[]> => {
  const response = await axios.get<TaskDetailedModel[]>(`${baseUrl}/project/${projectId}`);
  const tasks = response.data.map(task => ({
    ...task,
    createdDate: task.createdDate ? new Date(task.createdDate) : null,
    assignedDate: task.assignedDate ? new Date(task.assignedDate) : null,
    unassignedDate: task.unassignedDate ? new Date(task.unassignedDate) : null,
    doneDate: task.doneDate ? new Date(task.doneDate) : null,
  }));
  return tasks;
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