import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationCategory } from 'src/notification-category/model/notificationCategory.schema';
import { Notification } from 'src/notification/model/notification.schema';
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


  // user update profile
  async updateProfile(updateUserDto: UpdateUserDto, files: { profilePhoto: Express.Multer.File[], driverLicensePhoto: Express.Multer.File[], carTechnicalPassportPhoto: Express.Multer.File[] }): Promise<messageResponse> {
    const userExist = await this.userModel.findById({ _id: this.req.user._id })
    if (!userExist) throw new HttpException('User not found', HttpStatus.NOT_FOUND)

    if ((files.profilePhoto && files.profilePhoto[0] && files.profilePhoto[0].path) || (files.driverLicensePhoto && files.driverLicensePhoto[0] && files.driverLicensePhoto[0].path) || (files.carTechnicalPassportPhoto && files.carTechnicalPassportPhoto[0] && files.carTechnicalPassportPhoto[0].path)) {
      let profilePhoto = []
      let driverLicensePhoto = []
      let carTechnicalPassportPhoto = []
      // eger profile photo varsa
      if ((files.profilePhoto && files.profilePhoto[0] && files.profilePhoto[0].path)) {
        for (let i = 0; i < files.profilePhoto.length; i++) {
          const data = await cloudinary.uploader.upload(files.profilePhoto[i].path, { public_id: files.profilePhoto[i].originalname })
          profilePhoto.push(data.url)
        }
        await this.userModel.findByIdAndUpdate({ _id: this.req.user._id }, { $set: { ...updateUserDto, profilePhoto } }, { new: true })
        return { message: "User information has been changed" }
      }
      // eger driver license photo varsa
      if ((files.driverLicensePhoto && files.driverLicensePhoto[0] && files.driverLicensePhoto[0].path)) {
        for (let i = 0; i < files.driverLicensePhoto.length; i++) {
          const data = await cloudinary.uploader.upload(files.driverLicensePhoto[i].path, { public_id: files.driverLicensePhoto[i].originalname })
          driverLicensePhoto.push(data.url)
        }
        await this.userModel.findByIdAndUpdate({ _id: this.req.user._id }, { $set: { ...updateUserDto, driverLicensePhoto } }, { new: true })
        return { message: "User information has been changed" }
      }
      // eger car Technical Passport Photoo varsa 
      if ((files.carTechnicalPassportPhoto && files.carTechnicalPassportPhoto[0] && files.carTechnicalPassportPhoto[0].path)) {
        for (let i = 0; i < files.carTechnicalPassportPhoto.length; i++) {
          const data = await cloudinary.uploader.upload(files.carTechnicalPassportPhoto[i].path, { public_id: files.carTechnicalPassportPhoto[i].originalname })
          carTechnicalPassportPhoto.push(data.url)
        }
        await this.userModel.findByIdAndUpdate({ _id: this.req.user._id }, { $set: { ...updateUserDto, carTechnicalPassportPhoto } }, { new: true })
        return { message: "User information has been changed" }
      } else {
        await this.userModel.findByIdAndUpdate({ _id: this.req.user._id }, { $set: updateUserDto }, { new: true })
        return { message: "User information has been changed" }
      }

    }
    // əgər parol dəyişir və ya dəyişmirsə
    if (updateUserDto.old_password) {
      const passRight = await comparePassword(updateUserDto.old_password, userExist.password)
      if (!passRight) throw new HttpException('Password is wrong', HttpStatus.UNAUTHORIZED)
      const newHashPass = await hashPassword(updateUserDto.new_password)
      await this.userModel.findByIdAndUpdate({ _id: this.req.user._id }, { $set: { password: newHashPass } }, { new: true })
      return { message: "Your password has been changed" }
    } else {
      await this.userModel.findByIdAndUpdate({ _id: this.req.user._id }, { $set: updateUserDto }, { new: true })
      return { message: "Changed profile information" }
    }
  }


  // user profile information
  async getUserProfile(): Promise<User> {
    const userExist = await this.userModel.findOne({ email: this.req.user.email }).populate([{ path: 'subFleetName', select: 'name' }, { path: 'notifications', populate: { path: 'category' } , 
 },  { path:'myPaymentIds'} ]).select('-password')
    if (!userExist) throw new HttpException('User not found', HttpStatus.OK)
    return userExist
  }


  // user support create
  async createSupportMessage(createSupportDto: CreateSupportDto): Promise<Notification> {
    return await this.notificationModel.create({ ...createSupportDto, user: this.req.user._id, type: "support" })
  }


  // all user notifications
  async getAllUserNotification():Promise<Notification[]>{
    return await this.notificationModel.find({ type: "notification" })
  }


 // all notification category
 async getAllNotificationCategory():Promise<NotificationCategory[]>{
  return await this.notificationCategoryModel.find({ type:"user" })
 }


}
