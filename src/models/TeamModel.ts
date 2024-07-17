import { EmployeeModel } from "./EmployeeModel";

export interface TeamModel {
  teamId?: string
	teamName: string
  teamLeaderId: string
  members: EmployeeModel[];
}