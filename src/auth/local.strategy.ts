import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(LocalStrategy.name);

    constructor(private readonly usersService: UsersService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(username);

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
