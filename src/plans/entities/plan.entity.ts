import { BaseEntity } from '../../share/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('plans')
export class Plan extends BaseEntity {
    @Column({
        unique: true,
        length: 100,
    })
    name: string;
}
