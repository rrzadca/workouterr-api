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
import { PlansGroupsService } from './plans-groups.service';
import { CreatePlansGroupDto } from './dto/create-plans-group.dto';
import { UpdatePlansGroupDto } from './dto/update-plans-group.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PlansGroup } from './entities/plans-group.entity';
import { JwtAuthGuard } from '../authenticate/auth-guards/jwt-auth.guard';

@ApiTags('plans group')
@Controller('plans-groups')
export class PlansGroupsController {
    private readonly logger = new Logger(PlansGroupsController.name);

    constructor(private readonly plansGroupsService: PlansGroupsService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create plans group' })
    @ApiResponse({ type: PlansGroup })
    async create(
        @Body() createPlansGroupDto: CreatePlansGroupDto,
    ): Promise<PlansGroup> {
        this.logger.log(`call create`);
        this.logger.debug(createPlansGroupDto);

        return this.plansGroupsService.create(createPlansGroupDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get plans groups' })
    @ApiResponse({ type: [PlansGroup] })
    async find(@Query('name') name?: string): Promise<PlansGroup[]> {
        this.logger.log(`call findAll`);
        this.logger.debug('name: ', name);

        return this.plansGroupsService.find(name);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get plans group details' })
    @ApiResponse({ type: PlansGroup })
    async findOne(@Param('id') id: string): Promise<PlansGroup> {
        this.logger.log(`call findOne`);
        this.logger.debug(`id: ${id}`);

        return this.plansGroupsService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update plans group' })
    @ApiResponse({ type: PlansGroup })
    async update(
        @Param('id') id: string,
        @Body() updatePlansGroupDto: UpdatePlansGroupDto,
    ): Promise<PlansGroup> {
        this.logger.log(`call update`);
        this.logger.debug(`id: ${id}`);
        this.logger.debug(updatePlansGroupDto);
        return this.plansGroupsService.update(id, updatePlansGroupDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete plan group' })
    async remove(@Param('id') id: string): Promise<void> {
        this.logger.log(`call remove`);
        this.logger.debug(`id: ${id}`);
        return this.plansGroupsService.remove(id);
    }
}
