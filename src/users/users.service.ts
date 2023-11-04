import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        return await this.repository.save({
            ...createUserDto,
            createdOn: new Date(),
        });
    }

    async findAll(): Promise<User[]> {
        return await this.repository.find({
            select: {
                id: true,
                email: true,
                createdOn: true,
                updatedOn: true,
            },
        });
    }

    async findOne(id: string): Promise<User> {
        const user = await this.repository.findOne({
            where: {
                id: id,
            },
            select: {
                id: true,
                email: true,
                createdOn: true,
                updatedOn: true,
            },
        });

        if (!user) {
            this.logger.warn(`Cannot find ${User.name} with :id=${id}`);
            throw new NotFoundException();
        }

        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.repository.findOne({
            where: {
                email,
            },
            select: {
                id: true,
                email: true,
                createdOn: true,
                updatedOn: true,
            },
        });
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.repository.findOneBy({ id: id });

        if (!user) {
            this.logger.warn(`Cannot find ${User.name} with :id=${id}`);
            throw new NotFoundException();
        }

        return await this.repository.save({
            ...user,
            ...updateUserDto,
            updatedOn: new Date(),
        });
    }

    async remove(id: string): Promise<void> {
        const user = await this.repository.findOneBy({ id: id });

        if (!user) {
            this.logger.warn(`Cannot find ${User.name} with :id=${id}`);
            throw new NotFoundException();
        }

        await this.repository.remove(user);
    }
}
