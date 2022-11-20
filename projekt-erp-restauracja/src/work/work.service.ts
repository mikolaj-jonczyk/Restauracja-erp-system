import { Injectable } from '@nestjs/common';
import { Task } from './models/task.model';

@Injectable()
export class WorkService {
  private readonly tasks: Task[] = [];

  add(task: Task) {
    this.tasks.push(task);
  }

  getAll(): Task[] {
    return this.tasks;
  }
}
