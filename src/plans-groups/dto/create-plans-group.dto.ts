import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePlansGroupDto {
    @ApiProperty()
    @IsString()
    @Length(1, 100)
    name: string;
}
