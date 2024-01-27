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
    UseGuards,
    Query,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.auth-guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('exercises')
@Controller('exercises')
export class ExercisesController {
    private readonly logger = new Logger(ExercisesController.name);

    constructor(private readonly exercisesService: ExercisesService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create exercise' })
    @ApiResponse({ type: Exercise })
    async create(
        @Body() createExerciseDto: CreateExerciseDto,
    ): Promise<Exercise> {
        this.logger.log(`call create`);
        this.logger.debug(createExerciseDto);

        return this.exercisesService.create(createExerciseDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Find exercises' })
    @ApiResponse({ type: [Exercise] })
    async find(@Query('name') name?: string): Promise<Exercise[]> {
        this.logger.log(`call find`);
        this.logger.debug(`name: ${name}`);

        return this.exercisesService.find(name);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get exercise details' })
    @ApiResponse({ type: Exercise })
    async findOne(@Param('id') id: string): Promise<Exercise> {
        this.logger.log(`call findOne`);
        this.logger.debug(`id: ${id}`);

        return this.exercisesService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update exercise' })
    @ApiResponse({ type: Exercise })
    async update(
        @Param('id') id: string,
        @Body() updateExerciseDto: UpdateExerciseDto,
    ): Promise<Exercise> {
        this.logger.log(`call update`);
        this.logger.debug(`id: ${id}`);
        this.logger.debug(updateExerciseDto);

        return this.exercisesService.update(id, updateExerciseDto);
    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete exercise' })
    async remove(@Param('id') id: string): Promise<void> {
        this.logger.log(`call remove`);
        this.logger.debug(`id: ${id}`);

        return this.exercisesService.remove(id);
    }
}
