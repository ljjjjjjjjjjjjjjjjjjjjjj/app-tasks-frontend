import axios from "axios";
import { EmployeeModel } from "../models/EmployeeModel";

const baseUrl = 'http://localhost:8080/employees';

export const fetchEmployees = async (): Promise<EmployeeModel[]> => {
  const response = await axios.get<EmployeeModel[]>(baseUrl);
  return response.data;
};