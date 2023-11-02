import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../share/base.service';

@Injectable()
export class ExercisesService extends BaseService {
    constructor(
        @InjectRepository(Exercise)
        private readonly repository: Repository<Exercise>,
    ) {
        super();
    }

    async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
        return await this.repository.save({
            ...createExerciseDto,
            createdOn: new Date(),
        });
    }

    async findAll(): Promise<Exercise[]> {
        return await this.repository.find();
    }

    async findOne(id: string): Promise<Exercise> {
        const exercise = await this.repository.findOneBy({
            id: id,
        });

        if (!exercise) {
            this.logNotFoundWarning(id);
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
            this.logNotFoundWarning(id);
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
            this.logNotFoundWarning(id);
            throw new NotFoundException();
        }

        await this.repository.remove(exercise);
    }
}
