import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Length(8, undefined, {
        message: 'Password has to have at least 8 characters',
    })
    password: string;

    @IsNotEmpty()
    retypedPassword: string;
}
