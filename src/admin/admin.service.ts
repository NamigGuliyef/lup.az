import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNotificationCategoryDto, UpdateNotificationCategoryDto } from 'src/notification-category/dto/notificationCategory.dto';
import { NotificationCategory } from 'src/notification-category/model/notificationCategory.schema';
import { CreateNotificationDto } from 'src/notification/dto/notification.dto';
import { Notification } from 'src/notification/model/notification.schema';
import { CreateSubFleetNameDto, UpdateSubFleetNameDto } from 'src/subfleetname/dto/subfleetname.dto';
import { subFleetName } from 'src/subfleetname/schema/subfleetname.schema';
import { User } from 'src/user/model/user.schema';
import { messageResponse } from './admin.types';

@Injectable()
export class AdminService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>, @InjectModel('subfleetname') private readonly subFleetNameModel: Model<subFleetName>,
    @InjectModel('notificationCategory') private readonly notificationCategoryModel: Model<NotificationCategory>,
    @InjectModel('notification') private readonly notificationModel: Model<Notification>
  ) { }

  // sub fleet name create
  async createSubFleetName(createsubFleetNameDto: CreateSubFleetNameDto): Promise<subFleetName> {
    const subFleetNameExist = await this.subFleetNameModel.findOne({ name: createsubFleetNameDto.name })
    if (subFleetNameExist) throw new HttpException('Sub fleet name already exists', HttpStatus.CONFLICT)
    return await this.subFleetNameModel.create(createsubFleetNameDto)
  }


  // sub fleet name delete
  // async deleteSubFleetName(_id: string): Promise<messageResponse> {
  //   const subFleetNameExist = await this.subFleetNameModel.findById(_id)
  //   if (!subFleetNameExist) throw new HttpException('Sub fleet name not found', HttpStatus.NOT_FOUND)
  //   await this.subFleetNameModel.findByIdAndDelete(_id)
  //   return { message: 'Subfleet name deleted' }
  // }


  // sub fleet name update
  async updateSubFleetName(_id: string, updateSubFleetNameDto: UpdateSubFleetNameDto): Promise<subFleetName> {
    const subFleetName = await this.subFleetNameModel.findById(_id)
    if (!subFleetName) throw new HttpException('Sub fleet name not found', HttpStatus.NOT_FOUND)
    const subFleetNameExist = await this.subFleetNameModel.findOne({ name: updateSubFleetNameDto.name })
    if (subFleetNameExist) throw new HttpException('Sub fleet name already exi  sts', HttpStatus.CONFLICT)
    return await this.subFleetNameModel.findByIdAndUpdate(_id, { $set: updateSubFleetNameDto }, { new: true })
  }


  // get all sub fleet name
  async getAllSubFleetName(): Promise<subFleetName[]> {
    return await this.subFleetNameModel.find()
  }

  // notification category create
  async createNotificationCategory(createNotificationCategoryDto: CreateNotificationCategoryDto): Promise<NotificationCategory> {
    const notificationCategoryExist = await this.notificationCategoryModel.findOne({ name: createNotificationCategoryDto.name })
    if (notificationCategoryExist) throw new HttpException('Notification category already exists', HttpStatus.CONFLICT)
    return await this.notificationCategoryModel.create(createNotificationCategoryDto)
  }

  // notification category delete
  // async deleteNotificationCategory(_id: string): Promise<messageResponse> {
  //   const notificationCategoryExist = await this.notificationCategoryModel.findById(_id)
  //   if (!notificationCategoryExist) throw new HttpException('Notification category not found', HttpStatus.NOT_FOUND)
  //   await this.notificationCategoryModel.findByIdAndDelete(_id)
  //   return { message: 'Notification category deleted' }
  // }

  // notification category update
  async updateNotificationCategory(_id: string, updateNotificationCategoryDto: UpdateNotificationCategoryDto): Promise<NotificationCategory> {
    const notificationCategory = await this.notificationCategoryModel.findById(_id)
    if (!notificationCategory) throw new HttpException('Notification category not found', HttpStatus.NOT_FOUND)
    const notificationCategoryExist = await this.notificationCategoryModel.findOne({ name: updateNotificationCategoryDto.name })
    if (notificationCategoryExist) throw new HttpException('Notification category already exists', HttpStatus.CONFLICT)
    return await this.notificationCategoryModel.findByIdAndUpdate(_id, { $set: updateNotificationCategoryDto }, { new: true })
  }


  // get all notification category
  async getAllNotificationCategory(): Promise<NotificationCategory[]> {
    return await this.notificationCategoryModel.find()
  }


  // send notification
  async sendNotification(createNotificationDto: CreateNotificationDto): Promise<messageResponse> {
    const notification = await this.notificationModel.create({ ...createNotificationDto, type: "notification" });
    await this.userModel.updateMany({ role: "user" }, { $push: { notifications: notification._id } })
    return { message: "Notifications have been sent to couriers successfully" };
  }


  // all support message
  async getAllSupportMessage(): Promise<Notification[]> {
    return await this.notificationModel.find({ type: 'support' }).populate([{ path: 'user', select: ['courierName', 'courierSurname', 'courierFatherName', 'courierPhone'] }, { path: 'category' }])
  }

  // all user about information
  async getAllUserInformation(): Promise<User[]> {
    return await this.userModel.find().select(['username', 'courierName', 'courierSurname', 'email'])
  }


}
