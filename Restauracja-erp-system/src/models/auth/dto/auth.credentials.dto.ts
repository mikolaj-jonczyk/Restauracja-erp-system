import { IsEnum, IsString } from 'class-validator';
import { UserType } from '../user-type.enum';

export class AuthCredentialsDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEnum(UserType)
  type: UserType;
}
