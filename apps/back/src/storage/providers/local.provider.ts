import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { StorageProvider } from '../storage.types';

const UPLOAD_ROOT = path.resolve(process.cwd(), 'apps/back/uploads');

@Injectable()
export class LocalStorageProvider implements StorageProvider {
  private readonly logger = new Logger(LocalStorageProvider.name);

  private get publicBaseUrl(): string {
    return (
      process.env.BACKEND_PUBLIC_BASE_URL ?? 'http://localhost:3000'
    ).replace(/\/$/, '');
  }

  async upload(args: {
    buffer: Buffer;
    key: string;
    contentType: string;
    cacheControl: string;
  }): Promise<{ url: string }> {
    const absPath = path.join(UPLOAD_ROOT, args.key);
    await fs.mkdir(path.dirname(absPath), { recursive: true });
    await fs.writeFile(absPath, args.buffer);
    return { url: `${this.publicBaseUrl}/uploads/${args.key}` };
  }

  async delete(args: { key: string }): Promise<void> {
    const absPath = path.join(UPLOAD_ROOT, args.key);
    try {
      await fs.unlink(absPath);
    } catch (err) {
      const code = (err as NodeJS.ErrnoException)?.code;
      if (code !== 'ENOENT') {
        this.logger.warn(`local delete falhou key=${args.key}: ${code}`);
      }
    }
  }
}

export const LOCAL_UPLOAD_ROOT = UPLOAD_ROOT;
