import { OmitType, PartialType, ApiProperty } from '@nestjs/swagger';
import { CreatePerfilDto } from '../../auth/dto/register.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePerfilDto extends PartialType(
  OmitType(CreatePerfilDto, ['senha'] as const),
) {
  @ApiProperty({ description: 'URL da foto de perfil', required: false })
  @IsOptional()
  @IsString()
  linkFoto?: string;
}
