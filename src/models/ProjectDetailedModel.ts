import { EmployeeNameAndImageModel } from "./EmployeeNameAndImageModel"
import { TeamNameModel } from "./TeamNameModel"

export interface ProjectDetailedModel {
	projectId?: string
  projectName: string
  teams: TeamNameModel []
  participants: EmployeeNameAndImageModel []
  createdByEmployee: EmployeeNameAndImageModel
  status: string
  progress: number
  
  createdDate?: Date | null
  startDate?: Date | null
  initialDeadlineDate?: Date | null
  endDate?: Date | null
}