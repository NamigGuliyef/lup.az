import { Test, TestingModule } from '@nestjs/testing';
import { SubfleetService } from './subfleet.service';

describe('SubfleetService', () => {
  let service: SubfleetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubfleetService],
    }).compile();

    service = module.get<SubfleetService>(SubfleetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
