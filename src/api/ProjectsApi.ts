import axios from 'axios';
import { ProjectModel } from '../models/ProjectModel';

const baseUrl = 'http://localhost:8080/projects';

export const fetchUserProjects = async (employeeId: string): Promise<ProjectModel[]> => {
  const response = await axios.get<ProjectModel[]>(`${baseUrl}/employee/${employeeId}`);
  return response.data;
};