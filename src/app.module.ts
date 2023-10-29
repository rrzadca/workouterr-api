import { Module } from '@nestjs/common';
import { UserModule } from './crud/user/user.module';
import { PlanModule } from './crud/plan/plan.module';
import { TrainingModule } from './crud/training/training.module';
import { ExerciseModule } from './crud/exercise/exercise.module';

@Module({
  imports: [UserModule, PlanModule, TrainingModule, ExerciseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
