import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(8, undefined, {
        message: 'Password has to have at least 8 characters',
    })
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    confirmPassword: string;
}
