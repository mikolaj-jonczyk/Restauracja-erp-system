import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from '../models/auth/dto/auth.credentials.dto';
import { UsersRepository } from '../repositories/users.reposository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../models/auth/jwt-payload.interface';
import { BackInfoDto } from 'src/models/auth/dto/backinfo.dto';
import { UserType } from 'src/models/auth/user-type.enum';
import { LoginCredentialsDto } from 'src/models/auth/dto/login.credential.dto';
import { User } from 'src/models/auth/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService
  ) {}

  async listUsers(): Promise<User[]> {
    return this.usersRepository.listUsers();
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(loginCredentialsDto: LoginCredentialsDto): Promise<BackInfoDto> {
    const { username, password } = loginCredentialsDto;
    const user = await this.usersRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      const type: UserType = user.type;
      const backInfo: BackInfoDto = { accessToken, type };
      return backInfo;
    } else {
      throw new UnauthorizedException('Błędne hasło lub nazwa uzytkownika');
    }
  }
}
