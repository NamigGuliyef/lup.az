import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userModel } from './model/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { notificationModel } from '../notification/model/notification.schema';
import { NotificationCategory } from '../notification-category/model/notificationCategory.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: userModel },{ name: 'notification', schema: notificationModel },{name:"notificationCategory",schema:NotificationCategory}])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
