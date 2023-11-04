import { Module } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
    providers: [LocalStrategy],
    controllers: [AuthController],
    imports: [UsersModule],
})
export class AuthModule {}
