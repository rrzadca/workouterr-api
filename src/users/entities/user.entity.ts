import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../share/base.entity';

@Entity('users')
export class User extends BaseEntity {
    @Column({
        unique: true,
        length: 100,
    })
    username: string;
    @Column({
        length: 100,
    })
    password: string;
}
