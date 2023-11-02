import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlansGroupDto } from './dto/create-plans-group.dto';
import { UpdatePlansGroupDto } from './dto/update-plans-group.dto';
import { BaseService } from '../share/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PlansGroup } from './entities/plans-group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlansGroupsService extends BaseService {
    constructor(
        @InjectRepository(PlansGroup)
        private readonly repository: Repository<PlansGroup>,
    ) {
        super();
    }

    async create(
        createPlansGroupDto: CreatePlansGroupDto,
    ): Promise<PlansGroup> {
        return await this.repository.save({
            ...createPlansGroupDto,
            createdOn: new Date(),
        });
    }

    async findAll(): Promise<PlansGroup[]> {
        return await this.repository.find();
    }

    async findOne(id: string): Promise<PlansGroup> {
        const plansGroup = await this.repository.findOneBy({ id: id });

        if (!plansGroup) {
            this.logNotFoundWarning(id);
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
            this.logNotFoundWarning(id);
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
            this.logNotFoundWarning(id);
            throw new NotFoundException();
        }

        await this.repository.remove(plansGroup);
    }
}
