import { PartialType, OmitType } from '@nestjs/swagger';
import { AddMembroProjetoDto } from './add-membro-projeto.dto';

export class UpdateMembroProjetoDto extends PartialType(
  OmitType(AddMembroProjetoDto, ['idMembro'] as const),
) {}
