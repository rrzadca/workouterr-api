import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../base.entity';

@Entity('users')
export class User extends BaseEntity {
    @Column({
        unique: true,
        length: 100,
    })
    username: string;
    @Column()
    password: string;
}
