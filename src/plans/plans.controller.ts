import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Logger,
    UseGuards,
    Query,
} from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Plan } from './entities/plan.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.auth-guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('plans')
@Controller('plans')
export class PlansController {
    private readonly logger = new Logger(PlansController.name);

    constructor(private readonly plansService: PlansService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create plan' })
    @ApiResponse({ type: Plan })
    async create(@Body() createPlanDto: CreatePlanDto): Promise<Plan> {
        this.logger.log(`call create`);
        this.logger.debug(createPlanDto);

        return this.plansService.create(createPlanDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Find plans' })
    @ApiResponse({ type: Plan })
    async find(@Query('name') name?: string): Promise<Plan[]> {
        this.logger.log(`call find`);
        this.logger.debug(`name: ${name}`);

        return this.plansService.find(name);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get plan details' })
    @ApiResponse({ type: Plan })
    async findOne(@Param('id') id: string): Promise<Plan> {
        this.logger.log(`call findOne`);
        this.logger.debug(`id: ${id}`);

        return this.plansService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update plan' })
    @ApiResponse({ type: Plan })
    async update(
        @Param('id') id: string,
        @Body() updatePlanDto: UpdatePlanDto,
    ): Promise<Plan> {
        this.logger.log(`call update`);
        this.logger.debug(`id: ${id}`);
        this.logger.debug(updatePlanDto);

        return this.plansService.update(id, updatePlanDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete plan' })
    async remove(@Param('id') id: string): Promise<void> {
        this.logger.log(`call remove`);
        this.logger.debug(`id: ${id}`);

        return this.plansService.remove(id);
    }
}
