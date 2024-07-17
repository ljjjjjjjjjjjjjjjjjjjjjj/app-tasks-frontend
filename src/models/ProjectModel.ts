export interface ProjectModel {
	projectId?: string
  projectName: string
  teamId: string
  createdById: string
  status: string
  progress: number
  
  createdDate?: Date | null
  startDate?: Date | null
  initialDeadlineDate?: Date | null
  endDate?: Date | null
}