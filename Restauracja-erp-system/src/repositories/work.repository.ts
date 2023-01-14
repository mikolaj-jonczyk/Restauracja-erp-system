import { EntityRepository, Repository } from 'typeorm';
import { CrateTaskDto } from '../models/tasks/dto/create-task.dto';
import { GetTasksFilterDto } from '../models/tasks/dto/get-tasks-filter.dto';
import { Status } from '../models/tasks/status.enum';
import { Work } from '../models/tasks/work.entity';

@EntityRepository(Work)
export class WorkRepository extends Repository<Work> {
  async createTask(createTaskDto: CrateTaskDto): Promise<Work> {
    const { description, userId, executionTime } = createTaskDto;

    const task = this.create({
      description,
      userId,
      executionTime,
      status: Status.NIEZREALIZOWANY
    });
    await this.save(task);
    return task;
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Work[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('work');

    if (status) {
      query.andWhere('work.status = :status', {
        status
      });
    }

    if (search) {
      query.andWhere('(LOWER(work.description) LIKE LOWER(:search)', {
        search: `%${search}%`
      });
    }

    const tasks = await query.getMany();

    return tasks;
  }
}
