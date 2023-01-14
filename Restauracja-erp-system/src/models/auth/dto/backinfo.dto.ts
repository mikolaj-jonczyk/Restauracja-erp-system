import { UserType } from '../user-type.enum';

export class BackInfoDto {
  accessToken: string;

  type: UserType;
}
