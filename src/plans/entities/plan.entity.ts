import { BaseEntity } from '../../share/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PlansGroup } from '../../plans-groups/entities/plans-group.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('plans')
export class Plan extends BaseEntity {
    @ApiProperty()
    @Column({
        unique: true,
        length: 100,
    })
    name: string;

    @ApiProperty()
    @ManyToOne(() => PlansGroup, (plansGroup) => plansGroup.plans, {
        nullable: false,
    })
    @JoinColumn({
        name: 'plans_group_id',
    })
    plansGroup: PlansGroup;
}
