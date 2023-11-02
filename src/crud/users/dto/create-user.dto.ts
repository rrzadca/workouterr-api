import { IsString, Length } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @Length(1, 100)
    username: string;

    @IsString()
    @Length(8, 100, { message: 'Password has to have at least 8 characters' })
    password: string;
}
