import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Plan } from './entities/plan.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PlansGroup } from '../plans-groups/entities/plans-group.entity';

@Injectable()
export class PlansService {
    private readonly logger = new Logger(PlansService.name);

    constructor(
        @InjectRepository(Plan) private readonly repository: Repository<Plan>,
        @InjectRepository(PlansGroup)
        private readonly plansGroupRepository: Repository<PlansGroup>,
    ) {}

    async create(createPlanDto: CreatePlanDto): Promise<Plan> {
        const plansGroup = await this.plansGroupRepository.findOneBy({
            id: createPlanDto.plansGroupId,
        });

        if (!plansGroup) {
            this.logger.warn(
                `Cannot find ${PlansGroup.name} with :id=${createPlanDto.plansGroupId}`,
            );
            throw new NotFoundException();
        }

        return await this.repository.save({
            ...createPlanDto,
            plansGroup: plansGroup,
            createdOn: new Date(),
        });
    }

    async findAll(): Promise<Plan[]> {
        return await this.repository.find();
    }

    async findOne(id: string): Promise<Plan> {
        const plan = await this.repository.findOneBy({ id: id });

        if (!plan) {
            this.logger.warn(`Cannot find ${Plan.name} with :id=${id}`);
            throw new NotFoundException();
        }

        return plan;
    }

    async update(id: string, updatePlanDto: UpdatePlanDto): Promise<Plan> {
        const plan = await this.repository.findOneBy({ id: id });

        if (!plan) {
            this.logger.warn(`Cannot find ${Plan.name} with :id=${id}`);
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
            this.logger.warn(`Cannot find ${Plan.name} with :id=${id}`);
            throw new NotFoundException();
        }

        await this.repository.remove(plan);
    }
}
