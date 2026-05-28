import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  PutObjectCommand,
  DeleteObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';

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
  private readonly s3: S3Client;
  private readonly bucket: string;
  private readonly publicUrl: string;

  constructor(private readonly prisma: PrismaService) {
    this.bucket = process.env.R2_BUCKET_NAME ?? '';
    this.publicUrl = (process.env.R2_PUBLIC_URL ?? '').replace(/\/+$/, '');

    this.s3 = new S3Client({
      region: process.env.R2_REGION ?? 'auto',
      endpoint: process.env.R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',
      },
    });
  }

  async upload(file: Express.Multer.File, opts: UploadOptions = {}) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type: ${file.mimetype}. Allowed: ${ALLOWED_MIME_TYPES.join(', ')}`,
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      throw new BadRequestException(
        `File too large. Maximum size is ${MAX_FILE_SIZE_BYTES / 1024 / 1024}MB`,
      );
    }

    const ext = file.originalname.split('.').pop() ?? 'bin';
    const directory = opts.entity ?? 'misc';
    const key = `${directory}/${uuidv4()}.${ext}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    const url = `${this.publicUrl}/${key}`;

    const record = await (this.prisma as any).file.create({
      data: {
        key,
        url,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        entity: opts.entity ?? null,
        entityId: opts.entityId ?? null,
        ownerId: opts.ownerId ?? null,
      },
    });

    return record;
  }

  async getUrl(key: string): Promise<string> {
    return `${this.publicUrl}/${key}`;
  }

  async findById(id: string) {
    const record = await (this.prisma as any).file.findUnique({
      where: { id },
    });
    if (!record) {
      throw new NotFoundException('File not found');
    }
    return record;
  }

  async delete(key: string) {
    const record = await (this.prisma as any).file.findUnique({
      where: { key },
    });
    if (!record) {
      throw new NotFoundException('File not found');
    }

    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      }),
    );

    await (this.prisma as any).file.delete({ where: { key } });

    return { deleted: true };
  }
}
