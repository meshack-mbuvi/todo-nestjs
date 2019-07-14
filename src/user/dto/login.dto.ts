import { ApiModelProperty } from '@nestjs/swagger';

export class UserLogin {

  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  password: string;

}
