import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../share/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User extends BaseEntity {
    @ApiProperty()
    @Column({
        unique: true,
        length: 100,
    })
    email: string;

    @Column({
        length: 100,
    })
    password: string;

    @ApiProperty()
    @Column({
        default: false,
    })
    isActive: boolean;
}
