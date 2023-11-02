import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { BaseService } from '../share/base.service';
import { Plan } from './entities/plan.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlansService extends BaseService {
    constructor(
        @InjectRepository(Plan) private readonly repository: Repository<Plan>,
    ) {
        super();
    }
    async create(createPlanDto: CreatePlanDto): Promise<Plan> {
        return await this.repository.save({
            ...createPlanDto,
            createdOn: new Date(),
        });
    }

    async findAll(): Promise<Plan[]> {
        return await this.repository.find();
    }

    async findOne(id: string): Promise<Plan> {
        const plan = await this.repository.findOneBy({ id: id });

        if (!plan) {
            this.logNotFoundWarning(id);
            throw new NotFoundException();
        }

        return plan;
    }

    async update(id: string, updatePlanDto: UpdatePlanDto): Promise<Plan> {
        const plan = await this.repository.findOneBy({ id: id });

        if (!plan) {
            this.logNotFoundWarning(id);
            throw new NotFoundException();
        }

        return await this.repository.save({
            ...plan,
            ...updatePlanDto,
            updatedOn: new Date(),
        });
    }

    async remove(id: string): Promise<void> {
        const plan = await this.repository.findOneBy({ id: id });

        if (!plan) {
            this.logNotFoundWarning(id);
            throw new NotFoundException();
        }

        await this.repository.remove(plan);
    }
}
