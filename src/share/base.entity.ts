import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'created_on' })
    createdOn: Date;

    @Column({ name: 'updated_on', nullable: true })
    updatedOn: Date;
}
