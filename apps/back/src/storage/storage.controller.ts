import { Request as ExpressRequest } from 'express';
// import { File as PrismaFile } from '@prisma/client';
import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { StorageService } from './storage.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UploadQueryDto } from './dto/upload-query.dto';

@ApiTags('Storage')
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  // @Post('upload')
  // @UseGuards(JwtAuthGuard)
  // @UseInterceptors(FileInterceptor('file'))
  // @ApiConsumes('multipart/form-data')
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Upload a file to Cloudflare R2' })
  // @ApiResponse({ status: 201, description: 'File uploaded successfully.' })
  // @ApiResponse({ status: 400, description: 'Invalid file type or size.' })
  // @ApiResponse({ status: 401, description: 'Unauthorized.' })
  // async upload(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Query() query: UploadQueryDto,
  //   @Request() req: ExpressRequest & { user?: { id: string } },
  // ): Promise<PrismaFile> {
  //   return this.storageService.upload(file, {
  //     entity: query.entity,
  //     entityId: query.entityId,
  //     ownerId: req.user?.id,
  //   });
  // }

  // @Get(':id')
  // @ApiOperation({ summary: 'Get file metadata by ID' })
  // @ApiResponse({ status: 200, description: 'File metadata.' })
  // @ApiResponse({ status: 404, description: 'File not found.' })
  // async findOne(@Param('id') id: string): Promise<PrismaFile> {
  //   return this.storageService.findById(id);
  // }

  // @Delete()
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Delete a file by key' })
  // @ApiQuery({ name: 'key', required: true, description: 'File key' })
  // @ApiResponse({ status: 200, description: 'File deleted.' })
  // @ApiResponse({ status: 401, description: 'Unauthorized.' })
  // @ApiResponse({ status: 404, description: 'File not found.' })
  // async remove(@Query('key') key: string) {
  //   if (!key) {
  //     throw new BadRequestException('File key is required');
  //   }

  //   return this.storageService.delete(key);
  // }
}
