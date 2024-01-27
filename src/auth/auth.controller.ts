import { Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { User } from '../users/entities/user.entity';
import { LocalAuthGuard } from './guards/local.auth-guard';
import { JwtAuthGuard } from './guards/jwt.auth-guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('authorization')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(200)
    @UseGuards(LocalAuthGuard)
    @ApiOperation({ summary: 'authorize' })
    async login(@CurrentUser() user: User) {
        return {
            userId: user.id,
            token: this.authService.getTokenForUser(user),
        };
    }
}
