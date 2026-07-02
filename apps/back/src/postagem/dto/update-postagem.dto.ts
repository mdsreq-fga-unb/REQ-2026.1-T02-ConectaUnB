import { PartialType, OmitType } from '@nestjs/swagger';
import { CreatePostagemDto } from './create-postagem.dto';

export class UpdatePostagemDto extends PartialType(
  OmitType(CreatePostagemDto, ['idEntidade'] as const),
) {}
