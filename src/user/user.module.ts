import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userModel } from './model/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: userModel }])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
