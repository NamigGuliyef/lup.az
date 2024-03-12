import { Test, TestingModule } from '@nestjs/testing';
import { SubfleetController } from './subfleet.controller';

describe('SubfleetController', () => {
  let controller: SubfleetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubfleetController],
    }).compile();

    controller = module.get<SubfleetController>(SubfleetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
