import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../share/base.entity';

@Entity('exercises')
export class Exercise extends BaseEntity {
    @Column({
        unique: true,
        length: 100,
    })
    name: string;
    @Column({
        length: 1000,
        nullable: true,
    })
    description: string;
}
