import {
    BadRequestException,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('login')
    @UseGuards(AuthGuard('local'))
    async login(@Request() request: any) {
        if (!request.user?.id) {
            throw new BadRequestException();
        }

        return {
            userId: request.user.id,
            token: this.authService.getTokenForUser(request.user),
        };
    }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    async getProfile(@Request() request: any) {
        if (!request.user) {
            throw new BadRequestException();
        }

        return request.user;
    }
}
