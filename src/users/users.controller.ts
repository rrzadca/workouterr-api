import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    Logger,
    BadRequestException,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../authenticate/auth-guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
    private readonly logger: Logger = new Logger(UsersController.name);

    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 200, type: User })
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        this.logger.log(`call create`);
        this.logger.debug(createUserDto);

        if (createUserDto.password !== createUserDto.confirmPassword) {
            this.logger.warn(`Passwords are not match`);
            throw new BadRequestException(['Passwords are not match']);
        }

        if (await this.usersService.findByEmail(createUserDto.email)) {
            this.logger.warn('Provided email address already exists');
            throw new BadRequestException([
                'Provided email address already exists',
            ]);
        }

        return this.usersService.create(createUserDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, type: [User] })
    async findAll(): Promise<User[]> {
        this.logger.log(`call findAll`);

        return this.usersService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get user details' })
    @ApiResponse({ status: 200, type: User })
    async findOne(@Param('id') id: string): Promise<User> {
        this.logger.log(`call findOne`);
        this.logger.debug(`id: ${id}`);

        return this.usersService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update user' })
    @ApiResponse({ status: 200, type: User })
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
        this.logger.log(`call update`);
        this.logger.debug(`id: ${id}`);
        this.logger.debug(updateUserDto);

        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @HttpCode(204)
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete user' })
    async remove(@Param('id') id: string): Promise<void> {
        this.logger.log(`call remove`);
        this.logger.debug(`id: ${id}`);

        return this.usersService.remove(id);
    }
}
