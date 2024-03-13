import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, UploadedFile, UploadedFiles, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from 'src/user/dto/user.dto';
import { MulterOptions, MulterOptionsExcel } from '../config/multer';
import { UpdateReportStatusDto } from '../courier_report/dto/report.dto';
import { CreateNotificationCategoryDto, UpdateNotificationCategoryDto } from '../notification-category/dto/notificationCategory.dto';
import { NotificationCategory } from '../notification-category/model/notificationCategory.schema';
import { CreateNotificationDto } from '../notification/dto/notification.dto';
import { Notification } from '../notification/model/notification.schema';
import { CreateSubFleetNameDto, UpdateSubFleetNameDto } from '../subfleetname/dto/subfleetname.dto';
import { subFleetName } from '../subfleetname/schema/subfleetname.schema';
import { User } from '../user/model/user.schema';
import { AdminService } from './admin.service';
import { messageResponse } from './admin.types';

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
  // @Delete('/dashboard/subfleetname/:_id')
  // @HttpCode(HttpStatus.OK)
  // async deleteSubFleetName(@Param('_id') _id: string): Promise<messageResponse> {
  //   return await this.adminService.deleteSubFleetName(_id)
  // }

  // update sub fleet name
  @Patch('/dashboard/subfleetname/:_id')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  async updateSubFleetName(@Param('_id') _id: string, @Body() updateSubFleetNameDto: UpdateSubFleetNameDto): Promise<subFleetName> {
    return await this.adminService.updateSubFleetName(_id, updateSubFleetNameDto)
  }

  // get all sub fleet name
  @Get('/dashboard/subfleetname')
  @HttpCode(HttpStatus.OK)
  async getAllSubFleetName(): Promise<subFleetName[]> {
    return await this.adminService.getAllSubFleetName()
  }

  // create notification category
  @Post('/dashboard/notification-category')
  @HttpCode(HttpStatus.CREATED)
  async createNotificationCategory(@Body() createNotificationCategoryDto: CreateNotificationCategoryDto): Promise<NotificationCategory> {
    return await this.adminService.createNotificationCategory(createNotificationCategoryDto)
  }

  // delete notification category
  // @Delete('dashboard/notification-category/:_id')
  // @HttpCode(HttpStatus.OK)
  // async deleteNotificationCategory(@Param('_id') _id: string): Promise<messageResponse> {
  //   return await this.adminService.deleteNotificationCategory(_id)
  // }

  // notification category update
  @Patch('/dashboard/notification-category/:_id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async updateNotificationCategory(@Param('_id') _id: string, @Body() updateNotificationCategoryDto: UpdateNotificationCategoryDto): Promise<NotificationCategory> {
    return await this.adminService.updateNotificationCategory(_id, updateNotificationCategoryDto)
  }

  // get all notification category
  @Get('/dashboard/notification-category')
  @HttpCode(HttpStatus.OK)
  async getAllNotificationCategory(): Promise<NotificationCategory[]> {
    return await this.adminService.getAllNotificationCategory()
  }

  // send notification
  @Post('/dashboard/send-notification')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async sendNotification(@Body() createNotificationDto: CreateNotificationDto): Promise<messageResponse> {
    return await this.adminService.sendNotification(createNotificationDto)
  }

  // all support message
  @Get('/dashboard/support')
  @HttpCode(HttpStatus.OK)
  async getAllSupportMessage(): Promise<Notification[]> {
    return await this.adminService.getAllSupportMessage()
  }

  // all user about information
  @Get('/dashboard/user-info')
  @HttpCode(HttpStatus.OK)
  async getAllUserInformation(): Promise<User[]> {
    return await this.adminService.getAllUserInformation()
  }


  @Post('/dashboard/report')
  @UseInterceptors(FileInterceptor('file', MulterOptionsExcel))
  async createReport(@UploadedFile() file: Express.Multer.File): Promise<messageResponse> {
    return await this.adminService.createReport(file.path)
  }



  @Get('/dashboard/user-allPayment')
  @HttpCode(HttpStatus.OK)
  async getUserAllPayment(): Promise<User[]> {
    return await this.adminService.getUserAllPayment()
  }


  @Get('/dashboard/user-allPayment/:woltId')
  @HttpCode(HttpStatus.OK)
  async getUserSinglePayment(@Param('woltId') woltId: string): Promise<User> {
    return await this.adminService.getUserSinglePayment(woltId)
  }



  @Patch('/dashboard/user-paymentStatus/:woltId')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async updateUserPaymentStatus(@Param('woltId') woltId: string, @Body() updateReportStatusDto: UpdateReportStatusDto): Promise<messageResponse> {
    return await this.adminService.updateUserPaymentStatus(woltId, updateReportStatusDto)
  }


  @Get('/dashboard/allSupport')
  @HttpCode(HttpStatus.OK)
  async getAllSupportNotification(): Promise<Notification[]> {
    return await this.adminService.getAllSupportNotification()
  }

  @Patch('/dashboard/user/profile/update/:_id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileFieldsInterceptor([{ name: 'profilePhoto', maxCount: 1 }, { name: 'idCard', maxCount: 2 }, { name: 'driverLicensePhoto', maxCount: 4 }, { name: 'carTechnicalPassportPhoto', maxCount: 4 }], MulterOptions))
  async updateProfile(@Param('_id') _id: string, @Body() updateUserDto: UpdateUserDto, @UploadedFiles() files: { profilePhoto: Express.Multer.File[], idCard: Express.Multer.File[], driverLicensePhoto: Express.Multer.File[], carTechnicalPassportPhoto: Express.Multer.File[] }): Promise<messageResponse> {
    return await this.adminService.updateProfile(_id, updateUserDto, files)
  }


  @Post('/dashboard/user-confirmation')
  @HttpCode(HttpStatus.OK)
  async userConfirmation(id:string):Promise<messageResponse>{
    return await this.adminService.userConfirmation(id)
  }


}

