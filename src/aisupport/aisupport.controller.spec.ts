import { Test, TestingModule } from '@nestjs/testing';
import { AisupportController } from './aisupport.controller';

describe('AisupportController', () => {
  let controller: AisupportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AisupportController],
    }).compile();

    controller = module.get<AisupportController>(AisupportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
