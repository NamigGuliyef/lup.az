import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { tokenRequestType } from 'src/middleware/tokenReqType';
import { User } from './model/user.schema';
import { CreateNotificationDto, CreateSupportDto } from 'src/notification/dto/notification.dto';


@Injectable()
export class UserService {
  constructor(
    @Inject(REQUEST) private readonly req: tokenRequestType,
    @InjectModel('user') private readonly userModel: Model<User>,  @InjectModel('notification') private readonly notificationModel:Model<Notification>) { }


  // user profile information
  async getUserProfile(): Promise<User> {
    const userExist = await this.userModel.findOne({ email: this.req.user.email }).populate([{ path: 'subFleetName', select: 'name' }, { path: 'notifications', populate: { path: 'category' } }]).select('-password')
    if (!userExist) throw new HttpException('User not found', HttpStatus.OK)
    return userExist
  }

  // user support create
  async createSupportMessage(createSupportDto: CreateSupportDto):Promise<Notification>{
      return await this.notificationModel.create({...createSupportDto, user : this.req.user._id, type: "support"})
  }


}
