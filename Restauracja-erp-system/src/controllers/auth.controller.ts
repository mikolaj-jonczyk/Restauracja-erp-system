import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthCredentialsDto } from '../models/auth/dto/auth.credentials.dto';
import { Response } from 'express';
import { UserType } from 'src/models/auth/user-type.enum';
import { LoginCredentialsDto } from 'src/models/auth/dto/login.credential.dto';
import { Log } from 'src/log';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @Render('auth/login')
  root() {
    return { msg: '' };
  }

  @Get('/signout')
  @Render('auth/login')
  signout() {
    Log.logged = false;
    Log.role = null;
    console.log(Log);
    return { msg: '' };
  }

  @Get('/signin')
  @Render('auth/login')
  signin() {
    return { msg: '' };
  }

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  async signIn(
    @Body() loginCredentialsDto: LoginCredentialsDto,
    @Res() res: Response
  ) {
    try {
      const backInfo = await this.authService.signIn(loginCredentialsDto);
      Log.logged = true;

      switch (backInfo.type) {
        case UserType.ADMIN:
          Log.role = 'admin';
          return res.redirect('http://localhost:3000/admin');
        case UserType.CHEF:
          Log.role = 'chef';
          return res.redirect('http://localhost:3000/chef');
        case UserType.COOK:
          Log.role = 'cook';
          return res.redirect('http://localhost:3000/cook');
        case UserType.DELIVERY:
          Log.role = 'delivery';
          return res.redirect('http://localhost:3000/delivery');
        case UserType.WAREHOUSEBOSS:
          Log.role = 'boss';
          return res.redirect('http://localhost:3000/boss');
        case UserType.WAREHOUSEMAN:
          Log.role = 'worker';
          return res.redirect('http://localhost:3000/worker');
      }
    } catch (error) {
      return res.render('error');
    }
  }
}
