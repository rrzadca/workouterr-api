import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlansGroupDto } from './dto/create-plans-group.dto';
import { UpdatePlansGroupDto } from './dto/update-plans-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PlansGroup } from './entities/plans-group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlansGroupsService {
    private readonly logger = new Logger(PlansGroupsService.name);

    constructor(
        @InjectRepository(PlansGroup)
        private readonly repository: Repository<PlansGroup>,
    ) {}

    async create(
        createPlansGroupDto: CreatePlansGroupDto,
    ): Promise<PlansGroup> {
        return await this.repository.save({
            ...createPlansGroupDto,
            createdOn: new Date(),
        });
    }

    async findAll(): Promise<PlansGroup[]> {
        return await this.repository.find({ relations: ['plans'] });
    }

    async findOne(id: string): Promise<PlansGroup> {
        const plansGroup = await this.repository.findOneBy({ id: id });

        if (!plansGroup) {
            this.logger.warn(`Cannot find ${PlansGroup.name} with :id=${id}`);
            throw new NotFoundException();
        }

        return plansGroup;
    }

    async update(
        id: string,
        updatePlansGroupDto: UpdatePlansGroupDto,
    ): Promise<PlansGroup> {
        const plansGroup = await this.repository.findOneBy({ id: id });

        if (!plansGroup) {
            this.logger.warn(`Cannot find ${PlansGroup.name} with :id=${id}`);
            throw new NotFoundException();
        }

        return await this.repository.save({
            ...plansGroup,
            ...updatePlansGroupDto,
            updatedOn: new Date(),
        });
    }

    async remove(id: string): Promise<void> {
        const plansGroup = await this.repository.findOneBy({ id: id });

        if (!plansGroup) {
            this.logger.warn(`Cannot find ${PlansGroup.name} with :id=${id}`);
            throw new NotFoundException();
        }

        await this.repository.remove(plansGroup);
    }
}
