import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  Matches,
  IsStrongPassword,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Cargo, Campus, Departamento, Curso } from '@prisma/client';
import { IsUnbEmail } from './is-unb-email.validator';

export class CreatePerfilDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres.' })
  @MaxLength(255)
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'George Marsicano Correa',
  })
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  @IsUnbEmail()
  @ApiProperty({
    description: 'Email do usuário',
    example: 'georgemarsicano@unb.br',
  })
  email!: string;

  @ValidateIf((o) => o.cargo === 'DISCENTE')
  @IsNotEmpty({ message: 'A matrícula é obrigatória para discentes.' })
  @Type(() => String)
  @IsString({ message: 'A matrícula deve ser um texto.' })
  @Matches(/^\d{9}$/, {
    message: 'A matrícula deve conter exatamente 9 dígitos numéricos.',
  })
  @ApiProperty({
    description: 'Matrícula do usuário (obrigatória para discentes)',
    example: '123456789',
  })
  matricula?: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\S*$/, { message: 'A senha não pode conter espaços.' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'A senha deve ter no mínimo 8 caracteres, contendo letras maiúsculas e minúsculas, números e caracteres especiais.',
    },
  )
  @ApiProperty({
    description:
      'Senha do usuário (deve conter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais)',
    example: 'Senha@123',
  })
  senha!: string;

  @ApiProperty({ enum: Curso, required: true })
  @IsNotEmpty()
  @IsEnum(Curso)
  curso!: Curso;

  @ApiProperty({ enum: Departamento, required: true })
  @IsNotEmpty()
  @IsEnum(Departamento)
  departamento!: Departamento;

  @ApiProperty({ enum: Campus, required: true })
  @IsNotEmpty()
  @IsEnum(Campus)
  campus!: Campus;

  @ApiProperty({ enum: Cargo, required: true })
  @IsNotEmpty()
  @IsEnum(Cargo)
  cargo!: Cargo;
}
