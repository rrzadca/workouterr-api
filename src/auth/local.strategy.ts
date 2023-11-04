import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(LocalStrategy.name);

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.userRepository.findOne({
            where: { email: username },
            select: { id: true, email: true, createdOn: true, updatedOn: true },
        });

        if (!user) {
            this.logger.debug(`User ${username} not found`);
            throw new UnauthorizedException();
        }

        if (!(await bcrypt.compare(password, user.password))) {
            this.logger.debug(`Invalid credentials for user ${username}`);
            throw new UnauthorizedException();
        }

        return user;
    }
}
