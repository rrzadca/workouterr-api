import { IsString, Length } from 'class-validator';

export class CreatePlanDto {
    @IsString()
    @Length(1, 100)
    name: string;
}
