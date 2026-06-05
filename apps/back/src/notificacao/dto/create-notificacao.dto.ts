import { IsString, IsOptional, IsNotEmpty, MaxLength, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TipoNotificacao } from '@prisma/client';

export class CreateNotificacaoDto {
  
  @ApiProperty({ description: 'ID da Entidade dona da notificação', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  idEntidade: number;

  @ApiProperty({ enum: TipoNotificacao, required: true })
  @IsEnum(TipoNotificacao)
  @IsNotEmpty()
  tipo: TipoNotificacao;
  
  @ApiProperty({ description: 'Mensagem da notificação', example: 'Você recebeu uma nova notificação' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  mensagem: string;
  
  @ApiProperty({ description: 'ID da referência', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  referenciaId: number;
  
}