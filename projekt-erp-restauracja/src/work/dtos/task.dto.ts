import { WorkStatus } from "../models/workStatus.enum";

export interface TaskDto {
  description: string;
  executionTime: number;
  status: WorkStatus;
  userId: string;
}