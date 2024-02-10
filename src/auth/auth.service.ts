import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { tokenResponse, UserSignIn, userSignUpResponse } from 'src/auth/auth.type';
import cloudinary from 'src/config/cloudinary';
import { comparePassword, hashPassword } from 'src/helpers/hash_compare';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/model/user.schema';
import { sign } from 'jsonwebtoken'
import { jwtSecret } from 'src/config/jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) { }

  // courier registration => sign-up
  async signUp(createUserDto: CreateUserDto, files: { profilePhoto: Express.Multer.File[], driverLicensePhoto: Express.Multer.File[], carTechnicalPassportPhoto: Express.Multer.File[] }): Promise<userSignUpResponse> {
    const userEmailExist = await this.userModel.findOne({ email: createUserDto.email })
    // user-in tekrar olub olmadigini yoxlayir email ile
    if (userEmailExist) throw new HttpException('User email already exists', HttpStatus.CONFLICT)
    const userPhoneExist = await this.userModel.findOne({ courierPhone: createUserDto.courierPhone })
    // user-in tekrar olub olmadigini yoxlayir phone ile
    if (userPhoneExist) throw new HttpException('User phone already exists', HttpStatus.CONFLICT)
    let profilePhoto = []
    let driverLicensePhoto = []
    let carTechnicalPassportPhoto = []
    const courierNameSurnameExist = await this.userModel.find({ courierName: createUserDto.courierName, courierSurname: createUserDto.courierSurname })
    // əgər eyni ad və soyadda emekdas varsa username avtomatik reqemler atacaq
    if (courierNameSurnameExist) {
      const nameSurnameExist = createUserDto.courierName.toLowerCase() + createUserDto.courierSurname.toLowerCase() + courierNameSurnameExist.length
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
    const userPhoneExist = await this.userModel.findOne({ courierPhone: userSign.phoneNumber })
    if (!userPhoneExist) throw new HttpException('User phone is wrong', HttpStatus.BAD_REQUEST)
    const passwordRight = await comparePassword(userSign.password, userPhoneExist.password)
    if (!passwordRight) throw new HttpException('Password is wrong', HttpStatus.UNAUTHORIZED)
    const token = sign({ _id: userPhoneExist._id, courierPhone: userPhoneExist.courierPhone, role: userPhoneExist.role }, jwtSecret, { expiresIn: '2h' })
    return { token, message: 'You are successfully logged in.', role: userPhoneExist.role }
  }

}

