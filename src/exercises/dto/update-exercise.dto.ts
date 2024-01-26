import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdateExerciseDto {
    @ApiProperty()
    @IsString()
    @Length(1, 100)
    name: string;

    @ApiProperty()
    @IsString()
    @Length(0, 1000)
    description: string;
}
