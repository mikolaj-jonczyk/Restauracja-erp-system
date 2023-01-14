import { IsNotEmpty } from 'class-validator';

export class CrateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  quantity: string;
}
