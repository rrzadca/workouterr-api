import { Test, TestingModule } from '@nestjs/testing';
import { PlansGroupsController } from './plans-groups.controller';
import { PlansGroupsService } from './plans-groups.service';

describe('PlansGroupsController', () => {
  let controller: PlansGroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlansGroupsController],
      providers: [PlansGroupsService],
    }).compile();

    controller = module.get<PlansGroupsController>(PlansGroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
