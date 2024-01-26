import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../share/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('exercises')
export class Exercise extends BaseEntity {
    @ApiProperty()
    @Column({
        unique: true,
        length: 100,
    })
    name: string;

    @ApiProperty()
    @Column({
        length: 1000,
        nullable: true,
    })
    description: string;
}
