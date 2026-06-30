import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum PapelProjeto {
  GERENTE = 'GERENTE',
  COLABORADOR = 'COLABORADOR',
}

export class AddMembroProjetoDto {
  @ApiProperty({
    description: 'E-mail do usuário que será adicionado ao projeto',
    example: 'usuario@unb.br',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    enum: PapelProjeto,
    description: 'Define se o membro será alocado como Gerente ou Colaborador',
  })
  @IsEnum(PapelProjeto)
  @IsNotEmpty()
  papel!: PapelProjeto;
}
