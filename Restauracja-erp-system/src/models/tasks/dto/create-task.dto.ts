import { IsNotEmpty } from 'class-validator';

export class CrateTaskDto {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  userId: string;

  executionTime: string;
}
