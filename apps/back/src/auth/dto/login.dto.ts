import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
      description: 'Email do usuário',
      example: 'georgemarsicano@unb.br'
  })
  email!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
      description: 'Senha do usuário',
      example: 'Senha@123'
  })
  senha!: string;
  
}
