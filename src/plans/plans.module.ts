import { Module } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { PlansGroup } from '../plans-groups/entities/plans-group.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Plan, PlansGroup])],
    controllers: [PlansController],
    providers: [PlansService],
})
export class PlansModule {}
