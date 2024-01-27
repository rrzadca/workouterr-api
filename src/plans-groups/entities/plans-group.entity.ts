import { BaseEntity } from '../../share/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Plan } from '../../plans/entities/plan.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('plans_groups')
export class PlansGroup extends BaseEntity {
    @ApiProperty()
    @Column({
        unique: true,
        length: 100,
    })
    name: string;

    @ApiProperty()
    @OneToMany(() => Plan, (plan) => plan.plansGroup)
    plans: Plan[];
}
