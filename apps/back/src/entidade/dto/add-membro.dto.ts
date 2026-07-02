import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ClassificacaoMembro } from '@prisma/client';

export class AddMembroDto {
  @ApiProperty({
    description: 'E-mail do usuário que será adicionado à entidade',
    example: 'usuario@unb.br',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    enum: ClassificacaoMembro,
    description: 'Nível de permissão do membro na entidade',
  })
  @IsEnum(ClassificacaoMembro)
  @IsNotEmpty()
  classificacao!: ClassificacaoMembro;
}
