import { ApiModelProperty } from '@nestjs/swagger';
import { TodoEntity } from '../../entity/todo';
import { UserEntity } from '../../entity/user';

export class NewProject {
  @ApiModelProperty()
  id?: number;

  @ApiModelProperty()
  title: string;

  @ApiModelProperty()
  description: string;

  @ApiModelProperty()
  user: UserEntity;

  @ApiModelProperty()
  todos?: TodoEntity[];
}
