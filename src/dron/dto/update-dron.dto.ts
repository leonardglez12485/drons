import { PartialType } from '@nestjs/mapped-types';
import { CreateDronDto } from './create-dron.dto';

export class UpdateDronDto extends PartialType(CreateDronDto) {}
