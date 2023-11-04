import { Module } from '@nestjs/common';
import { LocalStrategy } from './auth-strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './auth-strategies/jwt.strategy';
import { CurrentUserService } from './current-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Module({
    providers: [LocalStrategy, JwtStrategy, AuthService, CurrentUserService],
    controllers: [AuthController],
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.AUTH_SECRET,
                signOptions: {
                    expiresIn: '60m',
                },
            }),
        }),
    ],
})
export class AuthModule {}
