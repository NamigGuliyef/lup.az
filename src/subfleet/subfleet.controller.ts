import { Controller } from '@nestjs/common';
import { subFleetName } from 'src/subfleetname/schema/subfleetname.schema';
import { SubfleetService } from './subfleet.service';

@Controller('subfleet')
export class SubfleetController {
  constructor(private readonly subFleetService: SubfleetService){};

  async getAllUserBySubFleet(): Promise<subFleetName> {
    return this.subFleetService.getAllUserBySubFleet();
  }
}
