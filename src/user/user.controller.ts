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

  @Patch('/profile/update')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileFieldsInterceptor([{ name: 'profilePhoto', maxCount: 1 }, { name: 'driverLicensePhoto', maxCount: 4 }, { name: 'carTechnicalPassportPhoto', maxCount: 4 }], MulterOptions))
  async updateProfile(@Body() updateUserDto: UpdateUserDto, @UploadedFiles() files: { profilePhoto: Express.Multer.File[], driverLicensePhoto: Express.Multer.File[], carTechnicalPassportPhoto: Express.Multer.File[] }): Promise<messageResponse> {
    return await this.userService.updateProfile(updateUserDto, files)
  }


  @Get('/profile/allNotifications')
  @HttpCode(HttpStatus.OK)
  async getAllUserNotification():Promise<Notification[]>{
    return await this.userService.getAllUserNotification()
  }


  @Get('/allNotificationCategory')
  @HttpCode(HttpStatus.OK)
  async getAllNotificationCategory():Promise<NotificationCategory[]>{
    return await this.userService.getAllNotificationCategory()
  }


}
