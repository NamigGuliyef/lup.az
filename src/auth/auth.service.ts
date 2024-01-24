import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { tokenResponse, UserSignIn, userSignUpResponse } from 'src/auth/auth.type';
import cloudinary from 'src/config/cloudinary';
import { comparePassword, hashPassword } from 'src/helpers/hash_compare';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/model/user.schema';


@Injectable()
export class AuthService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) { }

  // courier registration => sign-up
  async signUp(createUserDto: CreateUserDto, files: { profilePhoto: Express.Multer.File[], driverLicensePhoto: Express.Multer.File[], carTechnicalPassportPhoto: Express.Multer.File[] }): Promise<userSignUpResponse> {
    console.log(files);

    const userExist = await this.userModel.findOne({ email: createUserDto.email })
    // user-in tekrar olub olmadigini yoxlayir email ile
    if (userExist) throw new HttpException('User already exists', HttpStatus.CONFLICT)
    let profilePhoto = []
    let driverLicensePhoto = []
    let carTechnicalPassportPhoto = []
    const courierNameSurnameExist = await this.userModel.find({ courierName: createUserDto.courierName, courierSurname: createUserDto.courierSurname })
    // əgər eyni ad və soyadda emekdas varsa username avtomatik reqemler atacaq
    if (courierNameSurnameExist) {
      const nameSurnameExist = createUserDto.courierName.slice(0, 1).toLowerCase() + createUserDto.courierSurname.toLowerCase() + courierNameSurnameExist.length
      // profil foto yukleme
      for (let i = 0; i < files.profilePhoto.length; i++) {
        const data = await cloudinary.uploader.upload(files.profilePhoto[i].path, { public_id: files.profilePhoto[i].originalname })
        profilePhoto.push(data.url)
      }
      // suruculuk vesiqesi yukleme
      for (let i = 0; i < files.driverLicensePhoto.length; i++) {
        const data = await cloudinary.uploader.upload(files.driverLicensePhoto[i].path, { public_id: files.driverLicensePhoto[i].originalname })
        driverLicensePhoto.push(data.url)
      }
      // texniki pasportu yukleme
      for (let i = 0; i < files.carTechnicalPassportPhoto.length; i++) {
        const data = await cloudinary.uploader.upload(files.carTechnicalPassportPhoto[i].path, { public_id: files.carTechnicalPassportPhoto[i].originalname })
        carTechnicalPassportPhoto.push(data.url)
      }

      await this.userModel.create({ ...createUserDto, username: nameSurnameExist, password: await hashPassword(createUserDto.password), profilePhoto, driverLicensePhoto, carTechnicalPassportPhoto })
      return { message: 'You have registered successfully' }
    } else {
      const nameSurname = createUserDto.courierName.slice(0, 1).toLowerCase() + createUserDto.courierSurname.toLowerCase()
      await this.userModel.create({ ...createUserDto, username: nameSurname, password: await hashPassword(createUserDto.password), profilePhoto, driverLicensePhoto, carTechnicalPassportPhoto })
      return { message: 'You have registered successfully' }
    }
  }


  // courier registration => sign-in
  async signIn(userSign: UserSignIn): Promise<tokenResponse> {
    const userEmailExist = await this.userModel.findOne({ email: userSign.email })
    if (!userEmailExist) throw new HttpException('Email is wrong', HttpStatus.BAD_REQUEST)
    const passwordRight = await comparePassword(userSign.password, userEmailExist.password)
    if(!passwordRight) throw new HttpException()
  }

}

