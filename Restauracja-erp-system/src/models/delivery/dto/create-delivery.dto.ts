import { IsNotEmpty } from 'class-validator';

export class CrateDeliveryDto {
  @IsNotEmpty()
  dateOfCreate: string;

  @IsNotEmpty()
  productList: string;
}
