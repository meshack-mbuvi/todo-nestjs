import { Body, Controller, Get, Post, Res } from '@nestjs/common';

import { Response } from 'express';
import { User } from './dto';
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
}
