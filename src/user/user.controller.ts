import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { User, UserLogin } from './dto';

import { Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Get()
  findOne(): Promise<User[]> {
    return UserService.getAll();
  }

  @Post('/signup')
  create(@Body() body: User, @Res() res: Response): Promise<any> {
    return UserService.signUp(body, res);
  }

  @Post('/login')
  login(@Body() body: UserLogin, @Res() res: Response): Promise<any> {
    return UserService.login(body, res);
  }
}
