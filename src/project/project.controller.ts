import {
Body,
Controller,
Get,
Post,
Req,
Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { NewProject } from './dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  @Post()
  addProject(@Body() body: NewProject, @Res() res: Response) {
    return ProjectService.create(body, res);
  }

  @Get()
  getAll(@Req() req: Request): Promise<any> {
    return ProjectService.getAll(req);
  }
}
