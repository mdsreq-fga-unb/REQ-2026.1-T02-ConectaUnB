import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePreferenciasDto {

  @ApiProperty({ 
    description: 'Receber notificações de processos seletivos', 
    example: false, 
    required: false 
  })
  @IsOptional()
  @IsBoolean()
  processoSeletivo?: boolean;

  @ApiProperty({ 
    description: 'Receber notificações de atualizações em projetos', 
    example: false, 
    required: false 
  })
  @IsOptional()
  @IsBoolean()
  atualizacaoProjeto?: boolean;

  @ApiProperty({ 
    description: 'Receber notificações de novas publicações', 
    example: true, 
    required: false 
  })
  @IsOptional()
  @IsBoolean()
  atualizacaoPublicacao?: boolean;

}