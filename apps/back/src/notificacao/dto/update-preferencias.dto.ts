import {IsBoolean, IsOptional} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePreferenciasDto {
  @ApiProperty({
    description: 'Indica se o usuário deseja receber notificações sobre processos seletivos.',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  processoSeletivo?: boolean;

  @ApiProperty({
    description: 'Indica se o usuário deseja receber notificações sobre atualizações de projeto.',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  atualizacaoProjeto?: boolean;

  @ApiProperty({
    description: 'Indica se o usuário deseja receber notificações sobre atualizações de publicação.',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  atualizacaoPublicacao?: boolean;

}
