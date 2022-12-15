import { WorkStatus } from "./workStatus.enum";

export class Task {
  constructor(id: string, description: string, executionTime: number, status: WorkStatus, userId: string) {
    this.id = id;
    this.description = description;
    this.executionTime = executionTime;
    this.status = status;
    this.userId = userId;
  }

  id: string;
  description: string;
  executionTime: number;
  status: WorkStatus;
  userId: string;
}