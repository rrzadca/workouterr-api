import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    getTokenForUser(user: User): string {
        return this.jwtService.sign({
            username: user.email,
            sub: user.id,
        });
    }

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }
}
