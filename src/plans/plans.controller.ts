import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Logger,
} from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Plan } from './entities/plan.entity';

@Controller('plans')
export class PlansController {
    private readonly logger = new Logger(PlansController.name);

    constructor(private readonly plansService: PlansService) {}

    @Post()
    create(@Body() createPlanDto: CreatePlanDto): Promise<Plan> {
        this.logger.log(`call create`);
        this.logger.debug(createPlanDto);
        return this.plansService.create(createPlanDto);
    }

    @Get()
    findAll(): Promise<Plan[]> {
        this.logger.log(`call findAll`);
        return this.plansService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Plan> {
        this.logger.log(`call findOne`);
        this.logger.debug(`id: ${id}`);
        return this.plansService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatePlanDto: UpdatePlanDto,
    ): Promise<Plan> {
        this.logger.log(`call update`);
        this.logger.debug(`id: ${id}`);
        this.logger.debug(updatePlanDto);
        return this.plansService.update(id, updatePlanDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        this.logger.log(`call remove`);
        this.logger.debug(`id: ${id}`);
        return this.plansService.remove(id);
    }
}
