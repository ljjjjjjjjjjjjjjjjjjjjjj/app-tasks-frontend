import axios from "axios";
import { EmployeeModel } from "../models/EmployeeModel";
import { EmployeeNameAndImageModel } from "../models/EmployeeNameAndImageModel";

const baseUrl = 'http://localhost:8080/employees';

export const fetchEmployees = async (): Promise<EmployeeModel[]> => {
  const response = await axios.get<EmployeeModel[]>(baseUrl);
  return response.data;
};

export const fetchEmployeesWithImagesAll = async (): Promise<EmployeeNameAndImageModel[]> => {
  const response = await axios.get<EmployeeNameAndImageModel[]>(`${baseUrl}/with-images/all`);
  return response.data;
};

export const fetchEmployeesWithImagesByIds = async (ids: Set<string>): Promise<EmployeeNameAndImageModel[]> => {
  const idsArray = Array.from(ids);

  const response = await axios.get<EmployeeNameAndImageModel[]>
  (`${baseUrl}/with-images/by-ids`, {params: {ids: idsArray},});
  return response.data;
};