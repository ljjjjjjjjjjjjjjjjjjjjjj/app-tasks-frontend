import { EmployeeNameModel } from "./EmployeeNameModel"
import { TeamNameModel } from "./TeamNameModel"

export interface ProjectDetailedModel {
	projectId?: string
  projectName: string
  teams: TeamNameModel []
  participants: EmployeeNameModel []
  createdById: EmployeeNameModel []
  status: string
  progress: number
  
  createdDate?: Date | null
  startDate?: Date | null
  initialDeadlineDate?: Date | null
  endDate?: Date | null
}