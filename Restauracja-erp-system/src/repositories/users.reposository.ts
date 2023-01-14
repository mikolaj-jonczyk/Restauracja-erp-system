import {
  ConflictException,
  InternalServerErrorException
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from '../models/auth/dto/auth.credentials.dto';
import { User } from '../models/auth/user.entity';
import * as bcrypt from 'bcrypt';
import { UserType } from 'src/models/auth/user-type.enum';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password, type } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
      username,
      password: hashedPassword,
      type: type
    });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate username create enum with numbers
        throw new ConflictException('Username already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async listUsers(): Promise<User[]> {
    const query = this.createQueryBuilder('prescription');
    const prescriptions = await query.getMany();
    return prescriptions;
  }
}
