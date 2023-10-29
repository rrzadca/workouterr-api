import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PlanModule } from './plan/plan.module';
import { TrainingModule } from './training/training.module';
import { ExerciseModule } from './exercise/exercise.module';

@Module({
  imports: [UserModule, PlanModule, TrainingModule, ExerciseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
