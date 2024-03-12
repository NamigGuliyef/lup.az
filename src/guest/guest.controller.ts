import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { subFleetName } from 'src/subfleetname/schema/subfleetname.schema';
import { GuestService } from './guest.service';

@Controller('guest')
export class GuestController {
  constructor(private readonly guestService: GuestService){}

    // get all sub fleet name
    @Get('/subfleetname')
    @HttpCode(HttpStatus.OK)
    async getAllSubFleetName(): Promise<subFleetName[]> {
      return await this.guestService.getAllSubFleetName()
    }

}
