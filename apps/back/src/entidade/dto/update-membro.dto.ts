import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ClassificacaoMembro } from '@prisma/client';

export class UpdateMembroDto {
  @ApiProperty({
    enum: ClassificacaoMembro,
    description: 'Nível de permissão do membro na entidade',
  })
  @IsEnum(ClassificacaoMembro)
  @IsNotEmpty()
  classificacao!: ClassificacaoMembro;
}
