import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class CurrentUserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findById(id: string, withPassword = false): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { id },
            select: {
                id: true,
                email: true,
                createdOn: true,
                updatedOn: true,
                isActive: true,
                password: withPassword,
            },
        });
    }

    async findByEmail(
        email: string,
        withPassword = false,
    ): Promise<User | null> {
        return await this.userRepository.findOne({
            where: { email },
            select: {
                id: true,
                email: true,
                createdOn: true,
                updatedOn: true,
                isActive: true,
                password: withPassword,
            },
        });
    }
}
