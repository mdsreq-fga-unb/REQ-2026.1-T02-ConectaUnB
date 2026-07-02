import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email do usuário',
    example: 'professor@unb.br',
  })
  email!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description:
      'Senha do usuário (deve conter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais)',
    example: 'Senha@123',
  })
  senha!: string;
}
