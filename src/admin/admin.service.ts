import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubFleetNameDto } from 'src/subfleetname/dto/subfleetname.dto';
import { subFleetName } from 'src/subfleetname/schema/subfleetname.schema';
import { User } from 'src/user/model/user.schema';

@Injectable()
export class AdminService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>, @InjectModel('subfleetname') private readonly subFleetNameModel: Model<subFleetName>) { }

  // sub fleet name yarat
  async createSubFleetName(createsubFleetNameDto: CreateSubFleetNameDto): Promise<subFleetName> {
    const subFleetNameExist = await this.subFleetNameModel.findOne({ name: createsubFleetNameDto.name })
    if (subFleetNameExist) throw new HttpException('Sub fleet name already exists', HttpStatus.CONFLICT)
    return await this.subFleetNameModel.create(createsubFleetNameDto)
  }

}
