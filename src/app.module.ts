import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ExcerciseModule } from './excercise/excercise.module';
import { PlanModule } from './plan/plan.module';
import { TrainingModule } from './training/training.module';

@Module({
  imports: [UserModule, ExcerciseModule, PlanModule, TrainingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
