import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateProjetoDto } from './create-projeto.dto';

export class UpdateProjetoDto extends PartialType( OmitType(CreateProjetoDto, ['idEntidade'] as const)) {}