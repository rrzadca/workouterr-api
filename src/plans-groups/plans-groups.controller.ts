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
import { PlansGroupsService } from './plans-groups.service';
import { CreatePlansGroupDto } from './dto/create-plans-group.dto';
import { UpdatePlansGroupDto } from './dto/update-plans-group.dto';

@Controller('plans-groups')
export class PlansGroupsController {
    private readonly logger = new Logger(PlansGroupsController.name);

    constructor(private readonly plansGroupsService: PlansGroupsService) {}

    @Post()
    create(@Body() createPlansGroupDto: CreatePlansGroupDto) {
        this.logger.log(`call create`);
        this.logger.debug(createPlansGroupDto);
        return this.plansGroupsService.create(createPlansGroupDto);
    }

    @Get()
    findAll() {
        this.logger.log(`call findAll`);
        return this.plansGroupsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        this.logger.log(`call findOne`);
        this.logger.debug(`id: ${id}`);
        return this.plansGroupsService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatePlansGroupDto: UpdatePlansGroupDto,
    ) {
        this.logger.log(`call update`);
        this.logger.debug(`id: ${id}`);
        this.logger.debug(updatePlansGroupDto);
        return this.plansGroupsService.update(id, updatePlansGroupDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        this.logger.log(`call remove`);
        this.logger.debug(`id: ${id}`);
        return this.plansGroupsService.remove(id);
    }
}
