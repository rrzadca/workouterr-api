import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CurrentUserService {
    constructor(
        @InjectRepository(User) private readonly repository: Repository<User>,
    ) {}

    async fetchById(id: string, withPassword = false): Promise<User | null> {
        return await this.repository.findOne({
            where: { id },
            select: {
                id: true,
                email: true,
                createdOn: true,
                updatedOn: true,
                password: withPassword,
            },
        });
    }

    async fetchByEmail(
        email: string,
        withPassword = false,
    ): Promise<User | null> {
        return await this.repository.findOne({
            where: { email },
            select: {
                id: true,
                email: true,
                createdOn: true,
                updatedOn: true,
                password: withPassword,
            },
        });
    }
}
