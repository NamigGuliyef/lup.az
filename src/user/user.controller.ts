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
import { messageResponse } from 'src/admin/admin.types';
import { MulterOptions } from 'src/config/multer';
import { CreateSupportDto } from 'src/notification/dto/notification.dto';
import { UpdateUserDto } from './dto/user.dto';
import { User, userModel } from './model/user.schema';
import { UserService } from './user.service';

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

}
