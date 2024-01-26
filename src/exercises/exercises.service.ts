import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ExercisesService {
    private readonly logger = new Logger(ExercisesService.name);

    constructor(
        @InjectRepository(Exercise)
        private readonly repository: Repository<Exercise>,
    ) {}

    async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
        return await this.repository.save({
            ...createExerciseDto,
            createdOn: new Date(),
        });
    }

    async find(name?: string): Promise<Exercise[]> {
        return await this.repository.findBy({ name: name });
    }

    async findOne(id: string): Promise<Exercise> {
        const exercise = await this.repository.findOneBy({
            id: id,
        });

        if (!exercise) {
            this.logger.warn(`Cannot find ${Exercise.name} with :id=${id}`);
            throw new NotFoundException();
        }

        return exercise;
    }

    async update(
        id: string,
        updateExerciseDto: UpdateExerciseDto,
    ): Promise<Exercise> {
        const exercise = await this.findOne(id);

        if (!exercise) {
            this.logger.warn(`Cannot find ${Exercise.name} with :id=${id}`);
            throw new NotFoundException();
        }

        return await this.repository.save({
            ...exercise,
            ...updateExerciseDto,
            updatedOn: new Date(),
        });
    }

    async remove(id: string) {
        const exercise = await this.findOne(id);

        if (!exercise) {
            this.logger.warn(`Cannot find ${Exercise.name} with :id=${id}`);
            throw new NotFoundException();
        }

        await this.repository.remove(exercise);
    }
}
