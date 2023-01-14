import { Injectable, NotFoundException } from '@nestjs/common';
import { Status } from '../models/tasks/status.enum';
import { CrateTaskDto } from '../models/tasks/dto/create-task.dto';
import { GetTasksFilterDto } from '../models/tasks/dto/get-tasks-filter.dto';
import { WorkRepository } from '../repositories/work.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Work } from '../models/tasks/work.entity';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(WorkRepository)
    private workRepository: WorkRepository
  ) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Work[]> {
    return this.workRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Work> {
    const found = await this.workRepository.findOne({
      where: { id }
    });
    if (!found) {
      throw new NotFoundException(`Task with this id "${id}" not found!`);
    }

    return found;
  }

  createTask(createTasknDto: CrateTaskDto): Promise<Work> {
    return this.workRepository.createTask(createTasknDto);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.workRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }

  async updateTaskStatus(id: string): Promise<Work> {
    const task = await this.getTaskById(id);

    task.status = Status.ZREALIZOWANY;
    await this.workRepository.save(task);
    return task;
  }
}
