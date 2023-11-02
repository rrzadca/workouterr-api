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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    private readonly logger = new Logger(UsersController.name);

    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        this.logger.log(`call create`);
        return this.usersService.create(createUserDto);
    }

    @Get()
    findAll() {
        this.logger.log(`call findAll`);
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        this.logger.log(`call findOne :id=${id}`);
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        this.logger.log(`call update :id=${id}`);
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        this.logger.log(`call remove :id=${id}`);
        return this.usersService.remove(id);
    }
}
