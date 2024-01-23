import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userSignUpResponse } from 'src/auth/auth.type';
import { hashPassword } from 'src/helpers/hash_compare';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/model/user.schema';


@Injectable()
export class AuthService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) { }

  // courier registration => sign-up
  async signUp(createUserDto: CreateUserDto, files: { profilePhoto: Express.Multer.File[], driverLicensePhoto: Express.Multer.File[], carTechnicalPassportPhoto: Express.Multer.File }): Promise<userSignUpResponse> {
    const userExist = await this.userModel.findOne({ email: createUserDto.email })
    if (userExist) throw new HttpException('User already exists', HttpStatus.CONFLICT)
    await this.userModel.create({ ...createUserDto, password: hashPassword, files })
    return { message: 'You have registered successfully' }
  }



}


