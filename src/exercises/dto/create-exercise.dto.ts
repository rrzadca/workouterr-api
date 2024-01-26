import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExerciseDto {
    @ApiProperty()
    @IsString()
    @Length(1, 100)
    name: string;

    @ApiProperty()
    @IsString()
    @Length(0, 1000)
    description: string;
}
