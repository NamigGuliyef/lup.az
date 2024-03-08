import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { subFleetNameModel } from 'src/subfleetname/schema/subfleetname.schema';
import { GuestController } from './guest.controller';
import { GuestService } from './guest.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'subfleetname', schema: subFleetNameModel }])],
  providers: [GuestService],
  controllers: [GuestController]
})
export class GuestModule { }
