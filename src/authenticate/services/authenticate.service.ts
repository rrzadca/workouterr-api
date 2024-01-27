import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInResponseDto } from '../dto/sign-in-response.dto';
import * as bcrypt from 'bcrypt';
import { CurrentUserService } from './current-user.service';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class AuthenticateService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly currentUserService: CurrentUserService,
    ) {}

    async signIn(
        username: string,
        password: string,
    ): Promise<SignInResponseDto> {
        const user = await this.currentUserService.findByEmail(username);

        const payload = { sub: user?.id, username: user?.email };

        return {
            accessToken: await this.jwtService.signAsync(payload),
        };
    }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }
}
