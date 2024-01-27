import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthenticateService } from './services/authenticate.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { LocalAuthGuard } from './auth-guards/local-auth.guard';
import { JwtAuthGuard } from './auth-guards/jwt-auth.guard';
import { CurrentUserDecorator } from './decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('authenticate')
@Controller('authenticate')
export class AuthenticateController {
    constructor(private readonly authService: AuthenticateService) {}

    @Post('sign-in')
    @UseGuards(LocalAuthGuard)
    @ApiOperation({ summary: 'sign-in' })
    @ApiResponse({ type: SignInResponseDto })
    async signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @Get('current-user')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get current user' })
    @ApiResponse({ type: User })
    async currentUser(
        @CurrentUserDecorator() user: User,
    ): Promise<User | null> {
        return user;
    }
}
