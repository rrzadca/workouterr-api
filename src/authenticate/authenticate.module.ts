import { Module } from '@nestjs/common';
import { AuthenticateService } from './services/authenticate.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticateController } from './authenticate.controller';
import { CurrentUserService } from './services/current-user.service';
import { LocalStrategy } from './auth-strategies/local.strategy';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './auth-strategies/jwt.strategy';

@Module({
    providers: [
        AuthenticateService,
        CurrentUserService,
        LocalStrategy,
        JwtStrategy,
    ],
    controllers: [AuthenticateController],
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
export class AuthenticateModule {}
