import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { subFleetName } from 'src/subfleetname/schema/subfleetname.schema';

@Injectable()
export class GuestService {

  constructor(  @InjectModel('subfleetname')
  private readonly subFleetNameModel: Model<subFleetName>){}




}
