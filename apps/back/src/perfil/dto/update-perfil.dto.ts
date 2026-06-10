import { OmitType, PartialType, ApiProperty } from '@nestjs/swagger';
import { CreatePerfilDto } from '../../auth/dto/register.dto';
import { IsOptional, IsUrl } from 'class-validator';

export class UpdatePerfilDto extends PartialType(OmitType(CreatePerfilDto, ['senha'] as const)) {

    @ApiProperty({ description: 'URL da foto de perfil', required: false })
    @IsOptional()
    @IsUrl({}, { message: 'O link da foto deve ser uma URL válida.' })
    linkFoto?: string;
    
}