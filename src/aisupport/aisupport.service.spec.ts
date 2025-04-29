import { Test, TestingModule } from '@nestjs/testing';
import { AisupportService } from './aisupport.service';

describe('AisupportService', () => {
  let service: AisupportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AisupportService],
    }).compile();

    service = module.get<AisupportService>(AisupportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
