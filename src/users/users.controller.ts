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
import { from, map, Observable } from 'rxjs';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
    private readonly logger = new Logger(UsersController.name);

    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto): Observable<User> {
        this.logger.log(`call create`);
        console.log(` ;; createUserDto`, createUserDto);
        return from(this.usersService.create(createUserDto));
    }

    @Get()
    findAll(): Observable<User[]> {
        this.logger.log(`call findAll`);
        return from(this.usersService.findAll());
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<User> {
        this.logger.log(`call findOne :id=${id}`);
        return from(this.usersService.findOne(id));
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ): Observable<User> {
        this.logger.log(`call update :id=${id}`);
        return from(this.usersService.update(id, updateUserDto));
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string): Observable<void> {
        this.logger.log(`call remove :id=${id}`);
        return from(this.usersService.remove(id));
    }
}
