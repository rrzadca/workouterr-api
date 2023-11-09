import { IsEmail, IsNotEmpty, Length } from 'class-validator';

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
    confirmPassword: string;
}
