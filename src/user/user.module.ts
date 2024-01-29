import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userModel } from './model/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { notificationModel } from 'src/notification/model/notification.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: userModel },{ name: 'notification', schema: notificationModel }])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
