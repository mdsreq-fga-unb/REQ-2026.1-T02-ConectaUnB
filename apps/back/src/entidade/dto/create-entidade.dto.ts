import { IsString, IsNotEmpty, MaxLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Campus, Departamento, ClassificacaoEntidade } from '@prisma/client';

export class CreateEntidadeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({
    description: 'Nome da entidade',
    example: 'ConectaUnB',
  })
  nome!: string;

  @ApiProperty({ enum: ClassificacaoEntidade, required: true })
  @IsEnum(ClassificacaoEntidade)
  @IsNotEmpty()
  classificacao!: ClassificacaoEntidade;

  @ApiProperty({ enum: Campus, required: true })
  @IsEnum(Campus)
  @IsNotEmpty()
  campus!: Campus;

  @ApiProperty({ enum: Departamento, required: true })
  @IsEnum(Departamento)
  @IsNotEmpty()
  departamento!: Departamento;
}
