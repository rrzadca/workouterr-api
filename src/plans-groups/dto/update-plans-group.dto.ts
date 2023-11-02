import { PartialType } from '@nestjs/swagger';
import { CreatePlansGroupDto } from './create-plans-group.dto';

export class UpdatePlansGroupDto extends PartialType(CreatePlansGroupDto) {}
