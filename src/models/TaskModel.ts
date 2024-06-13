import { CategoryModel } from "./CategoryModel";

export interface TaskModel {
	taskId: string
  title: string
  category: CategoryModel
  description: string
}