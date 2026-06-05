import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateEntidadeDto } from './create-entidade.dto';
import { IsString, IsOptional, MaxLength, IsUrl } from 'class-validator';

export class UpdateEntidadeDto extends PartialType(CreateEntidadeDto) {

    @IsString()
    @IsOptional()
    @MaxLength(1000)
    @ApiProperty({
        description: 'Descrição da entidade',
        example: 'Plataforma de conexão entre estudantes e docentes da UnB',
        required: false
    })
    descricao?: string;

    @ApiProperty({ description: 'Link do banner da entidade', required: false })
    @IsOptional()
    @IsUrl()
    linkBanner?: string;

    @ApiProperty({ description: 'Link do logo da entidade', required: false })
    @IsOptional()
    @IsUrl()
    linkLogo?: string;
}