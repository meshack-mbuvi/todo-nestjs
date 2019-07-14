import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

import { NewProject } from './dto';
import { Project } from '../entity/project';
import { getRepository } from 'typeorm';

@Injectable()
export class ProjectService {
  static async getAll(req: Request) {
    const { body: { user } } = req;

    const projects = await getRepository(Project).find({ user });
    return projects;
  }

  static async create(body: NewProject, res: Response): Promise<any> {
    const {
      title = '',
      description = '',
      user,
    } = body;

    try {
      if (!title) {
        return res.status(HttpStatus.BAD_REQUEST)
          .send({
            message: 'Title field is required',
            status: HttpStatus.BAD_REQUEST,
          });
      }

      const projectExists = await getRepository(Project).findOne({ title, user });

      if (projectExists) {
        throw new HttpException(
          {
            error: 'You have a similar project, choose a different name',
            status: HttpStatus.CONFLICT,
          }, 409);
      }

      const project = new Project();

      project.title = title;
      project.description = description;
      project.user = user;

      const results = await getRepository(Project).save(project);

      return res.send(results);
    } catch ({status, message}) {
      return res.status(status).send(message);
    }
  }
}
