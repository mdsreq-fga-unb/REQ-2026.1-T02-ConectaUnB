import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateProcessoSeletivoDto } from './create-processo-seletivo.dto';

export class UpdateProcessoSeletivoDto extends PartialType(
  OmitType(CreateProcessoSeletivoDto, ['idEntidade'] as const),
) {}
