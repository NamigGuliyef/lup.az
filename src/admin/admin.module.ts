import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { subFleetNameModel } from '../subfleet/schema/subfleetname.schema';
import { userModel } from '../user/model/user.schema';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { notificationModel } from '../notification/model/notification.schema';
import { NotificationCategoryModel } from '../notification-category/model/notificationCategory.schema';
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
      { name: 'courier_pay', schema: courierPayModel },
    ]),
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
