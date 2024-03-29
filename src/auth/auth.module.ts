import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { subFleetNameModel } from '../subfleet/schema/subfleetname.schema';
import { userModel } from '../user/model/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { NotificationCategory, NotificationCategoryModel } from '../notification-category/model/notificationCategory.schema';
import { notificationModel } from '../notification/model/notification.schema';
import { courierReportModel } from '../courier_report/model/report.schema';
import { courierPayModel } from '../courier_pay/model/pay.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'user', schema: userModel },
      { name: 'subfleetname', schema: subFleetNameModel },
      { name: 'notification', schema: notificationModel },
      { name: 'notificationCategory', schema: NotificationCategoryModel },
      { name: 'report', schema: courierReportModel },
      { name: 'courier_pay', schema: courierPayModel }
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
