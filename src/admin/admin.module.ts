import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { subFleetNameModel } from 'src/subfleetname/schema/subfleetname.schema';
import { userModel } from 'src/user/model/user.schema';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { notificationModel } from 'src/notification/model/notification.schema';
import { NotificationCategoryModel } from 'src/notification-category/model/notificationCategory.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: userModel }, { name: 'subfleetname', schema: subFleetNameModel },
  { name: 'notification', schema: notificationModel },{ name: 'notificationCategory', schema: NotificationCategoryModel }])],
  providers: [AdminService],
  controllers: [AdminController]
})



export class AdminModule { }
