import { Injectable } from "@nestjs/common";
import { TaskDto } from "./dtos/task.dto";
import { Task } from "./models/task.model";

@Injectable()
export class WorkMapper {
  
  mapToTaskDto(task: Task): TaskDto {
    const taskDto: TaskDto = {
      description: task.description,
      executionTime: task.executionTime,
      status: task.status,
      userId: task.userId,
    };

    return taskDto;
  }
}
