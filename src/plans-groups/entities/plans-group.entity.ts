import { BaseEntity } from '../../share/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Plan } from '../../plans/entities/plan.entity';

@Entity('plans_groups')
export class PlansGroup extends BaseEntity {
    @Column({
        unique: true,
        length: 100,
    })
    name: string;

    @OneToMany(() => Plan, (plan) => plan.plansGroup)
    plans: Plan[];
}
