import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { subFleetName } from 'src/subfleet/schema/subfleetname.schema';
import { SubfleetService } from './subfleet.service';

@Controller('subfleet')
export class SubfleetController {
  constructor(private readonly subFleetService: SubfleetService){};

  @Get('/all-user')
  @HttpCode(HttpStatus.OK)
  async getAllUserBySubFleet(): Promise<subFleetName> {
    return this.subFleetService.getAllUserBySubFleet();
  }
}
