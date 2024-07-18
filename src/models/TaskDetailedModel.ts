import { CategoryModel } from "./CategoryModel";

export interface TaskDetailedModel {
	taskId?: string
  title: string
  category?: CategoryModel
  description?: string

  assignedToId?: string
  assignedToFirstName?: string
  assignedToLastName?: string
  
  createdById: string
  createdByFirstName: string
  createdByLastName: string

  status: string
  priority: string
  projectId?: string

  createdDate?: Date | null
  assignedDate?: Date | null
  unassignedDate?: Date  | null
  doneDate?: Date | null
}