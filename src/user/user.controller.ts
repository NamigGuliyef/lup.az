import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { User } from './model/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // user profile info
  @Get('/profile/info')
  @HttpCode(HttpStatus.OK)
  async getUserProfile(): Promise<User> {
    return await this.userService.getUserProfile()
  }


}
