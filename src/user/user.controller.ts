import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from './model/user.schema';
import { UserService } from './user.service';
import { CreateNotificationDto, CreateSupportDto } from 'src/notification/dto/notification.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // user profile info
  @Get('/profile/info')
  @HttpCode(HttpStatus.OK)
  async getUserProfile(): Promise<User> {
    return await this.userService.getUserProfile();
  }

  // user support create
  @Post('/profile/support')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createSupport(
    @Body() createSupportDto: CreateSupportDto): Promise<Notification> {
    return await this.userService.createSupportMessage(createSupportDto);
  }
}
