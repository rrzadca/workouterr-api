import { BaseEntity } from '../../share/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('plans_groups')
export class PlansGroup extends BaseEntity {
    @Column({
        unique: true,
        length: 100,
    })
    name: string;
}
