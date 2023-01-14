import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Status } from '../status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsString()
  search?: string;
}
