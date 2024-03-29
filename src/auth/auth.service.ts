import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { tokenResponse, UserSignIn, userSignUpResponse } from '../auth/auth.type';
import cloudinary from '../config/cloudinary';
import { comparePassword, hashPassword } from '../helpers/hash_compare';
import { CreateUserDto } from '../user/dto/user.dto';
import { User } from '../user/model/user.schema';
import { sign } from 'jsonwebtoken'
import { jwtSecret } from '../config/jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) { }

  // courier registration => sign-up
  async signUp(createUserDto: CreateUserDto, files: { profilePhoto: Express.Multer.File[], idCard: Express.Multer.File[], driverLicensePhoto: Express.Multer.File[], carTechnicalPassportPhoto: Express.Multer.File[] }): Promise<userSignUpResponse> {
    // user-in tekrar olub olmadigini yoxlayir email ile
    const userEmailExist = await this.userModel.findOne({ email: createUserDto.email })
    if (userEmailExist) throw new HttpException('User email already exists', HttpStatus.CONFLICT)
    // user-in tekrar olub olmadigini yoxlayir phone ile
    const userPhoneExist = await this.userModel.findOne({ courierPhone: createUserDto.courierPhone })
    if (userPhoneExist) throw new HttpException('User phone already exists', HttpStatus.CONFLICT)
    // user-in tekrar olub olmadigini yoxlayir woltId ile
    // const userWoltIdExist = await this.userModel.findOne({ woltId: createUserDto.woltId })
    // if (userWoltIdExist) throw new HttpException('User woltId already exists', HttpStatus.CONFLICT)
    let profilePhoto = []
    let idCard = []
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
      // id Card yukleme
      for (let i = 0; i < files.idCard.length; i++) {
        const data = await cloudinary.uploader.upload(files.idCard[i].path, { public_id: files.idCard[i].originalname })
        idCard.push(data.url)
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

      await this.userModel.create({ ...createUserDto, username: nameSurnameExist, password: await hashPassword(createUserDto.password), profilePhoto, idCard, driverLicensePhoto, carTechnicalPassportPhoto })
      return { message: 'You have registered successfully' }
    } else {
      const nameSurname = createUserDto.courierName.slice(0, 1).toLowerCase() + createUserDto.courierSurname.toLowerCase()
      await this.userModel.create({ ...createUserDto, username: nameSurname, password: await hashPassword(createUserDto.password), profilePhoto, idCard, driverLicensePhoto, carTechnicalPassportPhoto })
      return { message: 'You have registered successfully' }
    }
  }


  // courier registration => sign-in
  async signIn(userSign: UserSignIn): Promise<tokenResponse> {
    const userPhoneExist = await this.userModel.findOne({ courierPhone: userSign.courierPhone })
    if (!userPhoneExist) throw new HttpException('User phone is wrong', HttpStatus.BAD_REQUEST)
    const passwordRight = await comparePassword(userSign.password, userPhoneExist.password)
    if (!passwordRight) throw new HttpException('Password is wrong', HttpStatus.UNAUTHORIZED)
    if (userPhoneExist.isActive === false) throw new HttpException('User has not been activated by admin', HttpStatus.BAD_REQUEST)
    const token = sign({
      _id: userPhoneExist._id, courierName: userPhoneExist.courierName, courierSurname: userPhoneExist.courierSurname,
      courierPhone: userPhoneExist.courierPhone, email: userPhoneExist.email, role: userPhoneExist.role
    }, jwtSecret, { expiresIn: '2h' })
    return { token, message: 'You are successfully logged in.', role: userPhoneExist.role }
  }

}

