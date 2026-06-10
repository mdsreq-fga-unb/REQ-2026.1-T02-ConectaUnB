import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ClassificacaoMembro } from '@prisma/client';

export class AddMembroDto {
  @ApiProperty({
    description: 'ID do Perfil do usuário que será adicionado à entidade',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  idPerfil!: number;

  @ApiProperty({
    enum: ClassificacaoMembro,
    description: 'Nível de permissão do membro na entidade',
  })
  @IsEnum(ClassificacaoMembro)
  @IsNotEmpty()
  classificacao!: ClassificacaoMembro;
}
