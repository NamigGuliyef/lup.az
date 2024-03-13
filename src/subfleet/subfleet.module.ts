import { Module } from '@nestjs/common';
import { SubfleetController } from './subfleet.controller';
import { SubfleetService } from './subfleet.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userModel } from 'src/user/model/user.schema';
import { subFleetNameModel } from 'src/subfleet/schema/subfleetname.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: userModel },{name:'subfleetname',schema:subFleetNameModel}])],
  controllers: [SubfleetController],
  providers: [SubfleetService],
})
export class SubfleetModule {}
