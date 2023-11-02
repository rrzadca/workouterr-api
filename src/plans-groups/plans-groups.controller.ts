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
        return this.plansGroupsService.create(createPlansGroupDto);
    }

    @Get()
    findAll() {
        this.logger.log(`call findAll`);
        return this.plansGroupsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        this.logger.log(`call findOne :id=${id}`);
        return this.plansGroupsService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatePlansGroupDto: UpdatePlansGroupDto,
    ) {
        this.logger.log(`call update :id=${id}`);
        return this.plansGroupsService.update(id, updatePlansGroupDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        this.logger.log(`call remove :id=${id}`);
        return this.plansGroupsService.remove(id);
    }
}
