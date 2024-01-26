import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNotificationCategoryDto } from 'src/notification-category/dto/notificationCategory.dto';
import { NotificationCategory } from 'src/notification-category/model/notificationCategory.schema';
import { CreateSubFleetNameDto } from 'src/subfleetname/dto/subfleetname.dto';
import { subFleetName } from 'src/subfleetname/schema/subfleetname.schema';
import { User } from 'src/user/model/user.schema';
import { messageResponse } from './admin.types';

@Injectable()
export class AdminService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>, @InjectModel('subfleetname') private readonly subFleetNameModel: Model<subFleetName>,
  @InjectModel('notificationCategory') private readonly notificationCategoryModel: Model<NotificationCategory>,@InjectModel('notification') private readonly notificationModel: Model<Notification>
) { }

  // sub fleet name create
  async createSubFleetName(createsubFleetNameDto: CreateSubFleetNameDto): Promise<subFleetName> {
    const subFleetNameExist = await this.subFleetNameModel.findOne({ name: createsubFleetNameDto.name })
    if (subFleetNameExist) throw new HttpException('Sub fleet name already exists', HttpStatus.CONFLICT)
    return await this.subFleetNameModel.create(createsubFleetNameDto)
  }

  // sub fleet name delete
  async deleteSubFleetName(_id:string): Promise<messageResponse> {
    const subFleetNameExist = await this.subFleetNameModel.findById(_id)
    if (!subFleetNameExist) throw new HttpException('Sub fleet name not found', HttpStatus.NOT_FOUND)
    await this.subFleetNameModel.findByIdAndDelete(_id)
    return {message:'Subfleet name deleted'}
  }


  // notification category create
  async createNotificationCategory(createNotificationCategoryDto:CreateNotificationCategoryDto):Promise<NotificationCategory>{
    const notificationCategoryExist=await this.notificationCategoryModel.findOne({name:createNotificationCategoryDto.name})
    if(notificationCategoryExist) throw new HttpException('Notification category already exists',HttpStatus.CONFLICT)
     return await this.notificationCategoryModel.create(createNotificationCategoryDto)
  }

  // notification category delete
  async deleteNotificationCategory(_id:string):Promise<messageResponse>{
    const notificationCategoryExist=await this.notificationCategoryModel.findById(_id)
    if(!notificationCategoryExist) throw new HttpException('Notification category not found',HttpStatus.NOT_FOUND)
    await this.notificationCategoryModel.findByIdAndDelete(_id)
    return {message:'Notification category deleted'} 
  }


}
