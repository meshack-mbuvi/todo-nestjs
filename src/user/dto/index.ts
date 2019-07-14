import { ApiModelProperty } from '@nestjs/swagger';

export class User {
  @ApiModelProperty()
  id?: number;

  @ApiModelProperty()
  firstName: string;

  @ApiModelProperty()
  lastName: string;

  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  password: string;

  @ApiModelProperty()
  projects?: object;
}
