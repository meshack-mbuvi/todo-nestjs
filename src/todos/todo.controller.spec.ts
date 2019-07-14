import { Test, TestingModule } from '@nestjs/testing';

import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

describe('AppController', () => {
  let todoController: TodoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();

    todoController = app.get<TodoController>(TodoController);

  });

  describe('root', () => {
    it('should return "Hello World!"', () => {

      expect(todoController.findAll()).toEqual([{ "completed": false, "description": "for advancement", "title": "Work on LMS" }]);
    });
  });
});
