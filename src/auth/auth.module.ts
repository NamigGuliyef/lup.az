import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { subFleetNameModel } from 'src/subfleetname/schema/subfleetname.schema';
import { userModel } from 'src/user/model/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: userModel }, { name: 'subfleetname', schema: subFleetNameModel }])],
  controllers: [AuthController],
  providers: [AuthService,]
})
export class AuthModule { }
