import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';

import { Response } from 'express';
import { Todo } from './dto/todo.dto';
import { TodoEntity } from '../entity/todo';
import { getRepository } from 'typeorm';

@Injectable()
export class TodoService {

  static async getAll(): Promise<Todo[]> {
    return await getRepository(TodoEntity).find();
  }

  static async create(body: Todo, @Res() res: Response): Promise<any> {
    const {
      title = '',
      isComplete = false,
      description = '',
    } = body;

    try {

      const todoExists = await getRepository(TodoEntity).findOne({ title });

      if (todoExists) {
        throw new HttpException(
          {
            error: 'An item with similar title exists',
            status: HttpStatus.CONFLICT,
          }, 409);
      }

      const todo = new Todo();
      todo.title = title;
      todo.description = description;
      todo.isComplete = isComplete;

      const results = await getRepository(TodoEntity).save(todo);

      return res.send(results);
    } catch (error) {
      return res.status(409).send(error.message);
    }
  }

  static async editTodo(id: string, body: any, @Res() res: Response): Promise<any> {
    const
      {
        title = '',
        isComplete = false,
        description = '',
      } = body;

    try {
      const todo = await getRepository(TodoEntity)
        .findOne({ id: parseInt(id, 10) });

      if (todo) {
        todo.title = title || todo.title;
        todo.isComplete = isComplete || todo.isComplete;
        todo.description = description || todo.description;

        return todo;
      }

      throw new HttpException(
        {
          error: 'Todo item not found',
          status: HttpStatus.NOT_FOUND,
        }, 404);

    } catch (error) {
      return res.status(404).send(error.message);
    }
  }
}
