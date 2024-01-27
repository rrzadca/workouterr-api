import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthenticateModule } from '../authenticate/authenticate.module';
import { AuthenticateService } from '../authenticate/services/authenticate.service';
import { JwtService } from '@nestjs/jwt';
import { CurrentUserService } from '../authenticate/services/current-user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User]), AuthenticateModule],
    controllers: [UsersController],
    providers: [
        UsersService,
        AuthenticateService,
        CurrentUserService,
        JwtService,
    ],
    exports: [UsersService],
})
export class UsersModule {}
