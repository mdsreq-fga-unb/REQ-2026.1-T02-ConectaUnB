import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} from '@aws-sdk/client-s3';
import { Injectable, Logger } from '@nestjs/common';
import { CACHE_CONTROL_IMMUTABLE } from '../storage.constants';
import { StorageProvider } from '../storage.types';

@Injectable()
export class R2StorageProvider implements StorageProvider {
  private readonly logger = new Logger(R2StorageProvider.name);
  private readonly client: S3Client;
  private readonly bucket: string;
  private readonly publicUrl: string;

  constructor() {
    this.bucket = process.env.R2_BUCKET_NAME!;
    this.publicUrl = (process.env.R2_PUBLIC_URL ?? '').replace(/\/$/, '');
    this.client = new S3Client({
      region: process.env.R2_REGION ?? 'auto',
      endpoint: process.env.R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
      forcePathStyle: false,
    });
  }

  async upload(args: {
    buffer: Buffer;
    key: string;
    contentType: string;
    cacheControl: string;
  }): Promise<{ url: string }> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: args.key,
      Body: args.buffer,
      ContentType: args.contentType,
      CacheControl: CACHE_CONTROL_IMMUTABLE,
    });
    try {
      await this.client.send(command);
    } catch (err) {
      if (err instanceof S3ServiceException) {
        this.logger.error(
          `R2 upload falhou key=${args.key}: ${err.name} ${err.message}`,
        );
      }
      throw err;
    }
    return { url: `${this.publicUrl}/${args.key}` };
  }

  async delete(args: { key: string }): Promise<void> {
    try {
      await this.client.send(
        new DeleteObjectCommand({ Bucket: this.bucket, Key: args.key }),
      );
    } catch (err) {
      // Idempotente: se já não existia, loga e segue.
      if (err instanceof S3ServiceException) {
        this.logger.warn(`R2 delete falhou key=${args.key}: ${err.name}`);
      }
    }
  }
}
