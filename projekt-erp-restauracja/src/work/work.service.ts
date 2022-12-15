import { BadRequestException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { GenerateRandomId } from '../helpers/generateRandomId';
import { ChangeStatusDto, CreateTaskDto, TaskDto } from './dtos/index';
import { WorkStatus } from './models/workStatus.enum';
import { Task } from './models/task.model';
import { WorkMapper } from './work.mapper';

@Injectable()
export class WorkService {
  constructor(
    private readonly workMapper: WorkMapper,
    private readonly idGenerator: GenerateRandomId,
  ) {}

  private readonly tasks: Task[] = [];

  add(task: CreateTaskDto): TaskDto {
    this.validateCreateTaskDto(task);
    const { description, executionTime, userId } = task;

    const newTask = new Task(
      this.idGenerator.generateId(),
      description,
      executionTime,
      WorkStatus.CREATED,
      userId,
    );

    this.tasks.push(newTask);

    return this.workMapper.mapToTaskDto(newTask);
  }

  getAll(): Task[] {
    return this.tasks;
  }

  changeStatus(changeStatusDto: ChangeStatusDto): TaskDto {
    const { id, status } = changeStatusDto;
    this.validateStatus(status);
    const task = this.tasks.find(task => task.id = id);
    if(!task){
      throw new UnprocessableEntityException('There is no such id');
    }

    task.status = WorkStatus[status];
    this.tasks.push(task);
    return this.workMapper.mapToTaskDto(task);
  }

  validateCreateTaskDto(task: CreateTaskDto): void {
    if(!task.description){
      throw new BadRequestException('You need to provide property: description');
    }
    if(!task.userId){
      throw new BadRequestException('You need to provide property: userId');
    }
  }

  validateStatus(status: string): void {
    if (!Object.values(WorkStatus).some(val => val === status)) {
      throw new UnprocessableEntityException('Status value must be created, inProgress or done');
    }
  }
}
