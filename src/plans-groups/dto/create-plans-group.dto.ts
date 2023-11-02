import { IsString, Length } from 'class-validator';

export class CreatePlansGroupDto {
    @IsString()
    @Length(1, 100)
    name: string;
}
