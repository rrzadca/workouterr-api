import { Module } from '@nestjs/common';
import { PlansGroupsService } from './plans-groups.service';
import { PlansGroupsController } from './plans-groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlansGroup } from './entities/plans-group.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PlansGroup])],
    controllers: [PlansGroupsController],
    providers: [PlansGroupsService],
})
export class PlansGroupsModule {}
