import { IsNotEmpty, IsNumber, IsString, IsUrl, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostagemDto {

    @ApiProperty({ description: 'ID da Entidade autora da postagem', example: 1 })
    @IsNumber()
    @IsNotEmpty()
    idEntidade: number;

    @ApiProperty({ description: 'Texto da postagem', example: 'Bebam água!' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    titulo: string;

    @ApiProperty({ description: 'Conteúdo da postagem (texto)', example: 'Se não beber água faz mal a saúde!' })
    @IsString()
    @IsNotEmpty()
    @MaxLength(1500)
    conteudo: string;

    @ApiProperty({ description: 'Link para a foto da postagem' })
    @IsOptional()
    @IsUrl()
    linkFoto?: string;

}