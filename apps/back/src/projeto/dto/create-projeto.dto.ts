import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { StatusProjeto } from '@prisma/client';

export class CreateProjetoDto {
    
    @ApiProperty({ description: 'ID da Entidade dona do projeto', example: 1 })
    @IsNumber()
    @IsNotEmpty()
    idEntidade: number;

    @ApiProperty({ description: 'Nome do projeto', example: 'Sistema de Gerenciamento' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    nome: string;

    @ApiProperty({ description: 'Descrição do projeto', required: false })
    @IsString()
    @IsOptional()
    @MaxLength(500)
    descricao?: string;

    @ApiProperty({ description: 'Link da banner do projeto', required: false })
    @IsOptional()
    @IsUrl()
    linkFoto?: string;

    @ApiProperty({ enum: StatusProjeto, required: true })
    @IsEnum(StatusProjeto)
    @IsNotEmpty()
    status: StatusProjeto;

    @ApiProperty({ description: 'Data de início do projeto' })
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    dataInicio: Date;

    @ApiProperty({ description: 'Data de finalização do projeto', required: false })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    dataFim?: Date;
}

