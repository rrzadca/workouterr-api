import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ name: 'created_on' })
    createdOn: Date;
    @Column({ name: 'updated_on', nullable: true })
    updatedOn: Date;
}
