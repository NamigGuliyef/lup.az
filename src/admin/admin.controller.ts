import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateSubFleetNameDto } from 'src/subfleetname/dto/subfleetname.dto';
import { subFleetName } from 'src/subfleetname/schema/subfleetname.schema';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  // create sub fleet name
  @Post('/dashboard/subfleetname')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  async createSubFleetName(@Body() createsubFleetNameDto: CreateSubFleetNameDto): Promise<subFleetName> {
    return await this.adminService.createSubFleetName(createsubFleetNameDto)
  }


}
