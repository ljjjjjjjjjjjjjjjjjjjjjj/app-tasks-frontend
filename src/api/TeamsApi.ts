import axios from "axios";
import { TeamNameModel } from "../models/TeamNameModel";

const baseUrl = 'http://localhost:8080/teams';

export const fetchAllTeamsNameDto = async (): Promise<TeamNameModel[]> => {
  const response = await axios.get<TeamNameModel[]>(baseUrl);
  return response.data;
};