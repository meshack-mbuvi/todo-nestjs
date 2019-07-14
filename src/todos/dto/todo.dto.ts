import { ApiModelProperty } from '@nestjs/swagger';

export class Todo {
  @ApiModelProperty()
  title: string;

  @ApiModelProperty()

  @ApiModelProperty()
  isComplete?: boolean;

  @ApiModelProperty()
  description?: string;

  @ApiModelProperty()
  id?: number;
}
