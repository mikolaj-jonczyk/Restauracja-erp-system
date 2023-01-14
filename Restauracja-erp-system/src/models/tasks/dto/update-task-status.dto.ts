import { IsEnum } from 'class-validator';
import { Status } from '../status.enum';

export class UpdateTaskStatusDto {
  @IsEnum(Status)
  status: Status;
}
