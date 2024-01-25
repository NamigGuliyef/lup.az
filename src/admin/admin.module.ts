import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { subFleetNameModel } from 'src/subfleetname/schema/subfleetname.schema';
import { userModel } from 'src/user/model/user.schema';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: userModel }, { name: 'subfleetname', schema: subFleetNameModel }])],
  providers: [AdminService],
  controllers: [AdminController]
})



export class AdminModule { }
