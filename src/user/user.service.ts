import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationCategory } from '../notification-category/model/notificationCategory.schema';
import { Notification } from '../notification/model/notification.schema';
import { messageResponse } from '../admin/admin.types';
import cloudinary from '../config/cloudinary';
import { comparePassword, hashPassword } from '../helpers/hash_compare';
import { tokenRequestType } from '../middleware/tokenReqType';
import { CreateSupportDto } from '../notification/dto/notification.dto';
import { UpdateUserDto } from './dto/user.dto';
import { User } from './model/user.schema';

@Injectable()
export class UserService {
  constructor(
    @Inject(REQUEST) private readonly req: tokenRequestType,
    @InjectModel('user') private readonly userModel: Model<User>, @InjectModel('notification') private readonly notificationModel: Model<Notification>,
    @InjectModel('notificationCategory')
    private readonly notificationCategoryModel: Model<NotificationCategory>) { }


  // user profile information
  async getUserProfile(): Promise<User> {
    const userExist = await this.userModel.findOne({ email: this.req.user.email }).populate([{ path: 'subFleetName', select: 'name' }, {
      path: 'notifications', populate: { path: 'category' },
    }, { path: 'myPaymentIds' }]).select('-password')
    if (!userExist) throw new HttpException('User not found', HttpStatus.OK)
    return userExist
  }


  // user support create
  async createSupportMessage(createSupportDto: CreateSupportDto): Promise<Notification> {
    return await this.notificationModel.create({ ...createSupportDto, user: this.req.user._id, type: "support" })
  }


  // all user notifications
  async getAllUserNotification(): Promise<Notification[]> {
    return await this.notificationModel.find({ type: "notification" })
  }


  // all notification category
  async getAllNotificationCategory(): Promise<NotificationCategory[]> {
    return await this.notificationCategoryModel.find({ type: "user" })
  }


}
