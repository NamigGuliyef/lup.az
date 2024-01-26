import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateSubFleetNameDto } from 'src/subfleetname/dto/subfleetname.dto';
import { subFleetName } from 'src/subfleetname/schema/subfleetname.schema';
import { AdminService } from './admin.service';
import { messageResponse } from './admin.types';
import { CreateNotificationCategoryDto } from 'src/notification-category/dto/notificationCategory.dto';
import { NotificationCategory } from 'src/notification-category/model/notificationCategory.schema';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  // create sub fleet name
  @Post('/dashboard/subfleetname')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  async createSubFleetName(@Body() createsubFleetNameDto: CreateSubFleetNameDto): Promise<subFleetName> {
    return await this.adminService.createSubFleetName(createsubFleetNameDto)
  }

  // delete sub fleet name
  @Delete('/dashboard/subfleetname/:_id')
  @HttpCode(HttpStatus.OK)
  async deleteSubFleetName(@Param('_id') _id:string):Promise<messageResponse>{
    return await this.adminService.deleteSubFleetName(_id)
  }

  // create notification category
  @Post('/dashboard/notification-category')
  @HttpCode(HttpStatus.CREATED)
  async createNotificationCategory(@Body() createNotificationCategoryDto:CreateNotificationCategoryDto):Promise<NotificationCategory>{
    return await this.adminService.createNotificationCategory(createNotificationCategoryDto)
  }

  // delete notification category
  @Delete('dashboard/notification-category/:_id')
  @HttpCode(HttpStatus.OK)
  async deleteNotificationCategory(@Param('_id') _id:string):Promise<messageResponse>{
    return await this.adminService.deleteNotificationCategory(_id)
  }

}
