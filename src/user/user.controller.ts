import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { messageResponse } from '../admin/admin.types';
import { MulterOptions } from '../config/multer';
import { CreateSupportDto } from '../notification/dto/notification.dto';
import { UpdateUserDto } from './dto/user.dto';
import { User } from './model/user.schema';
import { UserService } from './user.service';
import { Notification } from '../notification/model/notification.schema';
import { NotificationCategory } from '../notification-category/model/notificationCategory.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

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

  @Get('/profile/allNotifications')
  @HttpCode(HttpStatus.OK)
  async getAllUserNotification(): Promise<Notification[]> {
    return await this.userService.getAllUserNotification()
  }


  @Get('/allNotificationCategory')
  @HttpCode(HttpStatus.OK)
  async getAllNotificationCategory(): Promise<NotificationCategory[]> {
    return await this.userService.getAllNotificationCategory()
  }


  // all support message
  @Get('/profile/allSupportMessage')
  @HttpCode(HttpStatus.OK)
  async getUserAllSupportMessage(): Promise<Notification[]> {
    return await this.userService.getUserAllSupportMessage()
  }
  
}
