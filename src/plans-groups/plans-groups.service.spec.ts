import { Test, TestingModule } from '@nestjs/testing';
import { PlansGroupsService } from './plans-groups.service';

describe('PlansGroupsService', () => {
  let service: PlansGroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlansGroupsService],
    }).compile();

    service = module.get<PlansGroupsService>(PlansGroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
