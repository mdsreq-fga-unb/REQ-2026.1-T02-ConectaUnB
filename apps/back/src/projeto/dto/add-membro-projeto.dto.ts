import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum PapelProjeto {
  GERENTE = 'GERENTE',
  COLABORADOR = 'COLABORADOR'
}

export class AddMembroProjetoDto {
  @ApiProperty({ 
    description: 'ID do Membro da Entidade que será alocado no projeto', 
    example: 1 
  })
  @IsNumber()
  @IsNotEmpty()
  idMembro: number;

  @ApiProperty({ 
    enum: PapelProjeto, 
    description: 'Define se o membro será alocado como Gerente ou Colaborador' 
  })
  @IsEnum(PapelProjeto)
  @IsNotEmpty()
  papel: PapelProjeto;
}