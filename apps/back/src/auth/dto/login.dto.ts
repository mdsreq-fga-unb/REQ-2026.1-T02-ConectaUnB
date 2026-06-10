import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email do usuário',
    example: 'georgemarsicano@unb.br',
  })
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    description:
      'Senha do usuário (deve conter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais)',
    example: 'Senha@123',
  })
  senha!: string;
}
