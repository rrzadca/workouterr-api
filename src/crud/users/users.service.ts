import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto) {
        return await this.repository.save({
            ...createUserDto,
            createdOn: new Date(),
        });
    }

    async findAll() {
        return await this.repository.find();
    }

    async findOne(id: string) {
        return await this.repository.findOneBy({
            id: id,
        });
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.findOne(id);

        if (user) {
            return await this.repository.save({
                ...user,
                ...updateUserDto,
                updatedOn: new Date(),
            });
        }

        return null;
    }

    async remove(id: string) {
        const user = await this.findOne(id);
        if (user) {
            await this.repository.remove(user);
        }
    }
}
