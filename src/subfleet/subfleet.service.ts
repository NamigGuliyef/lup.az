import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { tokenRequestType } from 'src/middleware/tokenReqType';
import { subFleetName } from 'src/subfleetname/schema/subfleetname.schema';

@Injectable()
export class SubfleetService {
  constructor(
    @Inject(REQUEST) private readonly req: tokenRequestType,
    @InjectModel('subfleetname')
    private readonly subFleetNameModel: Model<subFleetName>,
  ) {}

  // subfleet gore userleri gormek
  async getAllUserBySubFleet(): Promise<subFleetName> {
    return await this.subFleetNameModel.findOne({ _id:this.req.user._id });
  }
}
