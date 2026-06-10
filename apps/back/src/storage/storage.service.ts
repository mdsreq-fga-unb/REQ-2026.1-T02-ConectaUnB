import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
// import { File as PrismaFile } from '@prisma/client';

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

interface UploadOptions {
  entity?: string;
  entityId?: string;
  ownerId?: string;
}

@Injectable()
export class StorageService {
  // private readonly s3: S3Client;
  // private readonly bucket: string;
  // private readonly publicUrl: string;
  // private readonly endpoint: string;
  // private readonly accessKeyId: string;
  // private readonly secretAccessKey: string;

  // constructor(private readonly prisma: PrismaService) {
  //   this.bucket = process.env.R2_BUCKET_NAME ?? '';
  //   this.publicUrl = (process.env.R2_PUBLIC_URL ?? '').replace(/\/+$/, '');
  //   this.endpoint =
  //     process.env.R2_ENDPOINT ??
  //     `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
  //   this.accessKeyId = process.env.R2_ACCESS_KEY_ID ?? '';
  //   this.secretAccessKey = process.env.R2_SECRET_ACCESS_KEY ?? '';

  //   this.s3 = new S3Client({
  //     region: process.env.R2_REGION ?? 'auto',
  //     endpoint: this.endpoint,
  //     credentials: {
  //       accessKeyId: this.accessKeyId,
  //       secretAccessKey: this.secretAccessKey,
  //     },
  //   });
  // }

  // private ensureStorageConfigured() {
  //   if (
  //     !this.bucket ||
  //     !this.publicUrl ||
  //     !this.endpoint ||
  //     !this.accessKeyId ||
  //     !this.secretAccessKey
  //   ) {
  //     throw new BadRequestException('Storage is not configured');
  //   }
  // }

  // async upload(
  //   file: Express.Multer.File,
  //   opts: UploadOptions = {},
  // ): Promise<PrismaFile> {
  //   this.ensureStorageConfigured();

  //   if (!file) {
  //     throw new BadRequestException('No file provided');
  //   }

  //   if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
  //     throw new BadRequestException(
  //       `Invalid file type: ${file.mimetype}. Allowed: ${ALLOWED_MIME_TYPES.join(', ')}`,
  //     );
  //   }

  //   if (file.size > MAX_FILE_SIZE_BYTES) {
  //     throw new BadRequestException(
  //       `File too large. Maximum size is ${MAX_FILE_SIZE_BYTES / 1024 / 1024}MB`,
  //     );
  //   }

  //   const extRaw = file.originalname.split('.').pop() ?? 'bin';
  //   const ext = extRaw.replace(/[^a-z0-9_]/gi, '').slice(0, 10) || 'bin';
  //   const directoryRaw = opts.entity ?? 'misc';
  //   const directory = directoryRaw.replace(/[^a-z0-9_-]/gi, '').slice(0, 50) || 'misc';
  //   const key = `${directory}/${randomUUID()}.${ext}`;

  //   await this.s3.send(
  //     new PutObjectCommand({
  //       Bucket: this.bucket,
  //       Key: key,
  //       Body: file.buffer,
  //       ContentType: file.mimetype,
  //     }),
  //   );

  //   const url = `${this.publicUrl}/${key}`;

  //   const record = await this.prisma.file.create({
  //     data: {
  //       key,
  //       url,
  //       originalName: file.originalname,
  //       mimeType: file.mimetype,
  //       size: file.size,
  //       entity: opts.entity ?? null,
  //       entityId: opts.entityId ?? null,
  //       ownerId: opts.ownerId ?? null,
  //     },
  //   });

  //   return record;
  // }

  // getUrl(key: string): Promise<string> {
  //   return Promise.resolve(`${this.publicUrl}/${key}`);
  // }

  // async findById(id: string): Promise<PrismaFile> {
  //   const record = await this.prisma.file.findUnique({
  //     where: { id },
  //   });
  //   if (!record) {
  //     throw new NotFoundException('File not found');
  //   }
  //   return record;
  // }

  // async delete(key: string): Promise<{ deleted: boolean }> {
  //   this.ensureStorageConfigured();

  //   const record = await this.prisma.file.findUnique({
  //     where: { key },
  //   });
  //   if (!record) {
  //     throw new NotFoundException('File not found');
  //   }

  //   await this.s3.send(
  //     new DeleteObjectCommand({
  //       Bucket: this.bucket,
  //       Key: key,
  //     }),
  //   );

  //   await this.prisma.file.delete({ where: { key } });

  //   return { deleted: true };
  // }
}
