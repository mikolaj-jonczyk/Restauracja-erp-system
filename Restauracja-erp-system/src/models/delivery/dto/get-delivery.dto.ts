import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Status } from '../../tasks/status.enum';

export class GetDeliveryDto {
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsString()
  search?: string;
}
