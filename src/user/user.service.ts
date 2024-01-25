import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { tokenRequestType } from 'src/middleware/tokenReqType';
import { User } from './model/user.schema';


@Injectable()
export class UserService {
  constructor(
    @Inject(REQUEST) private readonly req: tokenRequestType,
    @InjectModel('user') private readonly userModel: Model<User>) { }


  // user profile information
  async getUserProfile(): Promise<User> {
    const userExist = await this.userModel.findOne({ email: this.req.user.email }).populate({ path: 'subFleetName', select: 'name' }).select('-password')
    if (!userExist) throw new HttpException('User not found', HttpStatus.OK)
    return userExist
  }
}
