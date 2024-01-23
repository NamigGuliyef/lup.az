import { Controller, Post, HttpCode, HttpStatus, UsePipes, ValidationPipe, UseInterceptors, Body, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { CreateUserDto } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { userSignUpResponse } from './auth.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // courier registration sign up
  @Post('/sign-up')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileFieldsInterceptor([{ name: 'profilePhoto', maxCount: 1 }, { name: 'driverLicensePhoto', maxCount: 4 }, { name: 'carTechnicalPassportPhoto', maxCount: 4 }]))


  async signUp(@Body() createUserDto: CreateUserDto, @UploadedFiles() files: { profilePhoto: Express.Multer.File[], driverLicensePhoto: Express.Multer.File[], carTechnicalPassportPhoto: Express.Multer.File }): Promise<userSignUpResponse> {
    return await this.authService.signUp(createUserDto, files)
  }

}
