import { Body, Controller, Get, Post, Res } from '@nestjs/common';

import { Response } from 'express';
import { Todo } from './dto/todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {

  @Get()
  findAll(): Promise<Todo[]> {
    return TodoService.getAll();
  }

  @Post()
  addTodo(@Body() body: Todo, @Res() res: Response): any {
    const
      {
        title = '',
        isComplete = false,
        description = '',
      } = body;

    return TodoService.create({ title, isComplete, description}, res);
  }
}
