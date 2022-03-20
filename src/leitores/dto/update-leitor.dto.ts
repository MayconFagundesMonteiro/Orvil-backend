import { PartialType } from '@nestjs/mapped-types';
import { CreateLeitorDto } from './create-leitor.dto';

export class UpdateLeitorDto extends PartialType(CreateLeitorDto) {}
