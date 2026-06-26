import { OmitType, PartialType } from '@nestjs/swagger';
import { AddMembroDto } from './add-membro.dto';

export class UpdateMembroDto extends PartialType(
  OmitType(AddMembroDto, ['email'] as const),
) {}
