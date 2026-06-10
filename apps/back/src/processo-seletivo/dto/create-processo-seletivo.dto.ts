import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ClassificacaoInscricao } from '@prisma/client';

export class CreateProcessoSeletivoDto {
  @ApiProperty({
    description: 'ID da Entidade dona do processo seletivo',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  idEntidade!: number;

  @ApiProperty({
    description: 'Título',
    example: 'Processo Seletivo Trainee 2026.2',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  titulo!: string;

  @ApiProperty({ description: 'Descrição', required: false })
  @IsString()
  @IsOptional()
  @MaxLength(1500)
  descricao?: string;

  @ApiProperty({ enum: ClassificacaoInscricao, required: true })
  @IsEnum(ClassificacaoInscricao)
  @IsNotEmpty()
  classificacao!: ClassificacaoInscricao;

  @ApiProperty({ description: 'Link para a foto do processo seletivo' })
  @IsOptional()
  @IsUrl()
  linkFoto?: string;

  @ApiProperty({ description: 'Link para o formulário de inscrição' })
  @IsOptional()
  @IsUrl()
  linkInscricao?: string;

  @ApiProperty({ description: 'Data e hora de abertura das inscrições' })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  inicioInscricao!: Date;

  @ApiProperty({ description: 'Data e hora de encerramento das inscrições' })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  fimInscricao!: Date;
}
