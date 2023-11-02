import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Logger,
    HttpCode,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';

@Controller('exercises')
export class ExercisesController {
    private readonly logger = new Logger(ExercisesController.name);

    constructor(private readonly exercisesService: ExercisesService) {}

    @Post()
    create(@Body() createExerciseDto: CreateExerciseDto): Promise<Exercise> {
        this.logger.log(`call create`);
        return this.exercisesService.create(createExerciseDto);
    }

    @Get()
    findAll(): Promise<Exercise[]> {
        this.logger.log(`call findAll`);
        return this.exercisesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Exercise> {
        this.logger.log(`call findAll :id=${id}`);
        return this.exercisesService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateExerciseDto: UpdateExerciseDto,
    ): Promise<Exercise> {
        this.logger.log(`call update :id=${id}`);
        return this.exercisesService.update(id, updateExerciseDto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string): Promise<void> {
        this.logger.log(`call remove :id=${id}`);
        return this.exercisesService.remove(id);
    }
}
