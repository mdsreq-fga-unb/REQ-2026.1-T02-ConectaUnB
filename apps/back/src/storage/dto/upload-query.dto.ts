import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UploadQueryDto {
  @ApiPropertyOptional({
    description: 'Entity type (e.g. publications, projects, profiles)',
  })
  @IsOptional()
  @IsString()
  entity?: string;

  @ApiPropertyOptional({ description: 'ID of the related entity' })
  @IsOptional()
  @IsString()
  entityId?: string;
}
