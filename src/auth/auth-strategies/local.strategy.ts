import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';
import { CurrentUserService } from '../current-user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    private readonly logger = new Logger(LocalStrategy.name);

    constructor(private readonly currentUserService: CurrentUserService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.currentUserService.fetchByEmail(username, true);

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
