import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import * as ExcelJS from 'exceljs';
import { Model } from 'mongoose';
import { CourierPay } from '../courier_pay/model/pay.schema';
import { UpdateReportStatusDto } from '../courier_report/dto/report.dto';
import { CourierReport } from '../courier_report/model/report.schema';
import { tokenRequestType } from '../middleware/tokenReqType';
import {
  CreateNotificationCategoryDto,
  UpdateNotificationCategoryDto,
} from '../notification-category/dto/notificationCategory.dto';
import { NotificationCategory } from '../notification-category/model/notificationCategory.schema';
import { CreateNotificationDto } from '../notification/dto/notification.dto';
import { Notification } from '../notification/model/notification.schema';
import {
  CreateSubFleetNameDto,
  UpdateSubFleetNameDto,
} from '../subfleetname/dto/subfleetname.dto';
import { subFleetName } from '../subfleetname/schema/subfleetname.schema';
import { User } from '../user/model/user.schema';
import { messageResponse } from './admin.types';

@Injectable()
export class AdminService {
  constructor(
    @Inject(REQUEST) private readonly req:tokenRequestType,
    @InjectModel('user') private readonly userModel: Model<User>,
    @InjectModel('subfleetname')
    private readonly subFleetNameModel: Model<subFleetName>,
    @InjectModel('notificationCategory')
    private readonly notificationCategoryModel: Model<NotificationCategory>,
    @InjectModel('notification')
    private readonly notificationModel: Model<Notification>,
    @InjectModel('report')
    private readonly courierReportModel: Model<CourierReport>,
    @InjectModel('courier_pay')
    private readonly courierPayModel: Model<CourierPay>
  ) {}

  // sub fleet name create
  async createSubFleetName(
    createsubFleetNameDto: CreateSubFleetNameDto,
  ): Promise<subFleetName> {
    const subFleetNameExist = await this.subFleetNameModel.findOne({
      name: createsubFleetNameDto.name,
    });
    if (subFleetNameExist)
      throw new HttpException(
        'Sub fleet name already exists',
        HttpStatus.CONFLICT,
      );
    return await this.subFleetNameModel.create(createsubFleetNameDto);
  }

  // sub fleet name delete
  // async deleteSubFleetName(_id: string): Promise<messageResponse> {
  //   const subFleetNameExist = await this.subFleetNameModel.findById(_id)
  //   if (!subFleetNameExist) throw new HttpException('Sub fleet name not found', HttpStatus.NOT_FOUND)
  //   await this.subFleetNameModel.findByIdAndDelete(_id)
  //   return { message: 'Subfleet name deleted' }
  // }

  // sub fleet name update
  async updateSubFleetName(
    _id: string,
    updateSubFleetNameDto: UpdateSubFleetNameDto,
  ): Promise<subFleetName> {
    const subFleetName = await this.subFleetNameModel.findById(_id);
    if (!subFleetName)
      throw new HttpException('Sub fleet name not found', HttpStatus.NOT_FOUND);
    const subFleetNameExist = await this.subFleetNameModel.findOne({
      name: updateSubFleetNameDto.name,
    });
    if (subFleetNameExist)
      throw new HttpException(
        'Sub fleet name already exi  sts',
        HttpStatus.CONFLICT,
      );
    return await this.subFleetNameModel.findByIdAndUpdate(
      _id,
      { $set: updateSubFleetNameDto },
      { new: true },
    );
  }

  // get all sub fleet name
  async getAllSubFleetName(): Promise<subFleetName[]> {
    return await this.subFleetNameModel.find();
  }

  // notification category create
  async createNotificationCategory( createNotificationCategoryDto: CreateNotificationCategoryDto ): Promise<NotificationCategory> {
    const notificationCategoryExist = await this.notificationCategoryModel.findOne({ name: createNotificationCategoryDto.name });
    if (notificationCategoryExist) throw new HttpException( 'Notification category already exists', HttpStatus.CONFLICT );
    return await this.notificationCategoryModel.create( createNotificationCategoryDto );
  }

  // notification category delete
  // async deleteNotificationCategory(_id: string): Promise<messageResponse> {
  //   const notificationCategoryExist = await this.notificationCategoryModel.findById(_id)
  //   if (!notificationCategoryExist) throw new HttpException('Notification category not found', HttpStatus.NOT_FOUND)
  //   await this.notificationCategoryModel.findByIdAndDelete(_id)
  //   return { message: 'Notification category deleted' }
  // }

  // notification category update
  async updateNotificationCategory(
    _id: string,
    updateNotificationCategoryDto: UpdateNotificationCategoryDto,
  ): Promise<NotificationCategory> {
    const notificationCategory = await this.notificationCategoryModel.findById(
      _id,
    );
    if (!notificationCategory)
      throw new HttpException(
        'Notification category not found',
        HttpStatus.NOT_FOUND,
      );
    const notificationCategoryExist =
      await this.notificationCategoryModel.findOne({
        name: updateNotificationCategoryDto.name,
      });
    if (notificationCategoryExist)
      throw new HttpException(
        'Notification category already exists',
        HttpStatus.CONFLICT,
      );
    return await this.notificationCategoryModel.findByIdAndUpdate(
      _id,
      { $set: updateNotificationCategoryDto },
      { new: true },
    );
  }

  // get all notification category
  async getAllNotificationCategory(): Promise<NotificationCategory[]> {
    return await this.notificationCategoryModel.find({ type:"admin" });
  }


  // send notification
  async sendNotification(
    createNotificationDto: CreateNotificationDto,
  ): Promise<messageResponse> {
    const notification = await this.notificationModel.create({
      ...createNotificationDto,
      type: 'notification',
    });
    await this.userModel.updateMany(
      { role: 'user' },
      { $push: { notifications: notification._id } },
    );
    return { message: 'Notifications have been sent to couriers successfully' };
  }


  // all support message
  async getAllSupportMessage(): Promise<Notification[]> {
    return await this.notificationModel.find({ type: 'support' }).populate([
      {
        path: 'user',
        select: [
          'courierName',
          'courierSurname',
          'courierFatherName',
          'courierPhone',
        ],
      },
      { path: 'category' },
    ]);
  }

  // all user about information
  async getAllUserInformation(): Promise<User[]> {
    return await this.userModel
      .find().populate([{path:'myPaymentIds',select:'total_earning'}])
      .select(['username', 'courierName', 'courierSurname', 'email']);
  }


  // create report
  async createReport(filePath: string): Promise<messageResponse> {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1);
    worksheet.eachRow({ includeEmpty: true }, async (row, _rowNumber) => {      
      if (_rowNumber !== 1) {
        const values = row.values;        
        const rowData = {
          courierId: values[2],
          fullname: values[3],
          total_earning: values[4],
          delivered_order: values[5],
          debt: values[6],
        };
        const userPayment = await this.courierReportModel.create(rowData);
        await this.userModel.findOneAndUpdate({ woltId:userPayment.courierId },{ $push:{ myPaymentIds:userPayment._id }})
      }
    });
    return { message: 'Added new information' };
  }


  // all user payment
  async getUserAllPayment():Promise<User[]>{
    return await this.userModel.find({role:'user'}).populate([{path:'myPaymentIds'}]).select('-password')
  }


  // single user payment
  async getUserSinglePayment(woltId:string):Promise<User>{
    const userSinglePayment=await this.userModel.findOne({woltId, role:'user'}).select('-password')
    if(!userSinglePayment) throw new HttpException('User payment information not found', HttpStatus.NOT_FOUND)
    return userSinglePayment.populate([ {path:'myPaymentIds'} ])
  }


  // user all payment 
  async updateUserPaymentStatus(woltId:string,updateReportStatusDto:UpdateReportStatusDto):Promise<messageResponse>{
    const userExist=await this.userModel.findOne({woltId})
    if(!userExist){
      throw new HttpException("User not found",HttpStatus.NOT_FOUND)
    }
      await this.courierReportModel.findOneAndUpdate({courierId:woltId},{ $set:{status:updateReportStatusDto.status}})    
      return { message: "Status changed successfully" }
  }


  // all admin support notifications
  async getAllSupportNotification():Promise<Notification[]>{
    return await this.notificationModel.find({ type: "support" })
  }

  // istifadəçi təsdiqi false => true
 async userConfirmation(id:string ):Promise<messageResponse>{
  const userActive = await this.userModel.findByIdAndUpdate(id, { $set:{ isActive:true }} , { new:true }) // userActive-i true edildi
  // subfleet id-si user-in subfleet id si tapilir ve subfleet -in kuryerlerinin massivinin icerisine aktiv edilen user-in id-si elave edilir
  await this.subFleetNameModel.findOneAndUpdate({ _id:userActive.subFleetName },{ $push: { courierIds:userActive._id} },{ new:true })
    return  { message: "User activated"}
 }


}
