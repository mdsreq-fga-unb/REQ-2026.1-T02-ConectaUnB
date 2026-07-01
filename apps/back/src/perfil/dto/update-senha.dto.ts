  import { ApiProperty } from '@nestjs/swagger';
  import { IsNotEmpty, IsString, Matches, IsStrongPassword } from 'class-validator';

  export class UpdateSenhaDto {

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

}