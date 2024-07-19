import axios from "axios";
import { CategoryModel } from "../models/CategoryModel";

const baseUrl = 'http://localhost:8080/categories';

export const fetchCategories = async (): Promise<CategoryModel[]> => {
  const response = await axios.get<CategoryModel[]>(baseUrl);
  return response.data;
};

export const createCategory = async (name: string): Promise<CategoryModel> => {
  const response = await axios.post<CategoryModel>(baseUrl, { name });
  return response.data;
};