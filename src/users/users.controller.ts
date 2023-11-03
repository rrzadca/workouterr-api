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
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
    private readonly logger = new Logger(UsersController.name);

    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto): Observable<UserDto> {
        this.logger.log(`call create`);
        return from(this.usersService.create(createUserDto)).pipe(
            map(({ id, email, createdOn, updatedOn }) => ({
                id,
                email,
                createdOn,
                updatedOn,
            })),
        );
    }

    @Get()
    findAll(): Observable<UserDto[]> {
        this.logger.log(`call findAll`);
        return from(this.usersService.findAll()).pipe(
            map((users) =>
                users.map(({ id, email, createdOn, updatedOn }) => ({
                    id,
                    email,
                    createdOn,
                    updatedOn,
                })),
            ),
        );
    }

    @Get(':id')
    findOne(@Param('id') id: string): Observable<UserDto> {
        this.logger.log(`call findOne :id=${id}`);
        return from(this.usersService.findOne(id)).pipe(
            map(({ id, email, createdOn, updatedOn }) => ({
                id,
                email,
                createdOn,
                updatedOn,
            })),
        );
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ): Observable<UserDto> {
        this.logger.log(`call update :id=${id}`);
        return from(this.usersService.update(id, updateUserDto)).pipe(
            map(({ id, email, createdOn, updatedOn }) => ({
                id,
                email,
                createdOn,
                updatedOn,
            })),
        );
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string): Observable<void> {
        this.logger.log(`call remove :id=${id}`);
        return from(this.usersService.remove(id));
    }
}
